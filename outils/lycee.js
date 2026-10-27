/*
  Découpe assets/exercices.js (générateurs du lycée) en un fichier par niveau : assets/lycee/<niveau>.js.
  Un élève de Seconde ne télécharge ainsi que les générateurs dont la Seconde a besoin (bien moins lourd en 3G).

  assets/exercices.js reste LE fichier à modifier. Les fichiers assets/lycee/*.js sont FABRIQUÉS : ne pas les
  retoucher à la main. Ils sont refaits par   node outils/manifeste.js   (qui appelle ce module).

  Méthode : exercices.js est coupé en sections (lignes « /* ---------- … » ou « /* ===== … » au premier niveau,
  ou « /* Séries « flash » »). Le code est lu par l'analyseur acorn (outils/vendor/acorn.js, licence MIT) : pour
  chaque section, on relève les noms du premier niveau qu'elle utilise sans les déclarer elle-même, les clés
  GEN[…] et FIGURES[…] qu'elle définit, et les textes qu'elle contient (noms de séries ou de figures).
  Pour un niveau, on part des séries et des figures de ses chapitres et on ajoute toutes les sections dont elles
  dépendent. Les sections gardent leur ordre d'origine. Une clé fabriquée qu'on ne sait pas lire garde sa section
  dans tous les niveaux. À la fin, chaque fichier fabriqué est relu : un nom utilisé mais absent arrête tout.
*/
const fs = require("fs"), path = require("path"), vm = require("vm");
const acorn = require("./vendor/acorn.js");

const SOURCE = "assets/exercices.js";
const dossier = "assets/lycee";
const fichierNiveau = (id) => `${dossier}/${id}.js`;
const lire = (code) => acorn.parse(code, { ecmaVersion: "latest", locations: true });

