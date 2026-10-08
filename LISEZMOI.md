# Site ProfMaths

Site statique : aucune base de données, aucun compte élève. Ouvrir `index.html` dans un navigateur suffit.

## Ce que vous pouvez modifier
- `data/catalogue.js` : la liste des niveaux et des chapitres (ordre des playlists, statut « disponible » ou « bientot »).
- `data/jeux.js` : le Défi chrono (onglet « Défi » de chaque chapitre) : durée, nombre de vies, séries exclues. Le classement (top 10 général et par classe) est dans la collection Firestore `classement` : prénom, classe et points seulement.
- `data/config-comptes.js` : activation des comptes élèves (Firebase) et liste des classes.
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
- `assets/katex/` : affichage des formules, hébergé avec le site (pas de dépendance externe).
- `outils/apercu.py` : assemble le site en un seul fichier HTML pour l'aperçu.
- `outils/comptes/creer-comptes.js` : création des comptes élèves et du compte professeur (voir « Comptes élèves »).
- `firestore.rules` et `firebase.json` : règles de sécurité des comptes dans Firebase.

## Ajouter un chapitre
1. Copier `data/seconde/fonctions.js` sous un nouveau nom et remplacer le contenu.
2. Ajouter une ligne `<script src="data/...">` dans `index.html`.
3. Passer le chapitre en `statut: "disponible"` dans `data/catalogue.js`.

## Version des fichiers (à chaque mise en ligne)
Les liens de `index.html` finissent par `?v=...` (par exemple `?v=20261007b`). À chaque mise en ligne, remplacer cette valeur partout dans `index.html` par une nouvelle (la date, plus une lettre). Sinon, les navigateurs des élèves peuvent garder l'ancienne version des fichiers jusqu'à 10 minutes, même après avoir rechargé la page.

## Le jeu « Les Salles »
Le jeu est dans le dossier `les-salles/` (page `les-salles/index.html`). La page **Jeu** du site (lien « Jeu » en haut, adresse `#jeu`) l'affiche dans un cadre ; le code de cette page est la fonction `pageJeu` de `assets/app.js`. La sauvegarde du jeu reste dans le navigateur de chaque élève.

Installer une nouvelle version du jeu :
1. Décompressez le nouveau zip : vous obtenez un dossier `les-salles`.
2. Supprimez l'ancien dossier `les-salles/` du site, puis mettez le nouveau à sa place (même nom, à côté de `index.html`).
3. Vérifiez que le dossier ne contient pas de fichier de réponses, puis remettez le site en ligne.
Sur GitHub, le plus simple est de demander à Claude de le faire : il remplace le dossier sur `main` et `gh-pages`. Rien d'autre à modifier, tant que la page du jeu reste `les-salles/index.html`.

## Mise en ligne
Voir `MISE-EN-LIGNE.md` (GitHub Pages, gratuit, sans rien installer).

## Comptes élèves
Les comptes sont **créés par le professeur** : les élèves ne peuvent plus s'inscrire. Chaque élève se connecte avec l'identifiant (`prenom.nom`) et le mot de passe qu'on lui a remis.
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
Un élève n'apparaît qu'après sa première connexion.

### Sécurité (Firebase)
Le prénom, le nom, la classe et le groupe sont inscrits dans le compte lui-même au moment de la création. Les règles `firestore.rules` n'acceptent que ces comptes : un compte créé autrement ne peut rien lire ni écrire, et un élève ne peut ni changer son nom ni lire la progression des autres. Après une modification des règles :
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
