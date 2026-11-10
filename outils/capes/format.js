/*
  Préparation au CAPES : lecture des fichiers Markdown (format décrit dans outils/capes/LISEZMOI.md)
  et transformation en objets JSON, ceux qu'affiche assets/capes.js.
  Ce fichier ne contient aucun contenu : les fiches restent dans un dossier privé, hors du dépôt.
*/
"use strict";

// Encadrés reconnus après « ::: » (le titre affiché par défaut est à droite)
const BOITES = {
  definition: "Définition", theoreme: "Théorème", propriete: "Propriété", proposition: "Proposition", lemme: "Lemme",
  corollaire: "Corollaire", preuve: "Démonstration", methode: "Méthode", exemple: "Exemple", "contre-exemple": "Contre-exemple",
  piege: "Piège", remarque: "Remarque", "a-savoir": "À savoir refaire", jury: "Côté jury", indice: "Indice", corrige: "Corrigé",
};
// Types de section (titres « # type : Titre »)
const SECTIONS = ["texte", "fiche", "exercices", "qcm", "cartes", "liens"];
const SECTIONS_SOMMAIRE = ["dates", "rubrique", "texte"];
const ID = /^[a-z0-9][a-z0-9-]{0,60}$/;
const RESERVES = ["sommaire", "progression"];

class ErreurFormat extends Error {
  constructor(fichier, ligne, message) { super(`${fichier}${ligne ? ":" + ligne : ""} : ${message}`); }
}

// En-tête « --- clé: valeur --- » ; renvoie les métadonnées et les lignes qui suivent (avec leur numéro)
function entete(src, fichier) {
  const lignes = src.replace(/^﻿/, "").replace(/\r\n?/g, "\n").split("\n").map((t, i) => ({ t, n: i + 1 }));
  const meta = {};
  if (lignes.length && lignes[0].t.trim() === "---") {
    const fin = lignes.findIndex((l, i) => i > 0 && l.t.trim() === "---");
    if (fin < 0) throw new ErreurFormat(fichier, 1, "l'en-tête commencé par « --- » n'est jamais fermé");
    for (const l of lignes.slice(1, fin)) {
      if (!l.t.trim() || l.t.trim().startsWith("#")) continue;
      const m = /^([a-zA-Zéè_-]+)\s*:\s*(.*)$/.exec(l.t);
      if (!m) throw new ErreurFormat(fichier, l.n, "ligne d'en-tête attendue sous la forme « clé: valeur »");
      meta[m[1].toLowerCase()] = m[2].trim();
    }
    return { meta, lignes: lignes.slice(fin + 1) };
  }
  return { meta, lignes };
}

// Suivi des formules centrées sur plusieurs lignes : « $$ » ouvre (sauf « $$ … $$ » sur une ligne), une ligne finie par « $$ » ferme
function etatMaths(maths, t) {
  if (maths) return !t.endsWith("$$");
  return t.startsWith("$$") && !t.slice(2).trim().endsWith("$$");
}

// Découpe en sections au niveau « # » (hors encadrés et formules centrées)
function decouper(lignes, niveau) {
  const marque = "#".repeat(niveau) + " ";
  const parts = [];
  let cur = { titre: null, n: 0, lignes: [] }, boite = 0, maths = false;
  for (const l of lignes) {
    const t = l.t.trim();
    if (!maths && /^:::\s*\S/.test(t)) boite++;
    else if (!maths && t === ":::") boite = Math.max(0, boite - 1);
    maths = etatMaths(maths, t);
    if (!boite && !maths && !t.startsWith("$$") && l.t.startsWith(marque)) { parts.push(cur); cur = { titre: l.t.slice(marque.length).trim(), n: l.n, lignes: [] }; continue; }
    cur.lignes.push(l);
  }
  parts.push(cur);
  return parts;
}

