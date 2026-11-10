/*
  Teste firestore.rules sans les déployer, avec l'API Firebase Rules (projects/…:test).
  Usage : node outils/regles/tester-regles.js
  Il faut le CLI firebase installé et connecté (firebase login) : le jeton est celui de firebase-tools.
  Chaque cas dit si l'écriture ou la lecture doit être acceptée (ALLOW) ou refusée (DENY).
*/
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const P = "profmaths-ca535";
const racine = execSync("npm root -g").toString().trim();
const auth = require(path.join(racine, "firebase-tools/lib/auth"));
// Options : --regles <fichier> (autre fichier de règles), --seul <mot> (seulement les cas dont le nom contient ce mot)
const arg = (nom) => { const i = process.argv.indexOf(nom); return i > 0 ? process.argv[i + 1] : null; };
const regles = fs.readFileSync(arg("--regles") || path.join(__dirname, "../../firestore.rules"), "utf8");

const T = "2026-11-10T16:00:00Z";
const avantT = (s) => new Date(Date.parse(T) - s * 1000).toISOString();
const ELEVE = { uid: "e1", token: { eleve: true, email: "jean.dupont@profmaths.example.com", prenom: "Jean", nom: "DUPONT", classe: "Seconde", groupe: "204" } };
const INSCRIT = { uid: "i1", token: { email: "test1@inscrits.profmaths.example.com" } };
const CHEF = { uid: "c1", token: { prof: true, email: "prof.maths@profmaths.example.com" } };
const profil = { identifiant: "jean.dupont", prenom: "Jean", nom: "DUPONT", classe: "Seconde", groupe: "204" };
const DOC = "/databases/(default)/documents/";

// Fiche existante d'un élève (dernier enregistrement il y a 2 min, dernier envoi du temps il y a 5 min)
const fiche = (o = {}) => Object.assign({}, profil, {
  xp: 1200, exo: { "seconde-signes:s1": 3, "seconde-signes:s2": 2 }, qcm: { "seconde-signes": 18 }, jeux: { "chrono:seconde-signes": 120 },
  quand: { "seconde-signes:s1": 1762780000000 }, avatar: { peau: 2, t: 1 },
  temps: { j: { "2026-11-10": 1200 }, ch: { "seconde-signes": 900 }, der: { "seconde-signes": "2026-11-10" },
    jc: { "2026-11-10": { "seconde-signes": 900 } }, xp: { "seconde-signes": 300 }, xj: { "2026-11-10": { "seconde-signes": 300 } } },
  creeLe: "2026-10-10T06:25:32Z", majLe: avantT(120), vuLe: avantT(310),
}, o);
const plus = (base, o) => JSON.parse(JSON.stringify(Object.assign({}, base, o)));
const nCles = (n, v) => Object.fromEntries(Array.from({ length: n }, (_, i) => ["chap-" + i + ":serie", v]));

const cas = [];
const ecrire = (nom, attendu, qui, chemin, methode, nouveau, ancien) => cas.push({ nom, attendu, req: {
  expectation: attendu, request: Object.assign({ auth: qui, path: DOC + chemin, method: methode, time: T }, nouveau ? { resource: { data: nouveau } } : {}),
  resource: ancien ? { data: ancien } : undefined,
} });

// ---- Fiche d'un élève des classes ----
const neuve = Object.assign({}, profil, { xp: 0, exo: {}, qcm: {}, creeLe: T });
ecrire("élève : première connexion (fiche neuve)", "ALLOW", ELEVE, "eleves/e1", "create", neuve);
ecrire("élève : création avec des XP", "DENY", ELEVE, "eleves/e1", "create", plus(neuve, { xp: 500 }));
ecrire("élève : création avec une fausse date", "DENY", ELEVE, "eleves/e1", "create", plus(neuve, { creeLe: "2026-11-10T00:00:00Z" }));
const f = fiche();
ecrire("élève : fin de série (+100 XP, 1 série, 2 min après)", "ALLOW", ELEVE, "eleves/e1", "update",
  plus(f, { xp: 1300, exo: Object.assign({}, f.exo, { "seconde-signes:s3": 3 }), quand: Object.assign({}, f.quand, { "seconde-signes:s3": 1762790000000 }), majLe: T }), f);