/* ---------- Portée des noms ---------- */
const enfants = (n) => {
  const r = [];
  for (const k in n) {
    if (k === "type" || k === "start" || k === "end" || k === "loc") continue;
    const v = n[k];
    if (Array.isArray(v)) v.forEach((x) => x && typeof x.type === "string" && r.push(x));
    else if (v && typeof v.type === "string") r.push(v);
  }
  return r;
};
// Noms liés par un motif (const {a, b: [c]} = …)
function nomsDuMotif(p, out) {
  if (!p) return out;
  if (p.type === "Identifier") out.push(p.name);
  else if (p.type === "ObjectPattern") p.properties.forEach((q) => nomsDuMotif(q.type === "RestElement" ? q.argument : q.value, out));
  else if (p.type === "ArrayPattern") p.elements.forEach((q) => nomsDuMotif(q, out));
  else if (p.type === "AssignmentPattern") nomsDuMotif(p.left, out);
  else if (p.type === "RestElement") nomsDuMotif(p.argument, out);
  return out;
}
const estFonction = (n) => /^(FunctionDeclaration|FunctionExpression|ArrowFunctionExpression)$/.test(n.type);
// Déclarations « var » d'une fonction (sans entrer dans les fonctions imbriquées)
function varsDe(n, out) {
  for (const c of enfants(n)) {
    if (estFonction(c)) { if (c.type === "FunctionDeclaration" && c.id) { /* compté par le bloc */ } continue; }
    if (c.type === "VariableDeclaration" && c.kind === "var") c.declarations.forEach((d) => nomsDuMotif(d.id, out));
    varsDe(c, out);
  }
  return out;
}
// Déclarations d'un bloc : let, const, class, function
function blocDe(corps) {
  const out = [];
  corps.forEach((s) => {
    if (s.type === "VariableDeclaration" && s.kind !== "var") s.declarations.forEach((d) => nomsDuMotif(d.id, out));
    else if ((s.type === "FunctionDeclaration" || s.type === "ClassDeclaration") && s.id) out.push(s.id.name);
  });
  return out;
}
// Noms libres d'un nœud : ceux qu'il utilise sans les déclarer lui-même
function nomsLibres(racine) {
  const libres = new Set();
  const visite = (n, portee) => {
    if (!n) return;
    switch (n.type) {
      case "Identifier": if (!portee.has(n.name)) libres.add(n.name); return;
      case "MemberExpression": visite(n.object, portee); if (n.computed) visite(n.property, portee); return;
      case "Property": case "PropertyDefinition": case "MethodDefinition":
        if (n.computed) visite(n.key, portee);
        if (n.value) visite(n.value, portee);
        return;
      case "LabeledStatement": visite(n.body, portee); return;
      case "BreakStatement": case "ContinueStatement": return;
      case "VariableDeclarator": motifValeurs(n.id, portee); visite(n.init, portee); return;
      case "BlockStatement": case "Program": case "StaticBlock": {
        const p = new Set(portee); blocDe(n.body).forEach((x) => p.add(x));
        n.body.forEach((s) => visite(s, p)); return;
      }
      case "SwitchStatement": {
        visite(n.discriminant, portee);
        const p = new Set(portee); n.cases.forEach((c) => blocDe(c.consequent).forEach((x) => p.add(x)));
        n.cases.forEach((c) => { visite(c.test, p); c.consequent.forEach((s) => visite(s, p)); }); return;
      }
      case "ForStatement": case "ForInStatement": case "ForOfStatement": {
        const p = new Set(portee), init = n.init || n.left;
        if (init && init.type === "VariableDeclaration") init.declarations.forEach((d) => nomsDuMotif(d.id, []).forEach((x) => p.add(x)));
        enfants(n).forEach((c) => visite(c, p)); return;
      }
      case "CatchClause": {
        const p = new Set(portee); nomsDuMotif(n.param, []).forEach((x) => p.add(x));
        visite(n.body, p); return;
      }
      case "ClassDeclaration": case "ClassExpression": {
        const p = new Set(portee); if (n.id) p.add(n.id.name);
        visite(n.superClass, p); visite(n.body, p); return;
      }
      case "FunctionDeclaration": case "FunctionExpression": case "ArrowFunctionExpression": {
        const p = new Set(portee);
        if (n.id && n.type === "FunctionExpression") p.add(n.id.name);
        if (n.type !== "ArrowFunctionExpression") p.add("arguments");
        n.params.forEach((q) => nomsDuMotif(q, []).forEach((x) => p.add(x)));
        varsDe(n.body, []).forEach((x) => p.add(x));
        n.params.forEach((q) => motifValeurs(q, p));
        visite(n.body, p); return;
      }
      default: enfants(n).forEach((c) => visite(c, portee));
    }
  };
  // Dans un motif, seules les valeurs par défaut et les clés calculées utilisent des noms
  const motifValeurs = (q, portee) => {
    if (!q) return;
    if (q.type === "AssignmentPattern") { motifValeurs(q.left, portee); visite(q.right, portee); }
    else if (q.type === "ObjectPattern") q.properties.forEach((r) => { if (r.type === "RestElement") motifValeurs(r.argument, portee); else { if (r.computed) visite(r.key, portee); motifValeurs(r.value, portee); } });
    else if (q.type === "ArrayPattern") q.elements.forEach((r) => motifValeurs(r, portee));
    else if (q.type === "RestElement") motifValeurs(q.argument, portee);
  };
  visite(racine, new Set(varsDe(racine, [])));
  return libres;
}

