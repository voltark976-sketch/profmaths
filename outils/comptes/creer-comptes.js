/*
  Création des comptes élèves (à lancer sur l'ordinateur du professeur, connecté avec « firebase login »).

    node outils/comptes/creer-comptes.js "C:\chemin\Comptes classe.xlsx"
        Une feuille par classe (le nom de la feuille = le groupe, ex. 204), colonne « Élève » au format
        « NOM Prénom » (export Pronote). Les élèves déjà créés sont ignorés, ceux marqués « Sortie » aussi.
    node outils/comptes/creer-comptes.js --nouveau-mdp prenom.nom
        Donne un nouveau mot de passe à un élève (sa progression est gardée).
    node outils/comptes/creer-comptes.js --prof identifiant
        Crée (ou réinitialise) le compte du professeur, qui voit la page « Suivi des élèves ».
        Son mot de passe est écrit dans Documents\Gestion site lycée\compte-professeur.txt.

  Option --classe "Première spécialité" : classe affichée sur le site et dans le classement
    (par défaut, devinée d'après le nom de la feuille : « 2xx » Seconde, « 1SPE » Première spécialité,
    « Terminale SPE », « Terminale MATHS COMP »).
  Option --feuilles "204,207" : ne lire que ces feuilles.
    node outils/comptes/creer-comptes.js --desactiver-inconnus
        Désactive les comptes élèves présents dans Firebase mais absents de comptes.json.
    node outils/comptes/creer-comptes.js --resynchroniser
        Renvoie à Firebase tous les comptes de comptes.json (mots de passe et classes de la liste).
  Option --essai : affiche les comptes qui seraient créés, sans rien créer.

  Les identifiants et mots de passe sont écrits dans Documents\Gestion site lycée (hors du dépôt public) :
  identifiants.csv (ouvrable dans Excel) et identifiants.html (étiquettes à imprimer et découper).
  Ne jamais copier ces fichiers dans le dossier du site.
*/
"use strict";
const fs = require("fs"), path = require("path"), zlib = require("zlib"), crypto = require("crypto"), os = require("os");
const { execFileSync } = require("child_process");

const PROJET = "profmaths-ca535", DOMAINE = "profmaths.example.com";
const DOSSIER = path.join(os.homedir(), "Documents", "Gestion site lycée");
const REGISTRE = path.join(DOSSIER, "comptes.json");
// Paramètres scrypt du fichier d'import (Firebase les convertit à la première connexion)
const SCRYPT = { N: 16384, r: 8, p: 1, dkLen: 64 };