// Blocs d'un texte : paragraphes, listes, intertitres « ### », formules centrées « $$ … $$ », encadrés « ::: type Titre … ::: »
function blocs(lignes, fichier) {
  const out = [];
  let par = null, liste = null;
  const fin = () => { par = null; liste = null; };
  for (let i = 0; i < lignes.length; i++) {
    const l = lignes[i], t = l.t.trim();
    if (!t) { fin(); continue; }
    // Encadré
    const mb = /^:::\s*([a-z-]+)\s*(.*)$/.exec(t);
    if (mb) {
      fin();
      if (!BOITES[mb[1]]) throw new ErreurFormat(fichier, l.n, `encadré inconnu « ${mb[1]} » (connus : ${Object.keys(BOITES).join(", ")})`);
      let prof = 1, j = i + 1, maths = false;
      for (; j < lignes.length; j++) {
        const u = lignes[j].t.trim();
        const etait = maths;
        maths = etatMaths(maths, u);
        if (maths || etait) continue;
        if (/^:::\s*\S/.test(u)) prof++;
        else if (u === ":::" && --prof === 0) break;
      }
      if (j >= lignes.length) throw new ErreurFormat(fichier, l.n, `l'encadré « ${mb[1]} » n'est pas fermé par une ligne « ::: »`);
      out.push({ t: "boite", k: mb[1], titre: mb[2] || "", corps: blocs(lignes.slice(i + 1, j), fichier), n: l.n });
      i = j;
      continue;
    }
    if (t === ":::") throw new ErreurFormat(fichier, l.n, "« ::: » qui ne ferme aucun encadré");
    // Formule centrée
    if (t.startsWith("$$")) {
      fin();
      let src = t.slice(2), j = i;
      if (src.trim().endsWith("$$") && src.trim().length >= 2) src = src.trim().slice(0, -2);
      else {
        for (j = i + 1; j < lignes.length && !lignes[j].t.trim().endsWith("$$"); j++) src += "\n" + lignes[j].t;
        if (j >= lignes.length) throw new ErreurFormat(fichier, l.n, "formule « $$ » jamais fermée");
        src += "\n" + lignes[j].t.trim().slice(0, -2);
      }
      out.push({ t: "m", x: src.trim(), n: l.n });
      i = j;
      continue;
    }
    // Intertitre
    if (/^###\s/.test(t)) { fin(); out.push({ t: "h", x: t.replace(/^###\s+/, ""), n: l.n }); continue; }
    if (/^#{1,2}\s/.test(t)) throw new ErreurFormat(fichier, l.n, "titre « # » ou « ## » mal placé (dans un encadré ou une section qui n'a pas d'éléments)");
    // Listes
    const ml = /^(?:[-*]|(\d+)[.)])\s+(.*)$/.exec(t);
    if (ml && !/^-\s*\[[ xX]\]/.test(t)) {
      const type = ml[1] ? "ol" : "ul";
      if (!liste || liste.t !== type) { par = null; liste = { t: type, li: [], n: l.n }; out.push(liste); }
      liste.li.push(ml[2]);
      continue;
    }
    if (liste && /^\s{2,}/.test(l.t)) { liste.li[liste.li.length - 1] += " " + t; continue; }
    // Paragraphe
    liste = null;
    if (par) par.x += " " + t;
    else { par = { t: "p", x: t, n: l.n }; out.push(par); }
  }
  return out;
}

// Titre de section « type : Titre » ou « type id : Titre »
function titreSection(s, fichier, permis) {
  const m = /^([a-z]+)(?:\s+([a-z0-9-]+))?\s*(?::\s*(.*))?$/.exec(s.titre);
  if (!m || !permis.includes(m[1])) throw new ErreurFormat(fichier, s.n, `section « # ${s.titre} » : le titre doit commencer par l'un de ces mots : ${permis.join(", ")} (exemple : « # fiche : L'essentiel »)`);
  return { type: m[1], id: m[2] || "", titre: (m[3] || "").trim() };
}

function element(src, fichier, idParDefaut) {
  const { meta, lignes } = entete(src, fichier);
  const id = (meta.id || idParDefaut || "").toLowerCase();
  if (!ID.test(id)) throw new ErreurFormat(fichier, 0, `identifiant « ${id} » invalide (lettres minuscules sans accent, chiffres et tirets)`);
  if (RESERVES.includes(id)) throw new ErreurFormat(fichier, 0, `l'identifiant « ${id} » est réservé`);
  if (!meta.titre) throw new ErreurFormat(fichier, 1, "l'en-tête doit contenir « titre: … »");
  if (!meta.rubrique) throw new ErreurFormat(fichier, 1, "l'en-tête doit contenir « rubrique: … » (identifiant d'une rubrique du sommaire)");
  const parts = decouper(lignes, 1);
  const intro = blocs(parts[0].lignes, fichier);
  const sections = parts.slice(1).map((p) => section(p, fichier));
  if (!sections.length && !intro.length) throw new ErreurFormat(fichier, 0, "fichier vide");
  return {
    id, titre: meta.titre, rubrique: meta.rubrique, ordre: Number(meta.ordre) || 0, resume: meta.resume || "",
    source: meta.source || "", intro, sections,
  };
}

function section(p, fichier) {
  const { type, titre } = titreSection(p, fichier, SECTIONS);
  if (type === "texte" || type === "fiche") return { type, titre, corps: blocs(p.lignes, fichier) };
  if (type === "liens") {
    const b = blocs(p.lignes, fichier), liens = [];
    for (const x of b) {
      if (x.t !== "ul" && x.t !== "ol") throw new ErreurFormat(fichier, x.n, "section liens : une ligne « - [titre](https://…) commentaire » par lien");
      for (const li of x.li) {
        const m = /^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)\s*[:–-]?\s*(.*)$/.exec(li);
        if (!m) throw new ErreurFormat(fichier, x.n, `lien mal écrit : « ${li} » (attendu : [titre](https://…) commentaire)`);
        liens.push({ titre: m[1], url: m[2], note: m[3] });
      }
    }
    return { type, titre, liens };
  }
  const parts = decouper(p.lignes, 2);
  const intro = blocs(parts[0].lignes, fichier);
  const items = parts.slice(1);
  if (!items.length) throw new ErreurFormat(fichier, p.n, `section « ${type} » sans aucun élément « ## … »`);
  if (type === "exercices") {
    return {
      type, titre, intro, items: items.map((it) => {
        const b = blocs(it.lignes, fichier);
        const indices = b.filter((x) => x.t === "boite" && x.k === "indice").map((x) => x.corps);
        const corriges = b.filter((x) => x.t === "boite" && x.k === "corrige");
        if (corriges.length > 1) throw new ErreurFormat(fichier, it.n, "un seul encadré « ::: corrige » par exercice");
        return { titre: it.titre, enonce: b.filter((x) => !(x.t === "boite" && (x.k === "indice" || x.k === "corrige"))), indices, corrige: corriges.length ? corriges[0].corps : [], n: it.n };
      }),
    };
  }
  if (type === "cartes") return { type, titre, intro, items: items.map((it) => ({ recto: it.titre, verso: blocs(it.lignes, fichier), n: it.n })) };
  // QCM : « ## question », puis les choix « - [x] bonne réponse » / « - [ ] autre choix », puis l'explication
  return {
    type, titre, intro, items: items.map((it) => {
      const avant = [], apres = [], choix = [];
      for (const l of it.lignes) {
        const m = /^\s*[-*]\s*\[([ xX])\]\s+(.*)$/.exec(l.t);
        if (m) choix.push({ x: m[2].trim(), ok: m[1] !== " ", n: l.n });
        else if (choix.length && /^\s{2,}\S/.test(l.t) && !l.t.trim().startsWith("$$")) choix[choix.length - 1].x += " " + l.t.trim();
        else (choix.length ? apres : avant).push(l);
      }
      if (choix.length < 3) throw new ErreurFormat(fichier, it.n, "QCM : au moins 3 choix « - [ ] … » (jamais de question à 2 choix)");
      if (choix.filter((c) => c.ok).length !== 1) throw new ErreurFormat(fichier, it.n, "QCM : exactement un choix coché « - [x] … »");
      return { q: it.titre, suite: blocs(avant, fichier), choix: choix.map((c) => ({ x: c.x, ok: c.ok })), expl: blocs(apres, fichier), n: it.n };
    }),
  };
}

