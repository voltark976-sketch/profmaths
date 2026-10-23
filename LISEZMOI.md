# Site ProfMaths

Site statique : aucune base de données, aucun compte élève. Ouvrir `index.html` dans un navigateur suffit.

## Ce que vous pouvez modifier
- `data/catalogue.js` : la liste des niveaux et des chapitres (ordre des playlists, statut « disponible » ou « bientot »).
- `data/jeux.js` : le Défi chrono (onglet « Défi » de chaque chapitre) : durée, nombre de vies, séries exclues. Le classement (top 10 général et par classe) est dans la collection Firestore `classement` : prénom, classe et points seulement.
- `data/config-comptes.js` : activation des comptes élèves (Firebase) et liste des classes.
- Collège : les niveaux `sixieme`, `cinquieme`, `quatrieme` et `troisieme` du catalogue ont `groupe: "college"`. L'accueil n'affiche pour eux qu'une carte « Collège », qui ouvre la page `#college` (choix de la classe). Programmes suivis : 6e, cycle 3 de 2025 (BO n° 16 du 17 avril 2025) ; 5e, cycle 4 de 2026 (BO n° 10 du 5 mars 2026, en vigueur à la rentrée 2026) ; 4e et 3e, programme de 2020 en 2026-2027. Les générateurs du collège sont dans `assets/exercices-college.js` (chargé juste après `assets/exercices.js`), avec les figures de demi-droite graduée (`demiDroite`).
  - `data/sixieme/nombres-entiers-decimaux.js` : 6e, chapitre 1 (rangs, grands nombres, fractions décimales, × et ÷ par 10, 100, 1 000, demi-droite graduée, comparer, ranger, encadrer, arrondir). Générateurs `n6-`. Vidéos et PDF d'Yvan Monka (pas encore de vidéos collège sur la chaîne).
  - `data/sixieme/operations.js` : 6e, chapitre 2 (vocabulaire, addition et soustraction posées, calcul en ligne avec parenthèses, calcul astucieux, sens et calcul du produit de deux décimaux sur un quadrillage, ordre de grandeur, problèmes). Générateurs `o6-` ; figure `quadrillage()`.
  - `data/sixieme/division.js` : 6e, chapitre 3 (multiples et diviseurs, critères par 2, 5 et 10, division euclidienne et problèmes, division d'un décimal par un entier inférieur à 10, valeur arrondie d'un quotient, durées et horaires). Générateurs `d6-`.
  - `data/sixieme/fractions.js` : 6e, chapitre 4 (partage, quotient et égalités à trous, demi-droite, fractions égales, comparer, encadrer, entier + fraction, additionner et soustraire, fraction d'une quantité, problèmes). Générateurs `f6-` ; figures `bandes()` et `droiteFractions()`. Une réponse en fraction est annoncée dans la consigne, et une valeur décimale approchée reçoit le message « valeur exacte » (`FRAC_APPROX`).
  - `data/sixieme/proportionnalite.js` : 6e, chapitre 5 (reconnaître, linéarité multiplicative et additive, retour à l'unité, tableaux avec grandeurs et unités, échelles, problèmes ; pas de produit en croix, comme le demande le programme). Générateurs `p6-`.
  - `data/sixieme/pourcentages.js` : 6e, chapitre 6 (sens et écritures d'un pourcentage, calcul mental, appliquer un pourcentage, proportion en pourcentage, remises et comparaisons). Générateurs `t6-`.
  - `data/sixieme/algebre.js` : 6e, chapitre 7 (égalités à trous, programmes de calcul, suites, motifs évolutifs, schémas en barre). Générateurs `a6-` ; figures `dessinMotif()` et `schemaBarres()`. Vidéos de jaicompris Maths, CommeUnJeu, Mathlab et Maître Lucas (pas de vidéo Monka pour ce chapitre).
  - `data/sixieme/donnees-probabilites.js` : 6e, chapitre 8 (tableaux, diagrammes en barres et circulaires, courbes, probabilités en équiprobabilité, fréquences). Générateurs `g6-` ; figures `diagrammeBarres()`, `diagrammeCirculaire()`, `courbeDonnees()`.
  - `data/sixieme/distances-cercles.js` : 6e, chapitre 9 (notations, milieu, cercle et disque, distance à un point, médiatrice). Générateurs `c6-` ; figures `geo()` (points, segments, droites, cercles, codage).
  - `data/sixieme/angles.js` : 6e, chapitre 10 (notation, nature, mesure au rapporteur, angles adjacents, supplémentaires, opposés par le sommet, bissectrice). Générateurs `an6-` ; figures `rapporteur()`, `figureAngle()`, `figureSecantes()`.
  - `data/sixieme/triangles.js` : 6e, chapitre 11 (construction et inégalité des longueurs, triangles particuliers et codage, somme des angles, cercle circonscrit). Générateurs `tg6-` ; figure `figureTriangle()`.
  - `data/sixieme/symetrie.js` : 6e, chapitre 12 (symétrique d'un point sur quadrillage, définition par la médiatrice, propriétés de conservation, axes de symétrie des figures usuelles). Générateurs `sx6-` ; figures `grilleSym()`, `figureForme()`.
  - `data/sixieme/perimetres-aires.js` : 6e, chapitre 13 (conversions de longueurs et d'aires, périmètres du carré, du rectangle et du cercle, aires du carré et du rectangle, figures composées, périmètre ou aire). Générateurs `pa6-` ; figures `figureRectangle()`, `figureL()`, `figureCercleDiam()`, `grilleAire()`.
  - `data/sixieme/espace-volumes.js` : 6e, chapitre 14 (solides usuels, faces, arêtes, sommets, assemblages de cubes en perspective, vues, volume en cm³). Générateurs `so6-` ; figures `assemblage()` et `dessinSolide()`.
  - `data/sixieme/informatique.js` : 6e, chapitre 15 (instructions, entrée et sortie, codes de déplacement, robot qui avance et tourne, boucle « répéter »). Générateurs `pi6-` ; figures `blocs()` (programmes façon Scratch) et `grille()` (quadrillage du robot).
  - `data/cinquieme/calcul.js` : 5e, chapitre 1 (priorités, parenthèses, trait de fraction, vocabulaire, traduction, distributivité numérique). Générateurs `rc5-` dans `assets/exercices-cinquieme.js`, chargé après `assets/exercices-college.js` dont il reprend les outils (`window.PM_EXO.college`).
  - `data/cinquieme/triangles.js` : 5e, chapitre 2 (triangles constructibles, médiatrices et cercle circonscrit, hauteurs, médianes et aires, triangles particuliers). Générateurs `tr5-` ; figure `figureDroite()`.
  - `data/cinquieme/fractions.js` : 5e, chapitre 3 (fractions égales, entier + fraction, comparer et ranger, additionner et soustraire avec dénominateurs quelconques, problèmes). Générateurs `fr5-`.
  - `data/cinquieme/proportionnalite.js` : 5e, chapitre 4 (reconnaître et compléter un tableau, prix unitaire, recette, vitesse moyenne, pourcentages, échelles). Générateurs `pp5-`.
  - `data/cinquieme/angles.js` : 5e, chapitre 5 (vocabulaire des angles, alternes-internes et correspondants, parallélisme, somme des angles du triangle et démonstration). Générateurs `an5-` ; figure `figParalleles()`.
  - `data/cinquieme/divisibilite.js` : 5e, chapitre 6 (division euclidienne, division par un décimal, multiples et diviseurs, critères par 2, 3, 5, 9, 10, problèmes de multiples communs). Générateurs `dv5-`.
  - `data/cinquieme/symetries.js` : 5e, chapitre 7 (symétrie centrale : définition, construction sur quadrillage, propriétés, centre de symétrie). Générateurs `sc5-` ; figure `grilleC()`.
  - `data/cinquieme/relatifs.js` : 5e, chapitre 8 (relatifs, opposé, distance à zéro, droite graduée, comparer et ranger, repère). Générateurs `nr5-` ; figures `droiteRel()` et `repere()`.
  - `data/cinquieme/calculs-relatifs.js` : 5e, chapitre 9 (addition et soustraction de relatifs, suppression des parenthèses, sommes de plusieurs relatifs, problèmes). Générateurs `cr5-`.
  - `data/cinquieme/graphiques.js` : 5e, chapitre 10 (en fonction de, formules et tableaux de valeurs, lecture de graphiques, proportionnalité et points alignés avec l'origine). Générateurs `gf5-` ; figure `grapheXY()`.
  - `data/cinquieme/calcul-litteral.js` : 5e, chapitre 11 (carrés et cubes, simplifications d'écriture, substitution, développer, factoriser, réduire, preuves et contre-exemples). Générateurs `cl5-`.
  - `data/cinquieme/parallelogrammes.js` : 5e, chapitre 12 (définition et propriétés, propriétés caractéristiques, rectangle, losange, carré, construction du quatrième sommet). Générateurs `pg5-` ; figure `figureQuad()`.
  - `data/cinquieme/statistiques.js` : 5e, chapitre 13 (effectifs, fréquences, moyenne, diagrammes en barres et circulaires, choix d'une représentation). Générateurs `st5-`.
  - `data/cinquieme/equations.js` : 5e, chapitre 14 (tester une égalité, x + b = c, ax = c, mise en équation de problèmes). Générateurs `eq5-`.
  - `data/cinquieme/aires.js` : 5e, chapitre 15 (unités d'aire, triangle, parallélogramme, disque, figures composées). Générateurs `ai5-` ; figure `figureAireTri()`.
  - `data/cinquieme/probabilites.js` : 5e, chapitre 16 (expérience aléatoire, issues, évènements, échelle, calcul en équiprobabilité, fréquences). Générateurs `pb5-`.
  - `data/cinquieme/solides-volumes.js` : 5e, chapitre 17 (perspective cavalière, patrons, volumes du cube, du pavé, du prisme et du cylindre, unités de volume et de capacité). Générateurs `sv5-`.
  - `data/cinquieme/informatique.js` : 5e, chapitre 18 (entrées et sorties, variable réponse, expressions informatiques, boucles, paramètres d'un programme). Générateurs `pr5-` ; figures `blocs()`.
  - `data/quatrieme/divisibilite.js` : 4e, chapitre 1 (nombres premiers, décomposition en facteurs premiers, fractions irréductibles, problèmes). Générateurs `dp4-` dans `assets/exercices-quatrieme.js` (même modèle que la 5e).
  - `data/quatrieme/relatifs.js` : 4e, chapitre 2 (règle des signes, produits et quotients de relatifs, signe d'un produit, priorités). Générateurs `rx4-`.
  - `data/quatrieme/pythagore.js` : 4e, chapitre 3 (racine carrée, théorème de Pythagore et réciproque, problèmes). Générateurs `py4-` ; figure `figureRectangle4()`.
- `data/seconde/ensembles.js` : chapitre 1 de Seconde (ensembles de nombres, intervalles, valeur absolue). Les générateurs d'exercices correspondants commencent par `ens-`, `int-` et `abs-` dans `assets/exercices.js`.
- `data/seconde/information-chiffree.js` : chapitre 3 de Seconde.
- `data/seconde/arithmetique.js` : chapitre 4 de Seconde (multiples, diviseurs, parité, nombres premiers, fractions irréductibles). Générateurs `ar-` dans `assets/exercices.js`.
- `data/seconde/calcul-litteral.js` : chapitre 5 de Seconde (puissances, racines, développer, factoriser, équations). Générateurs `cl-`.
- `data/seconde/fonctions-affines.js` : chapitre 6 de Seconde (fonctions affines, inégalités, inéquations). Générateurs `fa-`.
- `data/seconde/vecteurs.js` : chapitre 7 de Seconde (translation, coordonnées, milieu, distance). Générateurs `ve-` ; les figures de vecteurs utilisent l'option `fleches` de `graph()`.
- `data/seconde/statistiques.js` : chapitre 8 de Seconde (moyenne, médiane, quartiles, écart type). Générateurs `st-`.
- `data/seconde/variations.js` : chapitre 9 de Seconde (variations, extremums, fonctions carré et valeur absolue, optimisation). Générateurs `var-` et `vx-`.
- `data/seconde/tableaux-croises.js` : chapitre 10 de Seconde (tableaux croisés, fréquences conditionnelles, probabilités). Générateurs `tc-`.
- `data/seconde/colinearite.js` : chapitre 11 de Seconde (colinéarité, déterminant, alignement). Générateurs `co-`.
- `data/seconde/droites.js` : chapitre 12 de Seconde (vecteur directeur, équations cartésienne et réduite, intersection). Générateurs `dr-`.
- `data/seconde/fonctions-reference.js` : chapitre 13 de Seconde (inverse, racine carrée, cube, √2 irrationnel). Générateurs `fr-`.
- `data/seconde/signes.js` : chapitre 14 de Seconde (tableaux de signes, inéquations et équations quotients). Générateurs `sg-`.
- `data/seconde/probabilites-conditionnelles.js` : chapitre 15 de Seconde (probabilités conditionnelles, arbres pondérés, dépistage). Générateurs `pc-` ; arbres dessinés par la fonction `arbre()`.
- `data/seconde/statistiques-2.js` : chapitre 16 de Seconde (séries en classes, loi des grands nombres, fluctuation). Générateurs `ec-`.
- `data/seconde/synthese.js` : chapitre 17 de Seconde (problèmes de synthèse, bilan des raisonnements). Générateurs `sy-`.
- `data/seconde/automatismes.js` : automatismes de Seconde (10 fiches, séries flash, test).
- `data/automatismes/*.js` : partie Automatismes, un fichier par thème officiel de l'épreuve anticipée (calcul numérique, calcul algébrique, proportions, évolutions, fonctions, statistiques, probabilités). Les générateurs d'exercices correspondants commencent par `am-` dans `assets/exercices.js`.
- Première spécialité, dans l'ordre de la progression spiralée 2026-2027 (un fichier par chapitre dans `data/premiere/`) :
  - `suites.js` : chapitre 1, suites (généralités). Générateurs `suite-` et `su-`.
  - `second-degre.js` : chapitre 2, second degré (forme factorisée). Générateurs `sd-` et `s2-`.
  - `suites-arithmetiques.js` : chapitre 3. Générateurs `su-arith-`, `su-somme-entiers`.
  - `probabilites.js` : chapitre 4, probabilités conditionnelles et indépendance. Générateurs `pi-` (et `pc-` de Seconde).
  - `second-degre-2.js` : chapitre 5, second degré (forme canonique, discriminant, courbe de x ↦ f(x − m)). Générateurs `sd-` et `s5-`.
  - `suites-geometriques.js` : chapitre 6, suites géométriques (taux constant, somme des puissances, limite, seuil). Générateurs `suite-` et `su-geo-`.
  - `derivation-1.js` : chapitre 7, dérivation (taux de variation, nombre dérivé, tangente, approximation linéaire). Générateurs `d1-`.
  - `trigonometrie.js` : chapitre 8, trigonométrie (radian, enroulement, cosinus et sinus, valeurs remarquables, Archimède). Générateurs `tr-`.
  - `derivation-2.js` : chapitre 9, fonction dérivée (formules usuelles, produit, quotient, g(ax + b), dérivabilité). Générateurs `d2-`.
  - `variations-courbes.js` : chapitre 10, variations (signe de f′, extremums, parité, inégalités, optimisation, Newton). Générateurs `vr-`, tableaux avec `tabSV`.
  - `produit-scalaire-1.js` : chapitre 11, produit scalaire (cosinus, projection, coordonnées, orthogonalité, travail d'une force). Générateurs `ps-`.
  - `exponentielle.js` : chapitre 12, fonction exponentielle (définition, relation fonctionnelle, e^(at), suites géométriques, Euler). Générateurs `ex-`.
  - `variables-aleatoires.js` : chapitre 13, variables aléatoires (loi, espérance, variance, tombola, épreuves répétées en arbre). Générateurs `va-` (et `ld-loi-esperance`).
  - `produit-scalaire-2.js` : chapitre 14, produit scalaire (bilinéarité, identités, Al-Kashi, îlots du lagon, MA · MB = 0, contraposée). Générateurs `sc-`.
  - `geometrie-reperee.js` : chapitre 15, géométrie repérée (vecteur normal, projeté orthogonal, cercles, antenne relais). Générateurs `gr-`.
  - `echantillons.js` : chapitre 16, expérimentations sur les échantillons (simulation avec random() et un tableur, moyenne d'un échantillon, écart 2σ/√n, Monte-Carlo pour une aire et pour π, régimes de bananes). Générateurs `sm-` (et `ec-python`, `ec-lgn` de Seconde).
  - `epreuve-anticipee.js` : chapitre 17, préparation à l'épreuve anticipée (format de l'épreuve, automatismes, rédaction, bilan des raisonnements, cinq sujets types à Mayotte, liens vers les sujets zéro d'Eduscol). Générateurs `ea-` : `ea-flash-1re`, `ea-partie1`, des séries par thème qui mélangent les générateurs des chapitres 1 à 15 (liste `EA_THEMES`), et `ea-redaction`, `ea-raisonnement`, `ea-cncs`, `ea-vrai-faux`.
- `data/terminale-spe/denombrement.js` : chapitre 14 de Terminale spécialité (combinatoire et dénombrement). Les générateurs d'exercices correspondants commencent par `cd-` dans `assets/exercices.js`.
- `data/terminale/` : Terminale maths complémentaires, d'après la progression spiralée 2026-2027 (programme de 2019, toujours en vigueur pour ce niveau).
  - `suites.js` : chapitre 1, suites et modèles discrets (récurrence, escalier, limites, gendarmes, suites et sommes géométriques, modèle de Malthus, Python). Générateurs `tsu-` (et `suite-`, `su-geo-limite`). `graph()` accepte une option `chemins` (lignes brisées pointillées, pour l'escalier).
  - `lois-discretes.js` : chapitre 2 (et la loi géométrique du chapitre 10).
  - `limites-continuite.js` : chapitre 4 (limites de référence, asymptotes, opérations, continuité, TVI, balayage, dichotomie, coût moyen, température d'équilibre). Générateurs `tlf-`.
  - `inference-bayesienne.js` : chapitre 5 (arbres, Bayes, a priori et a posteriori, sensibilité, spécificité, valeurs prédictives, VPP en fonction de la prévalence, dengue et leptospirose). Générateurs `tcb-` (et `pi-totales`, `pi-inverser`).
  - `deux-variables.js` : chapitre 6 (nuage, point moyen, moindres carrés, corrélation, interpolation et extrapolation, changement de variable, corrélation et causalité). Générateurs `tsd-`.
  - `derivation-composees.js` : chapitre 7 (g(ax + b), exp(u), u², étude de fonctions composées, racine carrée réciproque du carré, boîte et enclos). Générateurs `tdc-`.
  - `logarithme.js` : chapitre 8 (réciproque de exp, propriétés, équations, seuils avec ln qⁿ, étude de ln, ln u, Neper et Briggs, Brouncker). Générateurs `tln-`.
  - `convexite.js` : chapitre 9 (dérivée seconde, convexité, sécantes et tangentes, inflexion, inégalités, épidémie). Générateurs `tcv-`.
  - `loi-geometrique.js` : chapitre 10, approfondit la loi géométrique du chapitre 2 (P(X > n), espérance, absence de mémoire, crues et période de retour, seuils avec ln, simulation). Générateurs `tlg-`.
  - `primitives-equations-differentielles.js` : chapitre 11, primitives (usuelles, formes 2uu' et u'e^u, condition initiale), équations y' = ay et y' = ay + b, médicament et refroidissement, méthode d'Euler en Python. Générateurs `tpe-`.
  - `integration.js` : chapitre 12, intégrale et aire, Chasles, linéarité, encadrement, rectangles, fonction définie par une intégrale, calcul par primitives, signe quelconque, aire entre deux courbes, valeur moyenne, parcelle au bord du lagon (quadrature de la parabole), Python (rectangles, trapèzes, Monte-Carlo). Générateurs `tin-`. Option `aires` de graph() pour hachurer un domaine.
  - `lois-densite.js` : chapitre 13, densité et probabilité comme aire, fonction de répartition, espérance et variance, loi uniforme (attente de la barge), loi exponentielle, absence de mémoire, demi-vie d'un atome radioactif, Python (exponentielle à partir de random(), sommes). Générateurs `tld-`.
  - `repartition-richesses.js` : chapitre 14, déciles et rapport interdécile, chiffres INSEE Mayotte 2018, courbe de Lorenz, indice de Gini (intégrale, trapèzes en Python). Générateurs `trr-`.
  - `echantillonnage-synthese.js` : chapitre 15, série des moyennes et écart type σ/√n, repères 68-95-99,7 %, simulation Python, sondage sur la vaccination et fourchette, biais, problèmes de synthèse et idées de Grand oral. Générateurs `tec-` (et sm-intervalle de Première).
  - `arithmetico-geometriques.js` : chapitre 3 (suite constante, suite auxiliaire, limite, seuil, plat qui refroidit, dette). Générateurs `tag-`.

Les niveaux du catalogue sont Seconde, Automatismes, Première spécialité, Terminale spécialité (`terminale-spe`) et Terminale maths complémentaires (`terminale`). Chaque niveau a sa couleur dans `assets/style.css` (règles `[data-niv="..."]`), et chaque classe des comptes a son nom court dans le classement du Défi (`COURTES` dans `assets/app.js`).
- `data/seconde/fonctions.js` : tout le contenu du chapitre pilote (cours, liens des vidéos YouTube, PDF, QCM, fiche méthode).
  Les règles d'écriture sont rappelées en haut du fichier.

## Le reste
- `assets/exercices.js` : graphiques et générateurs d'exercices aléatoires (indices et solutions). `graph()` place seul les étiquettes (points, courbes, vecteurs, droites horizontales, nom de l'axe) là où elles ne se chevauchent pas, et n'écrit pas un nombre d'axe qui tomberait dessous.
- `assets/app.js` : navigation, QCM, points et étoiles.
  - Une série ne pose jamais deux fois la même question, et évite celles de l'essai précédent ; le Défi évite les 20 dernières questions.
  - Un QCM compte 12 questions : 9 tirées dans la banque du chapitre (en évitant celles de l'essai précédent) et 3 questions à choix fabriquées par les générateurs du chapitre. Les banques peuvent donc grandir sans allonger le QCM.
  - Une liste écrite dans une seule formule avec « ; » (`$3 ; 11 ; 19$`) est coupée en petites formules pour passer à la ligne sur téléphone : séparer les listes par « ; » plutôt que par `\,;\,`.
- `assets/compte.js` : comptes élèves et sauvegarde de la progression.
- `assets/style.css` : mise en page, thème clair et sombre.
- `assets/ruines.css` et `assets/ruines-*.svg` : thème « Ruines » (temple au soleil, inspiré des jeux de puzzle dans des ruines antiques ; dessins originaux). Ces fichiers ne sont téléchargés que par les élèves qui choisissent ce thème (bouton Clair · Sombre · Ruines sur ordinateur, bouton rond qui fait tourner les trois sur téléphone). Les couleurs se retouchent directement dans `ruines.css` ; les trois dessins sont calculés par les scripts de `outils/ruines/` (`node outils/ruines/scene.js assets`, idem pour `mur.js` et `sigils.js`).
- `assets/katex/` : affichage des formules, hébergé avec le site (pas de dépendance externe).
- `outils/apercu.py` : assemble le site en un seul fichier HTML pour l'aperçu.
- `outils/comptes/creer-comptes.js` : création des comptes élèves et du compte professeur (voir « Comptes élèves »).
- `firestore.rules` et `firebase.json` : règles de sécurité des comptes dans Firebase.

## Règles de qualité des exercices
- Une même série ne repose jamais deux fois la même question, et chaque générateur doit produire au moins 29 questions différentes.
- Une question à deux réponses possibles (vrai/faux, oui/non) n'accorde pas de deuxième essai : une erreur affiche la solution et donne 0 point (`assets/app.js`). Les séries « vrai ou faux » de Terminale passent par `vraiFaux4` (`assets/exercices.js`) : une seule affirmation vraie (ou fausse) parmi quatre.
- « Arrondi au millième / au centième / à l'unité / à la dizaine » : la tolérance n'accepte que le bon arrondi (0,0006 ; 0,006 ; 0,5 ; 5).

## Ajouter un chapitre
1. Copier `data/seconde/fonctions.js` sous un nouveau nom et remplacer le contenu.
2. Ajouter une ligne `<script src="data/...">` dans `index.html`.
3. Passer le chapitre en `statut: "disponible"` dans `data/catalogue.js`.

## Version des fichiers (à chaque mise en ligne)
Les liens de `index.html` finissent par `?v=...` (par exemple `?v=20261007b`). À chaque mise en ligne, remplacer cette valeur partout dans `index.html` par une nouvelle (la date, plus une lettre). Sinon, les navigateurs des élèves peuvent garder l'ancienne version des fichiers jusqu'à 10 minutes, même après avoir rechargé la page.

## Le jeu « Les Salles »
Le jeu existe en deux versions :
- **Moyen (lycée)** : dossier `les-salles/`, adresse `#jeu.moyen` ;
- **Facile (primaire et collège)** : dossier `les-salles-ecole/`, adresse `#jeu.facile`.

La page **Jeu** du site (lien « Jeu » en haut, adresse `#jeu`) propose de choisir le niveau, puis affiche la version choisie dans un cadre ; le code de cette page est la fonction `pageJeu` de `assets/app.js` (liste `VERSIONS_JEU`). La sauvegarde de chaque version reste dans le navigateur de chaque élève, sous une clé différente (`salles-maths-progression` et `salles-ecole-progression`). Pour mettre à jour la version école, suivez les étapes ci-dessous avec le dossier `les-salles-ecole`.

Installer une nouvelle version du jeu :
1. Décompressez le nouveau zip : vous obtenez un dossier `les-salles`.
2. Supprimez l'ancien dossier `les-salles/` du site, puis mettez le nouveau à sa place (même nom, à côté de `index.html`).
3. Vérifiez que le dossier ne contient pas de fichier de réponses, puis remettez le site en ligne.
Sur GitHub, le plus simple est de demander à Claude de le faire : il remplace le dossier sur `main` et `gh-pages`. Rien d'autre à modifier, tant que la page du jeu reste `les-salles/index.html`.

## Mise en ligne
Voir `MISE-EN-LIGNE.md` (GitHub Pages, gratuit, sans rien installer).

## Comptes élèves
Les comptes des classes sont **créés par le professeur** : chaque élève se connecte avec l'identifiant (`prenom.nom`) et le mot de passe qu'on lui a remis (transmis sur Pronote).

### Comptes créés sur le site
La page Mon compte > « Créer un compte » propose deux choix, après un rappel aux élèves de M. Cadena qu'ils ont déjà leurs identifiants :
- **Élève** : prénom, nom (facultatif), niveau, identifiant et mot de passe. Le compte est rangé dans « Autres élèves » (collection Firestore `inscrits`) : la progression est gardée, mais l'élève n'apparaît ni dans le suivi des classes ni dans le classement, et ne voit pas le classement.
- **Professeur** : prénom, nom, établissement, niveaux de ses classes, contact, message. La demande (collection `demandesProf`) reste **en attente** ; le demandeur n'a aucun droit et un bouton lui ouvre un mail déjà rédigé vers voltark976@gmail.com. Il peut aussi écrire directement à cette adresse.

Seul le compte **prof.maths** voit la page **Demandes de comptes** (`#demandes`, lien sur sa page Mon compte) : approuver, refuser, retirer l'accès, et la liste des autres élèves. Un professeur approuvé reçoit ses droits à sa connexion suivante : sa progression est gardée (collection `profs`), il n'apparaît pas dans le classement et ne voit aucun élève ni la fréquentation. Pour qu'il suive des classes, lui créer un compte avec `--prof` (ci-dessous).
Ces comptes ont une adresse technique `identifiant@inscrits.profmaths.example.com` (les comptes des classes : `@profmaths.example.com`) ; à la connexion, le site essaie d'abord les comptes des classes. Un refus ne supprime pas le compte : on peut le supprimer dans la console Firebase > Authentication.
Les règles le vérifient côté Firebase : un compte créé sur le site ne lit et n'écrit que sa propre fiche ou sa propre demande, ne peut pas créer une demande déjà approuvée ni changer son statut, et seul prof.maths (marque `prof` et adresse `prof.maths@…`) lit les demandes et change leur statut.
Leur progression (points, étoiles, meilleur QCM, date du dernier essai de chaque série) est enregistrée après chaque exercice.
Sans compte, la progression reste sur l'appareil mais ne rejoint pas le compte : chaque compte commence au niveau 1 et ne retrouve que sa propre progression.
À la déconnexion, la progression est effacée de l'appareil (utile sur un téléphone partagé) mais reste dans le compte.

Tant que `firebase` vaut `null` dans `data/config-comptes.js`, c'est un **mode démonstration** (comptes gardés sur l'appareil, création possible).

### Créer les comptes d'une classe
Sur l'ordinateur où `firebase login` a été fait, dans le dossier du site :
```
node outils/comptes/creer-comptes.js "C:\chemin\Comptes classe.xlsx"
```
Le fichier Excel (export Pronote) a une feuille par classe ou groupe, nommée par exemple `204`, `1SPE G2`, `Terminale SPE` ou `Terminale MATHS COMP`, avec soit une colonne « Élève » (« NOM Prénom »), soit deux colonnes « Nom » et « Prénom ». La classe affichée sur le site est déduite du nom de la feuille. Les élèves sortis, ceux qui ont déjà un compte et ceux déjà présents dans une autre feuille sont ignorés : on peut relancer la commande avec un fichier complété.
`--feuilles "204,207"` ne lit que ces feuilles, `--classe "Première spécialité"` impose la classe, `--essai` montre ce qui serait créé sans rien créer.

Les identifiants arrivent dans `Documents\Gestion site lycée` : `identifiants.csv` (Excel) et `identifiants.html` (étiquettes à imprimer et découper). **Ces fichiers ne doivent jamais aller dans le dossier du site**, qui est public.

- Mot de passe oublié : `node outils/comptes/creer-comptes.js --nouveau-mdp prenom.nom` (la progression est gardée).
- Compte professeur : `node outils/comptes/creer-comptes.js --prof prenom.nom --prenom Prénom --nom NOM` (crée ou réinitialise le compte ; mot de passe dans `Documents\Gestion site lycée\compte-professeur-prenom.nom.txt`). Avec `--groupes "Terminale SPE"`, le professeur ne voit que ces classes (sans l'option : toutes). Pour changer ses classes sans toucher à son mot de passe : `--rattacher prenom.nom --groupes "204,207"` ; `--defaut` lui donne aussi les nouvelles classes créées ensuite.
- Voir tous les comptes : console Firebase > Authentication > Utilisateurs (les élèves ont un UID qui commence par `eleve-`, les professeurs par `prof-`), ou `identifiants.csv`.

### Suivi des devoirs
Connecté avec le compte professeur, la page **Suivi des élèves** (`#suivi`, lien sur la page Mon compte) montre, par classe et par chapitre, les étoiles de chaque série, le score au QCM et la date du dernier essai. Le champ « Fait depuis le » ne compte que ce qui a été fait après la date donnée (le jour où le devoir a été donné, par exemple).
Tous les élèves des classes du professeur sont listés, y compris ceux qui ne se sont jamais connectés (en grisé, « jamais connecté ») : la liste de chaque classe (identifiant, prénom, nom, sans mot de passe) est écrite dans Firestore (collection `classes`, lecture réservée au professeur de la classe) par `creer-comptes.js`, automatiquement après une création, une resynchronisation ou une désactivation de comptes, ou à la demande avec `node outils/comptes/creer-comptes.js --classes`. Tant que cette liste n'a pas été envoyée, seuls les élèves déjà connectés apparaissent.
Chaque colonne du tableau se trie (toucher son titre ; une seconde fois pour inverser) et se filtre (ligne sous les titres : nom, date, durée, nombre d'étoiles, QCM fait ou non, XP…) ; « Effacer les filtres » revient au tableau complet.
Le choix **Tout le site** (premier de la liste des chapitres, ouvert par défaut) montre pour chaque élève de la classe la dernière activité, le temps passé sur les 7 derniers jours (ou depuis la date choisie) et au total, le nombre de chapitres ouverts ou travaillés, et, en touchant son nom, le détail par chapitre ; en dessous, les chapitres travaillés par la classe. Le temps est mesuré dans `assets/compte.js`, seulement pour un élève connecté : temps actif (onglet visible et page utilisée depuis moins de 3 minutes, ou vidéo en cours), gardé sur l'appareil puis ajouté toutes les 5 minutes et à la fermeture de la page dans sa fiche Firestore (`temps.j` par jour, `temps.ch` par chapitre, `temps.der` dernier jour par chapitre, `vuLe` dernière activité). Depuis fin octobre 2026, le temps est aussi mesuré pour les élèves inscrits sur le site (fiche `inscrits`) et pour les professeurs (fiche `profs`, qui reçoit alors aussi `identifiant`, `prenom` et `nom`) ; les essais en local ne sont pas mesurés et les élèves ne voient pas ces durées.

### Tous les comptes (prof.maths seulement)
La page **Tous les comptes** (`#comptes`, lien sur la page Mon compte de prof.maths) liste tous les comptes connus du site dans un seul tableau triable et filtrable comme le suivi : les élèves des classes (fiches `eleves` complétées par les listes `classes`, élèves jamais connectés en grisé), les élèves inscrits eux-mêmes (`inscrits`), les professeurs (`profs`, avec l'établissement et les niveaux de la demande pour un professeur extérieur) et les demandes de compte professeur en attente ou refusées (`demandesProf`). Pour chacun : type, classe, niveau, dernière activité, temps actif sur 7 jours et au total, XP, date de création. Seul prof.maths peut lire ces collections en entier (règles `chef()`). Un professeur créé avec `outils/comptes` n'y apparaît qu'après sa première connexion suivant cette mise à jour (c'est elle qui écrit sa fiche `profs`).

### Fréquentation du site
La page **Fréquentation du site** (`#frequentation`, lien sur la page Mon compte du professeur) montre les visites par jour, la part des téléphones, les onglets ouverts par niveau et par chapitre, et les élèves connectés par classe, sur 7, 30 ou 90 jours ou 12 mois. Ce sont des compteurs anonymes rangés dans Firestore (collections `visites` et `visitesChap`) : aucun nom, aucun cookie, aucun service extérieur. Chaque appareil compte une fois par jour pour le site et une fois par jour pour chaque onglet ; les visites des comptes professeurs et les essais en local (localhost) ne sont pas comptés. Les règles `firestore.rules` n'autorisent qu'à ajouter 1 à un compteur, et seuls les professeurs peuvent les lire.

### Sécurité (Firebase)
Le prénom, le nom, la classe et le groupe sont inscrits dans le compte lui-même au moment de la création. Les règles `firestore.rules` n'ouvrent les classes, le classement et la fréquentation qu'à ces comptes ; un compte créé sur le site n'a que sa fiche « Autres élèves » ou sa demande de compte professeur (voir plus haut), tout autre compte ne peut rien lire ni écrire, et un élève ne peut ni changer son nom ni lire la progression des autres. Après une modification des règles :
```
firebase deploy --only firestore:rules --project profmaths-ca535
```
Dans la console Firebase, Authentication > Méthode de connexion : seul **Adresse e-mail/Mot de passe** reste activé (Google désactivé).

### Installer Firebase sur un nouveau projet (une seule fois)
1. Aller sur https://console.firebase.google.com avec votre compte Google, « Créer un projet » (Google Analytics inutile).
2. Menu **Authentication** > Commencer > activer **Adresse e-mail/Mot de passe**.
3. Menu **Firestore Database** > Créer une base (région europe-west), mode production, puis publier les règles avec la commande ci-dessus.
4. Paramètres du projet > Vos applications > icône Web `</>` : copier l'objet `firebaseConfig` dans `data/config-comptes.js`.
5. Authentication > Paramètres > Domaines autorisés : ajouter l'adresse du site (ex. `xxx.github.io`).
