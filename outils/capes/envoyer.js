/*
  Préparation au CAPES : envoie les fiches (fichiers Markdown d'un dossier PRIVÉ, hors du dépôt) dans Firestore,
  collection « capes », que les règles réservent au seul compte prof.maths. À lancer sur l'ordinateur du professeur,
  connecté avec « firebase login ». Format des fichiers : outils/capes/LISEZMOI.md.

    node outils/capes/envoyer.js                 vérifie puis envoie le dossier par défaut
    node outils/capes/envoyer.js "C:\…\capes"    autre dossier
  Options :
    --essai      vérifie seulement (format, formules KaTeX), n'envoie rien
    --apercu     écrit aussi une copie dans capes-apercu/ (dossier du site, ignoré par git) pour tester la page en local
    --nettoyer   supprime de Firestore les fiches qui ne sont plus dans le dossier (jamais « sommaire » ni « progression »)

  Dossier par défaut : Documents\Gestion site lycée\capes (sommaire.md + un fichier .md par fiche, sous-dossiers permis ;
  les fichiers dont le nom commence par « _ » sont ignorés : brouillons, modèles).
*/
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");
const F = require("./format");

const PROJET = "profmaths-ca535";
const SITE = path.resolve(__dirname, "..", "..");
const args = process.argv.slice(2);
const opt = (k) => args.includes(k);
const DOSSIER = args.find((a) => !a.startsWith("--")) || path.join(os.homedir(), "Documents", "Gestion site lycée", "capes");

// Le dossier des fiches ne doit jamais être dans le dépôt (public)
function horsDepot(d) {
  const rel = path.relative(SITE, path.resolve(d));
  return rel.startsWith("..") || path.isAbsolute(rel);
}

function fichiersMd(d) {
  const out = [];
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name.startsWith("_") || e.name.startsWith(".")) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) out.push(...fichiersMd(p));
    else if (/\.md$/i.test(e.name)) out.push(p);
  }
  return out;
}

function lireTout() {
  if (!fs.existsSync(DOSSIER)) throw new Error(`Dossier introuvable : ${DOSSIER}`);
  if (!horsDepot(DOSSIER)) throw new Error(`Le dossier des fiches est dans le dépôt du site (public) : ${DOSSIER}. Range-le ailleurs.`);
  const fichiers = fichiersMd(DOSSIER);
  const fSom = fichiers.find((f) => path.basename(f).toLowerCase() === "sommaire.md");
  if (!fSom) throw new Error(`sommaire.md manquant dans ${DOSSIER}`);
  const rel = (f) => path.relative(DOSSIER, f);
  const erreurs = [];
  let som = null;
  try { som = F.sommaire(fs.readFileSync(fSom, "utf8"), rel(fSom)); } catch (e) { erreurs.push(e.message); }
  const elements = [];
  for (const f of fichiers.filter((x) => x !== fSom)) {
    try { elements.push(Object.assign(F.element(fs.readFileSync(f, "utf8"), rel(f), path.basename(f, ".md").toLowerCase()), { fichier: rel(f) })); }
    catch (e) { erreurs.push(e.message); }
  }
  // Identifiants uniques, rubriques connues
  const vus = {};
  for (const el of elements) {
    if (vus[el.id]) erreurs.push(`${el.fichier} : identifiant « ${el.id} » déjà pris par ${vus[el.id]}`);
    vus[el.id] = el.fichier;
    if (som && !som.rubriques.some((r) => r.id === el.rubrique)) erreurs.push(`${el.fichier} : rubrique « ${el.rubrique} » absente de sommaire.md (connues : ${som.rubriques.map((r) => r.id).join(", ")})`);
  }
  // Formules : rendues par KaTeX, comme sur le site ; la moindre erreur arrête l'envoi
  const katex = require(path.join(SITE, "assets", "katex", "katex.min.js"));
  const verifier = (obj, fichier) => {
    for (const m of F.formules(obj)) {
      try { katex.renderToString(m.src, { throwOnError: true, displayMode: m.display }); }
      catch (e) { erreurs.push(`${fichier}${m.n ? ":" + m.n : ""} : formule « ${m.src.slice(0, 60)} » : ${String(e.message).replace(/^KaTeX parse error: /, "")}`); }
    }
  };
  if (som) verifier(som, rel(fSom));
  elements.forEach((el) => verifier(el, el.fichier));
  return { som, elements, erreurs };
}

// Sommaire envoyé : rubriques et, pour chaque fiche, de quoi l'afficher dans la liste sans la télécharger
function sommaireComplet(som, elements) {
  const compte = (el, type) => el.sections.filter((s) => s.type === type).reduce((n, s) => n + (s.items ? s.items.length : 1), 0);
  return F.sansLignes(Object.assign({}, som, {
    rubriques: som.rubriques.map((r) => Object.assign({}, r, {
      elements: elements.filter((el) => el.rubrique === r.id).sort((a, b) => a.ordre - b.ordre || a.titre.localeCompare(b.titre, "fr"))
        .map((el) => ({ id: el.id, titre: el.titre, resume: el.resume, nb: { fiche: compte(el, "fiche"), exercices: compte(el, "exercices"), qcm: compte(el, "qcm"), cartes: compte(el, "cartes") } })),
    })),
  }));
}