// sommaire.md : titre, concours, calendrier (« # dates »), rubriques (« # rubrique ecrit1 : Écrit 1 … »)
function sommaire(src, fichier) {
  const { meta, lignes } = entete(src, fichier);
  const parts = decouper(lignes, 1);
  const s = { titre: meta.titre || "Préparation au CAPES", concours: meta.concours || "", intro: blocs(parts[0].lignes, fichier), dates: [], rubriques: [] };
  for (const p of parts.slice(1)) {
    const { type, id, titre } = titreSection(p, fichier, SECTIONS_SOMMAIRE);
    if (type === "dates") {
      for (const x of blocs(p.lignes, fichier)) {
        if (x.t !== "ul") throw new ErreurFormat(fichier, x.n, "section dates : une ligne « - AAAA-MM-JJ : quoi » par date");
        for (const li of x.li) {
          const m = /^(\d{4}-\d{2}-\d{2})(?:[ T](\d{1,2})[:h](\d{2}))?\s*:\s*(.+)$/.exec(li);
          if (!m) throw new ErreurFormat(fichier, x.n, `date mal écrite : « ${li} » (attendu : 2027-03-09 : Début des écrits, ou 2026-11-25 12:00 : …)`);
          s.dates.push({ jour: m[1], heure: m[2] ? `${m[2].padStart(2, "0")}:${m[3]}` : "", quoi: m[4] });
        }
      }
    } else if (type === "rubrique") {
      if (!ID.test(id)) throw new ErreurFormat(fichier, p.n, "rubrique : écrire « # rubrique ecrit1 : Titre » (identifiant en minuscules)");
      if (s.rubriques.some((r) => r.id === id)) throw new ErreurFormat(fichier, p.n, `rubrique « ${id} » en double`);
      s.rubriques.push({ id, titre: titre || id, corps: blocs(p.lignes, fichier) });
    } else s.intro.push(...blocs(p.lignes, fichier));
  }
  if (!s.rubriques.length) throw new ErreurFormat(fichier, 0, "aucune rubrique « # rubrique id : Titre »");
  return s;
}