/* ---------- Lecture d'un fichier .xlsx (zip + XML), sans dépendance ---------- */
function lireZip(fichier) {
  const b = fs.readFileSync(fichier), out = {};
  let fin = b.length - 22;
  while (fin >= 0 && b.readUInt32LE(fin) !== 0x06054b50) fin--;
  let p = b.readUInt32LE(fin + 16);
  const n = b.readUInt16LE(fin + 10);
  for (let i = 0; i < n; i++) {
    const methode = b.readUInt16LE(p + 10), taille = b.readUInt32LE(p + 20);
    const ln = b.readUInt16LE(p + 28), lx = b.readUInt16LE(p + 30), lc = b.readUInt16LE(p + 32), local = b.readUInt32LE(p + 42);
    const nom = b.toString("utf8", p + 46, p + 46 + ln);
    const debut = local + 30 + b.readUInt16LE(local + 26) + b.readUInt16LE(local + 28);
    const brut = b.subarray(debut, debut + taille);
    out[nom] = (methode === 8 ? zlib.inflateRawSync(brut) : brut).toString("utf8");
    p += 46 + ln + lx + lc;
  }
  return out;
}
const dec = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");
function lireXlsx(fichier) {
  const z = lireZip(fichier);
  const ss = [...(z["xl/sharedStrings.xml"] || "").matchAll(/<si>([\s\S]*?)<\/si>/g)].map((m) => dec([...m[1].matchAll(/<t[^>]*>([\s\S]*?)<\/t>/g)].map((t) => t[1]).join("")));
  const liens = Object.fromEntries([...z["xl/_rels/workbook.xml.rels"].matchAll(/<Relationship [^>]*?Id="([^"]+)"[^>]*?Target="([^"]+)"/g)].map((m) => [m[1], m[2]]));
  const feuilles = {};
  for (const m of z["xl/workbook.xml"].matchAll(/<sheet [^>]*?name="([^"]*)"[^>]*?r:id="([^"]+)"/g)) {
    const xml = z["xl/" + liens[m[2]].replace(/^\/?xl\//, "")];
    feuilles[dec(m[1])] = [...xml.matchAll(/<row[^>]*>([\s\S]*?)<\/row>/g)].map((r) => {
      const ligne = [];
      for (const c of r[1].matchAll(/<c r="([A-Z]+)\d+"([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
        const col = c[1].split("").reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0) - 1;
        const v = (c[3] || "").match(/<v>([\s\S]*?)<\/v>/);
        ligne[col] = /t="s"/.test(c[2]) ? ss[+v[1]] : /t="inlineStr"/.test(c[2]) ? dec(((c[3] || "").match(/<t[^>]*>([\s\S]*?)<\/t>/) || [])[1] || "") : v ? dec(v[1]) : "";
      }
      return ligne;
    });
  }
  return feuilles;
}

/* ---------- Identifiants et mots de passe ---------- */
const norm = (s) => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-]/g, "");
const majuscules = (w) => w === w.toUpperCase() && /[A-Z]/.test(w);
const CONS = "bcdfgjkmnprstvz", VOY = "aeiou";
// Facile à taper sur un téléphone : trois syllabes et deux chiffres (ex. bamoti42)
function motDePasse(syllabes = 3) {
  let s = "";
  for (let i = 0; i < syllabes; i++) s += CONS[crypto.randomInt(CONS.length)] + VOY[crypto.randomInt(VOY.length)];
  return s + crypto.randomInt(10, 100);
}
function compteImport(c, mdp, claims) {
  const sel = crypto.randomBytes(16);
  return {
    localId: c.uid, email: `${c.identifiant}@${DOMAINE}`, emailVerified: true, displayName: c.prenom,
    passwordHash: crypto.scryptSync(mdp, sel, SCRYPT.dkLen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p, maxmem: 64 * 1024 * 1024 }).toString("base64"),
    salt: sel.toString("base64"), customAttributes: JSON.stringify(claims)
  };
}
const FIREBASE = process.platform === "win32" ? "firebase.cmd" : "firebase";
function importer(comptes) {
  const tmp = path.join(os.tmpdir(), `profmaths-import-${Date.now()}.json`);
  fs.writeFileSync(tmp, JSON.stringify({ users: comptes }));
  try {
    // Trois essais (réseau instable) ; renvoie true si l'envoi a réussi
    for (let essai = 1; essai <= 3; essai++) {
      try {
        const sortie = execFileSync(FIREBASE, ["auth:import", tmp, "--project", PROJET,
          "--hash-algo=STANDARD_SCRYPT", `--mem-cost=${SCRYPT.N}`, `--block-size=${SCRYPT.r}`, `--parallelization=${SCRYPT.p}`, `--dk-len=${SCRYPT.dkLen}`],
        { stdio: "pipe", encoding: "utf8", shell: process.platform === "win32" });
        if (/Imported successfully/.test(sortie) && !/problems/i.test(sortie)) return true;
        console.warn(sortie);
      } catch (e) { console.warn(`Envoi à Firebase échoué (essai ${essai}/3)`); }
    }
    return false;
  } finally { fs.rmSync(tmp, { force: true }); }
}
// Liste des comptes existants dans Firebase (sans les mots de passe)
function comptesFirebase() {
  const tmp = path.join(os.tmpdir(), `profmaths-export-${Date.now()}.json`);
  try {
    execFileSync(FIREBASE, ["auth:export", tmp, "--format=json", "--project", PROJET], { stdio: "ignore", shell: process.platform === "win32" });
    return JSON.parse(fs.readFileSync(tmp, "utf8")).users || [];
  } finally { fs.rmSync(tmp, { force: true }); }
}
// Classe affichée sur le site, d'après le nom de la feuille (ex. « 204 », « 1SPE G2 », « Terminale SPE »)
function classeDeFeuille(nom) {
  const n = norm(nom.replace(/\s+/g, ""));
  if (/^term/.test(n) || /^t/.test(n)) return /comp/.test(n) ? "Terminale maths complémentaires" : "Terminale spécialité";
  if (/^1|^prem/.test(n)) return "Première spécialité";
  return "Seconde";
}
const claimsEleve = (c) => ({ eleve: true, prenom: c.prenom, nom: c.nom, classe: c.classe, groupe: c.groupe });

/* ---------- Fichiers à distribuer ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
function ecrireListes(reg) {
  const eleves = reg.eleves.filter((c) => c.mdp).sort((a, b) => a.groupe.localeCompare(b.groupe) || a.nom.localeCompare(b.nom));
  const csv = ["Groupe;Nom;Prénom;Identifiant;Mot de passe"].concat(eleves.map((c) => [c.groupe, c.nom, c.prenom, c.identifiant, c.mdp].join(";")));
  fs.writeFileSync(path.join(DOSSIER, "identifiants.csv"), "\ufeff" + csv.join("\r\n"));
  const etiquettes = eleves.map((c) => `<div class="e"><b>${esc(c.prenom)} ${esc(c.nom)}</b> <small>${esc(c.groupe)}</small><br>Site : voltark976-sketch.github.io/profmaths<br>Identifiant : <code>${esc(c.identifiant)}</code><br>Mot de passe : <code>${esc(c.mdp)}</code></div>`).join("");
  fs.writeFileSync(path.join(DOSSIER, "identifiants.html"), `<!doctype html><meta charset="utf-8"><title>Identifiants ProfMaths</title>
<style>body{font:14px system-ui,sans-serif;margin:1cm}.g{display:grid;grid-template-columns:1fr 1fr;gap:0}.e{border:1px dashed #999;padding:.45cm;line-height:1.6;break-inside:avoid}code{font-size:16px}small{color:#666}</style>
<p>Identifiants des élèves : imprimer, découper et distribuer. Ne pas publier.</p><div class="g">${etiquettes}</div>`);
}

/* ---------- Programme ---------- */
fs.mkdirSync(DOSSIER, { recursive: true });
const reg = fs.existsSync(REGISTRE) ? JSON.parse(fs.readFileSync(REGISTRE, "utf8")) : { eleves: [], prof: null };
const args = process.argv.slice(2), opt = (n) => { const i = args.indexOf(n); return i < 0 ? null : args.splice(i, 2)[1]; };
const essai = args.includes("--essai") && args.splice(args.indexOf("--essai"), 1);
const desactiver = args.includes("--desactiver-inconnus") && args.splice(args.indexOf("--desactiver-inconnus"), 1);
const resync = args.includes("--resynchroniser") && args.splice(args.indexOf("--resynchroniser"), 1);
const feuilles = (opt("--feuilles") || "").split(",").map((x) => x.trim()).filter(Boolean);
const classe = opt("--classe"), reinit = opt("--nouveau-mdp"), prof = opt("--prof");
const sauver = () => { fs.writeFileSync(REGISTRE, JSON.stringify(reg, null, 1)); ecrireListes(reg); };

if (prof) {
  const mdp = motDePasse(5);
  const idProf = prof.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9._-]/g, "") || "prof";
  reg.prof = { identifiant: idProf, uid: "prof-" + norm(prof) };
  importer([compteImport(Object.assign({ prenom: "Professeur" }, reg.prof), mdp, { prof: true, prenom: "Professeur" })]);
  sauver();
  fs.writeFileSync(path.join(DOSSIER, "compte-professeur.txt"), `Identifiant : ${reg.prof.identifiant}\r\nMot de passe : ${mdp}\r\n`);
  console.log(`\nCompte professeur ${reg.prof.identifiant} : mot de passe dans ${path.join(DOSSIER, "compte-professeur.txt")}`);
} else if (reinit) {
  const c = reg.eleves.find((x) => x.identifiant === reinit);
  if (!c) { console.error("Identifiant inconnu : " + reinit); process.exit(1); }
  c.mdp = motDePasse();
  importer([compteImport(c, c.mdp, claimsEleve(c))]);
  sauver();
  console.log(`\n${c.prenom} ${c.nom} : nouveau mot de passe ${c.mdp}`);
} else if (args[0]) {
  const pris = new Set(reg.eleves.map((c) => c.identifiant)), nouveaux = [];
  const vus = new Map(reg.eleves.map((c) => [c.nom + "|" + c.prenom, c.groupe]));
  for (const [groupe, lignes] of Object.entries(lireXlsx(args[0]))) {
    if (feuilles.length && !feuilles.includes(groupe)) continue;
    const cl = classe || classeDeFeuille(groupe);
    const tete = lignes[0] || [], col = (t) => tete.findIndex((x) => x && x.trim().startsWith(t));
    // Deux formats Pronote : « Élève » = « NOM Prénom », ou deux colonnes « Nom » et « Prénom »
    const cEleve = col("Élève"), cNom = col("Nom"), cPrenom = col("Prénom"), cSortie = col("Sortie");
    if (cEleve < 0 && (cNom < 0 || cPrenom < 0)) { console.log(`Feuille « ${groupe} » ignorée : pas de colonne Élève ni Nom/Prénom`); continue; }
    for (const l of lignes.slice(1)) {
      if (!l) continue;
      let nom, prenom;
      if (cEleve >= 0) {
        const mots = String(l[cEleve] || "").trim().split(/\s+/).filter(Boolean);
        nom = mots.filter(majuscules).join(" "); prenom = mots.filter((w) => !majuscules(w)).join(" ") || nom;
      } else { nom = String(l[cNom] || "").trim().toUpperCase(); prenom = String(l[cPrenom] || "").trim(); }
      if (!nom || !prenom) continue;
      if (cSortie >= 0 && l[cSortie]) { console.log(`Ignoré (sorti) : ${nom} ${prenom}`); continue; }
      const cle = nom + "|" + prenom;
      if (vus.has(cle)) { if (vus.get(cle) !== groupe) console.log(`Déjà dans « ${vus.get(cle)} », ignoré dans « ${groupe} » : ${nom} ${prenom}`); continue; }
      vus.set(cle, groupe);
      const base = (norm(prenom.split(/\s/)[0]) + "." + norm(nom.split(/\s/)[0])).slice(0, 27);
      let id = base, k = 2;
      while (pris.has(id)) id = base + k++;
      pris.add(id);
      nouveaux.push({ groupe, classe: cl, nom, prenom, identifiant: id, uid: "eleve-" + id, mdp: motDePasse() });
    }
  }
  if (!nouveaux.length) { console.log("Aucun nouvel élève."); process.exit(0); }
  if (essai) { nouveaux.forEach((c) => console.log(`${c.groupe.padEnd(22)} ${c.classe.padEnd(32)} ${c.identifiant.padEnd(28)} ${c.prenom} | ${c.nom}`)); console.log(`${nouveaux.length} comptes à créer (essai : rien n'est créé)`); process.exit(0); }
  // On ne garde que les comptes des envois réussis
  const crees = [], rates = [];
  for (let i = 0; i < nouveaux.length; i += 50) {
    const lot = nouveaux.slice(i, i + 50);
    (importer(lot.map((c) => compteImport(c, c.mdp, claimsEleve(c)))) ? crees : rates).push(...lot);
  }
  reg.eleves.push(...crees);
  sauver();
  console.log(`\n${crees.length} comptes créés. Identifiants dans ${DOSSIER}`);
  if (rates.length) console.log(`${rates.length} comptes NON créés (relancer la même commande) : ${rates.map((c) => c.identifiant).join(", ")}`);
} else if (resync) {
  // Renvoie à Firebase tous les comptes du registre, avec leurs mots de passe et leur classe
  let ok = 0;
  for (let i = 0; i < reg.eleves.length; i += 50) {
    const lot = reg.eleves.slice(i, i + 50);
    if (importer(lot.map((c) => compteImport(c, c.mdp, claimsEleve(c))))) ok += lot.length;
  }
  console.log(`${ok}/${reg.eleves.length} comptes renvoyés à Firebase.`);
} else if (desactiver) {
  // Comptes élèves présents dans Firebase mais absents du registre : désactivés, sans accès au site
  const connus = new Set(reg.eleves.map((c) => c.uid));
  const inconnus = comptesFirebase().filter((u) => u.localId.startsWith("eleve-") && !connus.has(u.localId));
  if (!inconnus.length) { console.log("Aucun compte élève inconnu."); process.exit(0); }
  importer(inconnus.map((u) => ({ localId: u.localId, email: u.email, disabled: true, customAttributes: "{}" })));
  console.log(`${inconnus.length} comptes désactivés : ${inconnus.map((u) => u.email.split("@")[0]).join(", ")}`);
} else {
  console.log(fs.readFileSync(__filename, "utf8").split("*/")[0]);
}