ecrire("élève : +100 XP 10 s après le dernier enregistrement", "DENY", ELEVE, "eleves/e1", "update", plus(f, { xp: 1300, majLe: T }), fiche({ majLe: avantT(10) }));
ecrire("élève : 244 millions d'XP d'un coup", "DENY", ELEVE, "eleves/e1", "update", plus(f, { xp: 244445100, majLe: T }), fiche({ majLe: avantT(86400 * 3) }));
ecrire("élève : +15 000 XP après 3 jours (fusion d'un autre appareil)", "ALLOW", ELEVE, "eleves/e1", "update", plus(f, { xp: 16200, majLe: T }), fiche({ majLe: avantT(86400 * 3) }));
ecrire("élève : +25 000 XP après 3 jours", "DENY", ELEVE, "eleves/e1", "update", plus(f, { xp: 26200, majLe: T }), fiche({ majLe: avantT(86400 * 3) }));
ecrire("élève : XP qui baissent", "DENY", ELEVE, "eleves/e1", "update", plus(f, { xp: 100, majLe: T }), f);
ecrire("élève : XP en nombre décimal", "DENY", ELEVE, "eleves/e1", "update", plus(f, { xp: 1250.5, majLe: T }), f);
ecrire("élève : XP changés sans date du serveur", "DENY", ELEVE, "eleves/e1", "update", plus(f, { xp: 1250 }), f);
ecrire("élève : majLe inventée", "DENY", ELEVE, "eleves/e1", "update", plus(f, { xp: 1250, majLe: "2026-11-01T00:00:00Z" }), f);
ecrire("élève : creeLe changée", "DENY", ELEVE, "eleves/e1", "update", plus(f, { creeLe: "2026-09-01T00:00:00Z", majLe: T }), f);
ecrire("élève : 1 542 séries d'un coup", "DENY", ELEVE, "eleves/e1", "update", plus(f, { exo: nCles(1542, 3), majLe: T }), fiche({ majLe: avantT(86400 * 30) }));
ecrire("élève : 30 séries d'un coup après 1 jour (fusion)", "ALLOW", ELEVE, "eleves/e1", "update", plus(f, { exo: Object.assign(nCles(30, 2), f.exo), majLe: T }), fiche({ majLe: avantT(86400) }));
ecrire("élève : 30 séries d'un coup 1 min après", "DENY", ELEVE, "eleves/e1", "update", plus(f, { exo: Object.assign(nCles(30, 2), f.exo), majLe: T }), fiche({ majLe: avantT(60) }));
ecrire("élève : avatar changé 5 s après une série", "ALLOW", ELEVE, "eleves/e1", "update", plus(f, { avatar: { peau: 3, t: 2 }, majLe: T }), fiche({ majLe: avantT(5) }));
ecrire("élève : envoi complet de l'ancien site (+40 XP, 1 min)", "ALLOW", ELEVE, "eleves/e1", "update", plus(f, { xp: 1240, majLe: T }), fiche({ majLe: avantT(60) }));
ecrire("élève : prénom changé", "DENY", ELEVE, "eleves/e1", "update", plus(f, { prenom: "Jeanne", majLe: T }), f);
const t1 = JSON.parse(JSON.stringify(f.temps));
t1.j["2026-11-10"] += 300; t1.ch["seconde-signes"] += 300; t1.jc["2026-11-10"]["seconde-signes"] += 300; t1.xp["seconde-signes"] += 100; t1.xj["2026-11-10"]["seconde-signes"] += 100;
ecrire("élève : envoi du temps (5 min, +100 XP du chapitre)", "ALLOW", ELEVE, "eleves/e1", "update", plus(f, { temps: t1, vuLe: T }), f);
const t2 = JSON.parse(JSON.stringify(f.temps)); t2.j["2026-11-10"] += 5000;
ecrire("élève : +5 000 s de temps 5 min après le dernier envoi", "DENY", ELEVE, "eleves/e1", "update", plus(f, { temps: t2, vuLe: T }), f);
ecrire("élève : temps envoyé sans date du serveur", "DENY", ELEVE, "eleves/e1", "update", plus(f, { temps: t1 }), f);
const t3 = JSON.parse(JSON.stringify(f.temps)); t3.xj["2026-11-10"]["seconde-signes"] = 1000000;
ecrire("élève : un million d'XP du jour dans un chapitre (ramené par le suivi)", "ALLOW", ELEVE, "eleves/e1", "update", plus(f, { temps: t3, vuLe: T }), fiche({ vuLe: avantT(86400) }));
const t4 = JSON.parse(JSON.stringify(f.temps)); t4.j["2026-11-09"] = 90000;
ecrire("élève : plus de 24 h dans une journée", "DENY", ELEVE, "eleves/e1", "update", plus(f, { temps: t4, vuLe: T }), fiche({ vuLe: avantT(86400 * 3) }));
const t5 = Object.assign({}, f.temps, { triche: 1 });
ecrire("élève : rubrique inconnue dans temps", "DENY", ELEVE, "eleves/e1", "update", plus(f, { temps: t5, vuLe: T }), f);
const t6 = JSON.parse(JSON.stringify(f.temps)); t6.j["2026-11-10"] -= 100;
ecrire("élève : temps qui baisse", "DENY", ELEVE, "eleves/e1", "update", plus(f, { temps: t6, vuLe: T }), f);
const t7 = JSON.parse(JSON.stringify(f.temps)); for (let i = 0; i < 16; i++) t7.ch["chap-" + i] = 10; t7.j["2026-11-10"] += 160;
ecrire("élève : 16 chapitres changés d'un coup", "DENY", ELEVE, "eleves/e1", "update", plus(f, { temps: t7, vuLe: T }), f);
const t8 = JSON.parse(JSON.stringify(f.temps)); for (let i = 0; i < 6; i++) { t8.ch["chap-" + i] = 40; t8.der["chap-" + i] = "2026-11-10"; t8.jc["2026-11-10"]["chap-" + i] = 40; }
t8.j["2026-11-10"] += 240;
ecrire("élève : 6 chapitres visités en 5 min", "ALLOW", ELEVE, "eleves/e1", "update", plus(f, { temps: t8, vuLe: T }), f);
const t9 = JSON.parse(JSON.stringify(f.temps)); t9.j["2026-11-01"] = 3000;
ecrire("élève : temps ajouté à un jour ancien", "DENY", ELEVE, "eleves/e1", "update", plus(f, { temps: t9, vuLe: T }), fiche({ vuLe: avantT(86400 * 10) }));
const t10 = JSON.parse(JSON.stringify(f.temps)); t10.jc["2026-11-10"]["seconde-signes"] = 5000;
ecrire("élève : chapitre plus long que la journée (ramené par le suivi)", "ALLOW", ELEVE, "eleves/e1", "update", plus(f, { temps: t10, vuLe: T }), fiche({ vuLe: avantT(86400) }));
const t11 = JSON.parse(JSON.stringify(f.temps)); t11.j["2026-11-11"] = 200; t11.jc["2026-11-11"] = { "seconde-signes": 200 }; t11.xj["2026-11-11"] = { "seconde-signes": 40 };
ecrire("élève : après minuit à Mayotte (date du lendemain)", "ALLOW", ELEVE, "eleves/e1", "update", plus(f, { temps: t11, vuLe: T }), f);
const t12 = JSON.parse(JSON.stringify(f.temps)); t12.j["2026-11-09"] = 600; t12.jc["2026-11-09"] = { "seconde-signes": 600 }; t12.j["2026-11-10"] += 100;
ecrire("élève : temps resté sur le téléphone depuis la veille", "ALLOW", ELEVE, "eleves/e1", "update", plus(f, { temps: t12, vuLe: T }), fiche({ vuLe: avantT(86400) }));const t13 = JSON.parse(JSON.stringify(f.temps)); t13.jc["2026-11-07"] = { "seconde-signes": 600 };
ecrire("élève : temps de chapitre ajouté à un jour ancien", "DENY", ELEVE, "eleves/e1", "update", plus(f, { temps: t13, vuLe: T }), fiche({ vuLe: avantT(86400) }));
const fo = fiche(); delete fo.majLe; delete fo.vuLe; delete fo.temps;
ecrire("élève : ancienne fiche sans majLe ni temps, premier envoi", "ALLOW", ELEVE, "eleves/e1", "update", plus(fo, { xp: 1300, temps: t1, majLe: T, vuLe: T }), fo);
ecrire("élève : lire la fiche d'un autre", "DENY", ELEVE, "eleves/e2", "get", null, f);