/* ---------- Découpage en sections ---------- */
function decouper(src) {
  const code = src.replace(/\r\n/g, "\n"), L = code.split("\n");
  const debutGen = L.findIndex((l) => /^  const GEN = window\.PM_EXO\.GEN;/.test(l));
  const debutFin = L.findIndex((l, i) => i > debutGen && /^  \/\* Une « erreur connue »/.test(l));
  const debutIIFE = L.findIndex((l) => /^\(function \(\) \{/.test(l));
  if (debutGen < 0 || debutFin < 0 || debutIIFE < 0) throw new Error(`${SOURCE} : début ou fin des générateurs introuvable (repères « const GEN = window.PM_EXO.GEN; » et « /* Une « erreur connue » »)`);
  const bornes = [debutGen + 1];
  for (let i = debutGen + 1; i < debutFin; i++) if (/^  \/\* (-{5,}|={3,}|Séries « flash »)/.test(L[i])) bornes.push(i);
  bornes.push(debutFin);
  const b = [...new Set(bornes)].sort((x, y) => x - y);
  const sections = [];
  for (let k = 0; k < b.length - 1; k++) sections.push({ k, de: b[k], a: b[k + 1], texte: L.slice(b[k], b[k + 1]).join("\n"), instr: [] });
  // Instructions du premier niveau de la fonction englobante, rangées dans leur section (ligne de début)
  const ast = lire(code);
  const corps = ast.body[0].expression.callee.body.body;
  for (const s of corps) {
    const ligne = s.loc.start.line - 1;
    const sec = sections.find((x) => ligne >= x.de && ligne < x.a);
    if (sec) {
      if (s.loc.end.line - 1 >= sec.a) throw new Error(`${SOURCE}, ligne ${ligne + 1} : une instruction dépasse la section suivante (en-tête « /* ---------- » au milieu d'une instruction ?)`);
      sec.instr.push(s);
    }
  }
  return { tete: L.slice(debutIIFE, debutGen + 1).join("\n"), fin: L.slice(debutFin).join("\n").replace(/\n+$/, "") + "\n", sections };
}

/* ---------- Ce que chaque section déclare, définit et cite ---------- */
const nomCible = (o) => o && o.type === "Identifier" && (o.name === "GEN" || o.name === "FIGURES");
function analyser(sections) {
  const declare = Object.create(null), cles = Object.create(null), prefixes = [];
  const ajoute = (t, n, k) => (t[n] || (t[n] = new Set())).add(k);
  sections.forEach((s) => {
    s.decl = []; s.libres = new Set(); s.textes = new Set(); s.toujours = false;
    s.instr.forEach((st) => {
      if (st.type === "VariableDeclaration") st.declarations.forEach((d) => nomsDuMotif(d.id, s.decl));
      else if ((st.type === "FunctionDeclaration" || st.type === "ClassDeclaration") && st.id) s.decl.push(st.id.name);
      nomsLibres(st).forEach((n) => s.libres.add(n));
    });
    s.decl.forEach((n) => ajoute(declare, n, s.k));
    // Objets littéraux du premier niveau de la section : const EA_THEMES = { … }
    const objets = {};
    s.instr.forEach((st) => st.type === "VariableDeclaration" && st.declarations.forEach((d) => { if (d.id.type === "Identifier" && d.init && d.init.type === "ObjectExpression") objets[d.id.name] = d.init; }));
    const clesObjet = (o) => o.properties.map((p) => (p.type === "Property" && !p.computed ? (p.key.type === "Identifier" ? p.key.name : String(p.key.value)) : null));
    const alias = {}; // Object.keys(EA_THEMES).forEach((k) => { GEN[k] = … }) : k parcourt les clés d'EA_THEMES
    const parcours = (n) => {
      if (!n || typeof n !== "object") return;
      if (n.type === "CallExpression" && n.callee.type === "MemberExpression" && n.callee.property.name === "forEach") {
        const o = n.callee.object, fn = n.arguments[0];
        if (o.type === "CallExpression" && o.callee.type === "MemberExpression" && o.callee.object.name === "Object" && o.callee.property.name === "keys" && o.arguments[0] && objets[o.arguments[0].name] && fn && estFonction(fn) && fn.params[0] && fn.params[0].type === "Identifier") {
          const p = fn.params[0].name, avant = alias[p];
          alias[p] = clesObjet(objets[o.arguments[0].name]);
          enfants(n).forEach(parcours);
          alias[p] = avant;
          return;
        }
      }
      if (n.type === "Literal" && typeof n.value === "string") s.textes.add(n.value);
      if (n.type === "TemplateElement") s.textes.add(n.value.cooked);
      if (n.type === "MemberExpression" && !n.computed && nomCible(n.object)) s.textes.add(n.property.name); // FIGURES.pirogue()
      // GEN["x"] = …, FIGURES.x = …, FIGURES[`tc-venn-${z}`] = …
      if (n.type === "AssignmentExpression" && n.left.type === "MemberExpression" && nomCible(n.left.object)) {
        const p = n.left.property;
        if (!n.left.computed) ajoute(cles, p.name, s.k);
        else if (p.type === "Literal") ajoute(cles, String(p.value), s.k);
        else if (p.type === "Identifier" && alias[p.name] && alias[p.name].every((c) => c !== null)) alias[p.name].forEach((c) => ajoute(cles, c, s.k));
        else if (p.type === "TemplateLiteral" && p.quasis[0].value.cooked) prefixes.push([p.quasis[0].value.cooked, s.k]);
        else if (p.type === "BinaryExpression" && p.left.type === "Literal" && typeof p.left.value === "string" && p.left.value) prefixes.push([p.left.value, s.k]);
        else s.toujours = true; // clé calculée illisible : section prise partout
      }
      // Object.assign(GEN, { … }) ou Object.assign(FIGURES, { … })
      if (n.type === "CallExpression" && n.callee.type === "MemberExpression" && n.callee.object.name === "Object" && n.callee.property.name === "assign" && nomCible(n.arguments[0])) {
        n.arguments.slice(1).forEach((a) => {
          if (a.type !== "ObjectExpression") { s.toujours = true; return; }
          a.properties.forEach((p) => { if (p.type === "Property" && !p.computed) ajoute(cles, p.key.type === "Identifier" ? p.key.name : String(p.key.value), s.k); else s.toujours = true; });
        });
      }
      enfants(n).forEach(parcours);
    };
    s.instr.forEach(parcours);
  });
  const sectionsDeCle = (c) => {
    const r = new Set(cles[c] || []);
    prefixes.forEach(([p, k]) => { if (c.startsWith(p)) r.add(k); });
    return r;
  };
  sections.forEach((s) => {
    s.deps = new Set();
    s.libres.forEach((m) => (declare[m] || []).forEach((k) => s.deps.add(k)));
    s.textes.forEach((c) => sectionsDeCle(c).forEach((k) => s.deps.add(k)));
    s.deps.delete(s.k);
  });
  return { sectionsDeCle, declare };
}

// Textes cités par les chapitres de chaque niveau (séries, figures…), valeurs exactes
function besoinsParNiveau(racine, CATALOGUE, MANIFESTE, niveaux) {
  const res = {};
  const textes = (v, out) => { if (typeof v === "string") out.add(v); else if (v && typeof v === "object") Object.values(v).forEach((x) => textes(x, out)); return out; };
  for (const n of CATALOGUE.niveaux) {
    if (!niveaux.includes(n.id)) continue;
    const mots = new Set();
    for (const ch of n.chapitres) {
      const m = MANIFESTE[ch.id];
      if (!m) continue;
      const w = { CHAPITRES: {} };
      vm.runInNewContext(fs.readFileSync(path.join(racine, m.fichier), "utf8"), { window: w });
      textes(w.CHAPITRES[ch.id], mots);
      // figures écrites dans du HTML du cours : data-figure="nom"
      for (const x of JSON.stringify(w.CHAPITRES[ch.id]).matchAll(/data-figure=\\?["']([\w-]+)/g)) mots.add(x[1]);
    }
    res[n.id] = mots;
  }
  return res;
}

// Contrôle d'un fichier fabriqué : tout nom du premier niveau d'exercices.js qu'il utilise doit y être déclaré
function controler(texte, nomsSource, nom) {
  const ast = lire(texte);
  const iife = ast.body[0].expression.callee.body;
  const manque = [...nomsLibres(iife)].filter((n) => nomsSource.has(n));
  if (manque.length) throw new Error(`${nom} : nom(s) utilisé(s) mais absent(s) : ${manque.join(", ")}`);
}

// Renvoie { "assets/lycee/<niveau>.js": contenu } pour les niveaux demandés
function fabriquer(racine, CATALOGUE, MANIFESTE, niveaux) {
  const { tete, fin, sections } = decouper(fs.readFileSync(path.join(racine, SOURCE), "utf8"));
  const { sectionsDeCle, declare } = analyser(sections);
  const besoins = besoinsParNiveau(racine, CATALOGUE, MANIFESTE, niveaux);
  const nomsSource = new Set(Object.keys(declare));
  const sorties = {};
  for (const id of niveaux) {
    const pris = new Set(), pile = sections.filter((s) => s.toujours || !s.instr.length).map((s) => s.k);
    (besoins[id] || new Set()).forEach((c) => sectionsDeCle(c).forEach((k) => pile.push(k)));
    while (pile.length) { const k = pile.pop(); if (pris.has(k)) continue; pris.add(k); sections[k].deps.forEach((d) => pile.push(d)); }
    const corps = sections.filter((s) => pris.has(s.k)).map((s) => s.texte).join("\n");
    const texte = `/*
  FICHIER FABRIQUÉ AUTOMATIQUEMENT par   node outils/manifeste.js   — ne pas modifier à la main.
  Générateurs d'exercices du niveau « ${id} », extraits d'${SOURCE} (le fichier à modifier).
  Il a besoin d'assets/exercices-base.js, chargé avant lui. ${pris.size} sections sur ${sections.length}.
*/
${tete}
${corps}
${fin}`;
    controler(texte, nomsSource, fichierNiveau(id));
    sorties[fichierNiveau(id)] = texte;
  }
  return sorties;
}

module.exports = { SOURCE, dossier, fichierNiveau, fabriquer, decouper, analyser, nomsLibres };