// Toutes les formules d'un objet (pour les vérifier avec KaTeX) : [{ src, display, n }]
function formules(obj) {
  const out = [];
  const texte = (s, n) => {
    String(s).replace(/\$\$([\s\S]+?)\$\$|\$([^$]+)\$/g, (m, d, i) => { out.push({ src: d || i, display: !!d, n }); return ""; });
  };
  const visite = (o, n) => {
    if (o == null) return;
    if (typeof o === "string") return texte(o, n);
    if (Array.isArray(o)) return o.forEach((x) => visite(x, n));
    if (typeof o === "object") {
      const ici = o.n || n;
      if (o.t === "m") { out.push({ src: o.x, display: true, n: ici }); return; }
      for (const k in o) if (k !== "n" && k !== "url" && k !== "id" && k !== "rubrique") visite(o[k], ici);
    }
  };
  visite(obj, 0);
  return out;
}

// Les numéros de ligne ne servent qu'aux messages d'erreur : on les retire avant l'envoi
function sansLignes(o) {
  if (Array.isArray(o)) return o.map(sansLignes);
  if (o && typeof o === "object") { const r = {}; for (const k in o) if (k !== "n") r[k] = sansLignes(o[k]); return r; }
  return o;
}

module.exports = { element, sommaire, formules, sansLignes, ErreurFormat, BOITES, ID, RESERVES };
