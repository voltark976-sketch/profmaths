/*
  Vérifie un chapitre du jeu « Les Salles » (version chapitre) :   node outils/salles-verifier.js premiere-suites
  - chaque générateur donne au moins 29 questions différentes (énoncé + réponse, sur 3 000 tirages) ;
  - chaque réponse est un nombre décimal (4 chiffres après la virgule au plus : jamais une fraction cachée) ;
  - toutes les formules passent par KaTeX sans erreur ;
  - aucune notation brute (_ ^ \ { }) hors des $…$ et du `code` ;
  - chaque salle a autant de stèles que de T dans son plan (idem A, H), et une seule passerelle juste.
*/
const fs = require("fs"), path = require("path"), vm = require("vm");
const racine = path.join(__dirname, "..");
const id = process.argv[2] || "premiere-suites";
const katex = require(path.join(racine, "assets/katex/katex.min.js"));

const style = { setProperty() {} };
const ctx = { window: {}, document: { documentElement: { style }, getElementById: () => null }, Math, console };
ctx.window = ctx;
vm.runInNewContext(fs.readFileSync(path.join(racine, "les-salles/chapitres", id + ".js"), "utf8"), ctx);
const { GEN, problemeBoss, LECONS } = ctx.SALLES_GEN;
let erreurs = 0;
const ko = (m) => { erreurs++; console.log("✗ " + m); };

// Un texte : formules KaTeX valides, rien de brut dehors
function texte(t, ou) {
  if (typeof t !== "string") return;
  const morceaux = t.split("$");
  if (morceaux.length % 2 === 0) ko(`${ou} : nombre impair de $ dans « ${t} »`);
  morceaux.forEach((m, k) => {
    if (k % 2 === 1) {
      try { katex.renderToString(m, { throwOnError: true }); } catch (e) { ko(`${ou} : KaTeX refuse « ${m} » (${e.message})`); }
    } else {
      const hors = m.replace(/`[^`]*`/g, "");
      if (/[_^\\{}]/.test(hors)) ko(`${ou} : notation brute dans « ${hors} »`);
    }
  });
}
function exercice(e, ou) {
  if (typeof e.reponse !== "number" || !isFinite(e.reponse)) ko(`${ou} : réponse non numérique`);
  else if (Math.abs(e.reponse * 1e4 - Math.round(e.reponse * 1e4)) > 1e-6) ko(`${ou} : réponse ${e.reponse} non décimale`);
  ["titre", "enonce", "indice", "explication"].forEach((c) => texte(e[c], `${ou}.${c}`));
}

const N = 3000;
for (const nom of Object.keys(GEN)) {
  const vus = new Set();
  for (let i = 0; i < N; i++) {
    const e = GEN[nom]();
    exercice(e, nom);
    vus.add(e.enonce + "|" + e.reponse);
    if (erreurs > 20) process.exit(1);
  }
  console.log(`${vus.size >= 29 ? "✓" : "✗"} ${nom.padEnd(22)} ${vus.size >= 1000 ? "≥ 1000" : vus.size} questions différentes`);
  if (vus.size < 29) erreurs++;
}
const vusBoss = new Set();
for (let i = 0; i < N; i++) {
  const b = problemeBoss();
  texte(b.contexte, "boss.contexte");
  b.exercices.forEach((e, k) => exercice(e, "boss.q" + (k + 1)));
  vusBoss.add(b.contexte);
}
console.log(`${vusBoss.size >= 29 ? "✓" : "✗"} ${"boss (énigme)".padEnd(22)} ${vusBoss.size} énoncés différents`);
for (const [k, l] of Object.entries(LECONS)) ["titre", "texte", "exemple"].forEach((c) => texte(l[c], `leçon ${k}.${c}`));

// Les salles : plans et nombres de stèles
const compte = (plan, l) => plan.join("").split(l).length - 1;
ctx.CHAPITRES.forEach((ch) => ch.salles.forEach((s) => {
  for (let i = 0; i < 50; i++) s.preparer();
  const larg = s.plan[0].length;
  if (s.plan.some((l) => l.length !== larg)) ko(`${s.nom} : lignes du plan de longueurs différentes`);
  if (compte(s.plan, "T") !== s.steles.length) ko(`${s.nom} : ${compte(s.plan, "T")} T pour ${s.steles.length} stèles`);
  if (compte(s.plan, "A") !== s.bonus.length) ko(`${s.nom} : ${compte(s.plan, "A")} A pour ${s.bonus.length} stèles d'or`);
  if (compte(s.plan, "H") !== (s.acrobaties || []).length) ko(`${s.nom} : H et acrobaties`);
  const P = compte(s.plan, "P");
  s.steles.forEach((st) => st.exercices.forEach((e) => { if (e.effet === "passerelle" && e.reponse !== P) ko(`${s.nom} : passerelle de ${P} cases, réponse ${e.reponse}`); }));
  texte(s.athena, s.nom + ".athena");
  s.guides.forEach((g) => texte(g.texte, s.nom + ".guide"));
  console.log(`✓ ${s.nom} : ${s.steles.length} stèle(s) de pierre, ${s.bonus.length} d'or${P ? ", passerelle " + P : ""}`);
}));
texte(ctx.CHAPITRES[0].introduction, "introduction");
texte(ctx.CHAPITRES[0].conclusion, "conclusion");
console.log(erreurs ? `\n${erreurs} problème(s)` : "\nTout est bon.");
process.exitCode = erreurs ? 1 : 0;