// ---- Compte créé sur le site (« Autres élèves ») ----
const ins = { identifiant: "test1", prenom: "Test name", nom: "", niveau: "Terminale", xp: 0, exo: {}, qcm: {}, creeLe: T };
ecrire("inscrit : création du compte", "ALLOW", INSCRIT, "inscrits/i1", "create", ins);
ecrire("inscrit : création avec des XP", "DENY", INSCRIT, "inscrits/i1", "create", plus(ins, { xp: 244445100 }));
ecrire("inscrit : création avec 1 542 séries", "DENY", INSCRIT, "inscrits/i1", "create", plus(ins, { exo: nCles(1542, 3) }));
const insF = plus(ins, { xp: 300, creeLe: "2026-11-10T13:19:00Z", majLe: avantT(200), vuLe: avantT(200), temps: { j: { "2026-11-10": 400 } } });
ecrire("inscrit : fin de QCM (+80 XP)", "ALLOW", INSCRIT, "inscrits/i1", "update", plus(insF, { xp: 380, qcm: { "terminale-suites": 16 }, majLe: T }), insF);
ecrire("inscrit : creeLe remplacée par minuit", "DENY", INSCRIT, "inscrits/i1", "update", plus(insF, { creeLe: "2026-11-10T00:00:00Z", majLe: T }), insF);
ecrire("inscrit : écrire dans la fiche d'un élève", "DENY", INSCRIT, "eleves/e1", "update", plus(f, { majLe: T }), f);
ecrire("inscrit : lire le classement", "DENY", INSCRIT, "classement/e1", "get", null, { prenom: "Jean", classe: "Seconde", points: 10, majLe: avantT(5) });