/* ---------- Firestore (API REST, jeton du compte « firebase login ») ---------- */
async function jetonFirebase() {
  const racine = execFileSync(process.platform === "win32" ? "npm.cmd" : "npm", ["root", "-g"], { encoding: "utf8", shell: process.platform === "win32" }).trim();
  const auth = require(path.join(racine, "firebase-tools", "lib", "auth"));
  const compte = auth.getGlobalDefaultAccount();
  if (!compte || !compte.tokens) throw new Error("Aucun compte Firebase connecté : lancer « firebase login »");
  return (await auth.getAccessToken(compte.tokens.refresh_token, [])).access_token;
}
const FIRESTORE = `https://firestore.googleapis.com/v1/projects/${PROJET}/databases/(default)/documents`;
async function appelFs(jeton, methode, chemin, corps) {
  const r = await fetch(FIRESTORE + chemin, { method: methode, headers: { Authorization: "Bearer " + jeton, "Content-Type": "application/json" }, body: corps ? JSON.stringify(corps) : undefined });
  if (!r.ok) throw new Error(`Firestore ${methode} ${chemin} : ${r.status} ${(await r.text()).slice(0, 200)}`);
  return r.json();
}
// Un document = quelques champs simples + le contenu en texte JSON (Firestore n'accepte pas les listes de listes)
const champs = (o) => ({
  titre: { stringValue: o.titre || "" }, rubrique: { stringValue: o.rubrique || "" }, ordre: { integerValue: String(o.ordre || 0) },
  contenu: { stringValue: JSON.stringify(o.contenu) }, majLe: { timestampValue: new Date().toISOString() },
});

(async () => {
  const { som, elements, erreurs } = lireTout();
  if (erreurs.length) {
    console.error(`${erreurs.length} erreur(s), rien n'est envoyé :`);
    erreurs.forEach((e) => console.error("  - " + e));
    process.exit(1);
  }
  const s = sommaireComplet(som, elements);
  for (const r of s.rubriques) {
    console.log(`${r.titre} : ${r.elements.length} fiche(s)`);
    r.elements.forEach((e) => console.log(`   ${e.id.padEnd(28)} ${e.titre}`));
  }
  const taille = (o) => Buffer.byteLength(JSON.stringify(o));
  const gros = elements.filter((el) => taille(F.sansLignes(el)) > 900000);
  if (gros.length) { console.error("Fiche trop grosse pour Firestore (900 ko au plus) : " + gros.map((g) => g.fichier).join(", ")); process.exit(1); }

  if (opt("--apercu")) {
    const d = path.join(SITE, "capes-apercu");
    fs.rmSync(d, { recursive: true, force: true });
    fs.mkdirSync(d);
    fs.writeFileSync(path.join(d, "sommaire.json"), JSON.stringify(s));
    for (const el of elements) fs.writeFileSync(path.join(d, el.id + ".json"), JSON.stringify(F.sansLignes(Object.assign({}, el, { fichier: undefined }))));
    console.log(`Aperçu local écrit dans ${d} (ignoré par git).`);
  }
  if (opt("--essai")) { console.log("Essai : tout est correct, rien n'est envoyé."); return; }

  const jeton = await jetonFirebase();
  await appelFs(jeton, "PATCH", "/capes/sommaire", { fields: champs({ titre: s.titre, contenu: s }) });
  for (const el of elements) {
    const c = F.sansLignes(Object.assign({}, el, { fichier: undefined }));
    await appelFs(jeton, "PATCH", "/capes/" + el.id, { fields: champs({ titre: el.titre, rubrique: el.rubrique, ordre: el.ordre, contenu: c }) });
  }
  console.log(`Envoyé : sommaire et ${elements.length} fiche(s).`);
  // Fiches présentes dans Firestore mais plus dans le dossier
  const existants = ((await appelFs(jeton, "GET", "/capes?pageSize=300&mask.fieldPaths=titre")).documents || []).map((d) => d.name.split("/documents/capes/")[1]);
  const orphelins = existants.filter((id) => !F.RESERVES.includes(id) && !elements.some((el) => el.id === id));
  if (orphelins.length && opt("--nettoyer")) {
    for (const id of orphelins) await appelFs(jeton, "DELETE", "/capes/" + id);
    console.log("Supprimées de Firestore : " + orphelins.join(", "));
  } else if (orphelins.length) console.log(`Encore dans Firestore mais plus dans le dossier : ${orphelins.join(", ")} (--nettoyer pour les supprimer).`);
})().catch((e) => { console.error(e.message); process.exit(1); });
