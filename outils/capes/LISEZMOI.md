# Préparation au CAPES (espace réservé au compte prof.maths)

Le site affiche la page `#capes` (bouton « Préparation au CAPES » de Mon compte) au seul compte **prof.maths**.
Le dépôt ne contient que le code de la page (`assets/capes.js`, `assets/capes.css`) : **aucun contenu**.
Les fiches sont dans Firestore, collection `capes`, que les règles réservent à ce compte :

```
match /capes/{doc=**} {
  allow read, write: if chef();
}
```

Pour tout autre compte ou un visiteur, c'est le serveur qui refuse la lecture. Ne jamais copier une fiche dans le dépôt :
il est public, comme le site.

## Écrire et envoyer les fiches

1. Les fichiers sont dans un dossier **privé**, par défaut `Documents\Gestion site lycée\capes` : `sommaire.md` et un fichier `.md` par fiche (sous-dossiers permis ; un fichier dont le nom commence par `_` est ignoré : brouillon, modèle).
2. `node outils/capes/envoyer.js --essai` vérifie tout (format, formules KaTeX) sans rien envoyer.
3. `node outils/capes/envoyer.js` envoie le sommaire et toutes les fiches (ordinateur connecté avec `firebase login`). Ta progression (`capes/progression`) n'est jamais touchée.
   - `--nettoyer` supprime de Firestore les fiches retirées du dossier.
   - `--apercu` écrit aussi une copie dans `capes-apercu/` (ignoré par git) : sur `localhost`, avec `localStorage["profmaths:capes-apercu"] = "1"`, la page lit cette copie, sans compte ni Firestore.
   - Un autre dossier : `node outils/capes/envoyer.js "C:\…\capes"`. L'outil refuse un dossier situé dans le dépôt.

## sommaire.md

```
---
titre: Préparation au CAPES de mathématiques
concours: CAPES externe bac+3 · session 2027
---
Texte d'accueil (facultatif).

# dates : Calendrier
- 2026-11-25 12:00 : Clôture des inscriptions
- 2027-03-09 : Début des écrits

# rubrique ecrit1 : Écrit 1 · épreuve disciplinaire
Description de l'épreuve.
```

Chaque `# rubrique <id> : Titre` crée une partie de la page d'accueil ; les fiches s'y rangent par leur en-tête `rubrique:`.
Le calendrier affiche un compte à rebours (J-n) pour les dates à venir.

## Une fiche

```
---
titre: Réduction des endomorphismes
rubrique: ecrit1
ordre: 10
resume: Éléments propres, diagonalisation…
source: (facultatif) d'où vient le contenu
---
Introduction (facultative).

# fiche : L'essentiel
Texte, $formule$, **gras**, [lien](https://…), listes « - » ou « 1. », intertitres « ### ».
$$ formule centrée $$

::: definition Valeur propre
…
:::

# exercices : Exercices type concours
## Titre de l'exercice
Énoncé.
::: indice
Premier indice (les indices s'affichent un par un).
:::
::: corrige
Corrigé (replié au départ).
:::

# qcm : QCM de révision
## Question avec $formule$ ?
- [ ] mauvais choix
- [x] bon choix (un seul)
- [ ] mauvais choix
Explication affichée après la correction.

# cartes : Cartes flash
## Recto (question)
Verso (réponse).

# liens : Pour aller plus loin
- [Titre](https://…) commentaire
```

- Identifiant de la fiche : le nom du fichier (ou `id:` dans l'en-tête), en minuscules sans accent, chiffres et tirets ; `sommaire` et `progression` sont réservés.
- Encadrés `::: type Titre facultatif` … `:::` (ils peuvent s'emboîter, par exemple une preuve dans un théorème) : `definition`, `theoreme`, `propriete`, `proposition`, `lemme`, `corollaire`, `preuve` (replié), `methode`, `exemple`, `contre-exemple`, `piege`, `remarque`, `a-savoir`, `jury`, `indice`, `corrige` (replié).
- QCM : au moins 3 choix, exactement un coché (jamais de question à 2 choix).
- Formules en KaTeX, écrites normalement (un seul antislash : `\lambda`, pas `\\lambda`).
- Une fiche ne doit pas dépasser 900 ko. Les PDF restent sur le Drive : mets leur lien dans une section `liens`.

Chaque page d'une fiche a « À voir / Vu / Revu / Maîtrisé » et garde le meilleur score de chaque QCM (document `capes/progression`).