// ---- Classement ----
const cl = { prenom: "Jean", classe: "Seconde", points: 300, majLe: avantT(120) };
ecrire("classement : première entrée", "ALLOW", ELEVE, "classement/e1", "create", plus(cl, { majLe: T }));
ecrire("classement : première entrée à 50 000 points", "DENY", ELEVE, "classement/e1", "create", plus(cl, { points: 50000, majLe: T }));
ecrire("classement : nouveau record (+500, 2 min après)", "ALLOW", ELEVE, "classement/e1", "update", plus(cl, { points: 800, majLe: T }), cl);
ecrire("classement : +5 000 points d'un coup", "DENY", ELEVE, "classement/e1", "update", plus(cl, { points: 5300, majLe: T }), fiche && plus(cl, { majLe: avantT(86400) }));
ecrire("classement : points sans date du serveur", "DENY", ELEVE, "classement/e1", "update", plus(cl, { points: 400 }), cl);
ecrire("classement : supprimer sa ligne", "DENY", ELEVE, "classement/e1", "delete", null, cl);

// ---- Professeur ----
const pf = { identifiant: "prof.maths", prenom: "Prof", nom: "", xp: 50, exo: {}, qcm: {}, jeux: {}, quand: {}, majLe: avantT(600), vuLe: avantT(600), temps: { j: { "2026-11-10": 60 } } };
ecrire("prof.maths : envoi de son temps", "ALLOW", CHEF, "profs/c1", "update", plus(pf, { temps: { j: { "2026-11-10": 360 } }, vuLe: T, identifiant: "prof.maths" }), pf);
ecrire("prof.maths : lire toutes les fiches", "ALLOW", CHEF, "eleves/e1", "get", null, f);

// ---- Préparation au CAPES (réservée à prof.maths) ----
const PROF = { uid: "p2", token: { prof: true, email: "louise.macron@profmaths.example.com" } };
ecrire("CAPES : prof.maths lit une fiche", "ALLOW", CHEF, "capes/ch1/fiches/f1", "get", null, { titre: "x" });
ecrire("CAPES : prof.maths écrit", "ALLOW", CHEF, "capes/ch1", "update", { titre: "y" }, { titre: "x" });
ecrire("CAPES : un autre professeur lit", "DENY", PROF, "capes/ch1", "get", null, { titre: "x" });
ecrire("CAPES : un élève lit", "DENY", ELEVE, "capes/ch1", "get", null, { titre: "x" });
ecrire("CAPES : un compte inscrit écrit", "DENY", INSCRIT, "capes/ch1", "create", { titre: "z" });

// ---- Fréquentation (inchangée, compteurs des onglets Révisions et Évaluation) ----
ecrire("visite : onglet Révisions express", "ALLOW", null, "visitesChap/2026-11-10_seconde-signes", "create", { j: "2026-11-10", ch: "seconde-signes", revisions: 1 });

(async () => {
  const tok = (await auth.getAccessToken(auth.getGlobalDefaultAccount().tokens.refresh_token, [])).access_token;
  if (arg("--seul")) cas.splice(0, cas.length, ...cas.filter((c) => c.nom.includes(arg("--seul"))));
  const body = { source: { files: [{ name: "firestore.rules", content: regles }] }, testSuite: { testCases: cas.map((c) => c.req) } };
  const r = await fetch(`https://firebaserules.googleapis.com/v1/projects/${P}:test`, { method: "POST", headers: { Authorization: "Bearer " + tok, "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json();
  if (!j.testResults) { console.error(JSON.stringify(j, null, 1)); process.exit(1); }
  let ko = 0;
  j.testResults.forEach((t, i) => {
    const ok = t.state === "SUCCESS";
    if (!ok) ko++;
    console.log(`${ok ? "ok " : "KO "} ${cas[i].attendu === "ALLOW" ? "accepté" : "refusé "} · ${cas[i].nom}${ok ? "" : "  → " + JSON.stringify(t.debugMessages || t.errorPosition || "").slice(0, 300)}`);
  });
  console.log(`\n${cas.length - ko}/${cas.length} cas conformes`);
  process.exit(ko ? 1 : 0);
})();
