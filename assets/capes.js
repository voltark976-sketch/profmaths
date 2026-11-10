/*
  Espace « Préparation au CAPES » (pages #capes et #capes.<fiche>), réservé au compte prof.maths.
  Ce fichier ne contient AUCUN contenu : le sommaire, les fiches, les exercices et les QCM sont dans Firestore
  (collection « capes »), que les règles réservent à ce seul compte. Ils viennent de fichiers Markdown gardés
  hors du dépôt et envoyés par outils/capes/envoyer.js (voir outils/capes/LISEZMOI.md).
  Chargé seulement sur ces pages par assets/app.js (pageCapes), qui fournit les outils d'affichage (KaTeX…).
*/
(function () {
  "use strict";
  const BOITES = {
    definition: "Définition", theoreme: "Théorème", propriete: "Propriété", proposition: "Proposition", lemme: "Lemme",
    corollaire: "Corollaire", preuve: "Démonstration", methode: "Méthode", exemple: "Exemple", "contre-exemple": "Contre-exemple",
    piege: "Piège", remarque: "Remarque", "a-savoir": "À savoir refaire", jury: "Côté jury", indice: "Indice", corrige: "Corrigé",
  };
  // Encadrés repliés au départ : on cherche d'abord, on lit ensuite
  const REPLIES = ["preuve", "corrige"];
  const ETATS = ["À voir", "Vu", "Revu", "Maîtrisé"];
  let o = null; // outils d'app.js : { esc, inline, tex, lire, progression, sauverProgression, ici }
  let prog = null; // { etats: { fiche: 0..3 }, qcm: { "fiche-n": % } }
  let sommaire = null;
  const fiches = {};

  /* ---------- Texte : $…$ (KaTeX), **gras**, [lien](https://…), paragraphes, listes, encadrés ---------- */
  function txt(s) {
    const liens = [];
    const t = String(s || "").replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g, (_, a, u) => "\u0002" + (liens.push([a, u]) - 1) + "\u0002");
    return o.inline(t).replace(/\u0002(\d+)\u0002/g, (_, i) => `<a href="${o.esc(liens[+i][1])}" target="_blank" rel="noopener">${o.inline(liens[+i][0])}</a>`);
  }
  function rendre(blocs) {
    return (blocs || []).map((b) => {
      if (b.t === "p") return `<p>${txt(b.x)}</p>`;
      if (b.t === "m") return `<div class="cp-m">${o.tex(b.x, true)}</div>`;
      if (b.t === "h") return `<h3>${txt(b.x)}</h3>`;
      if (b.t === "ul" || b.t === "ol") return `<${b.t}${b.debut > 1 ? ` start="${+b.debut}"` : ""}>${b.li.map((x) => `<li>${txt(x)}</li>`).join("")}</${b.t}>`;
      if (b.t === "boite") {
        const nom = BOITES[b.k] || b.k, k = o.esc(b.k);
        const tete = `<span class="tag">${o.esc(nom)}</span>${b.titre ? `<span class="cp-bt">${txt(b.titre)}</span>` : ""}`;
        if (REPLIES.includes(b.k)) return `<details class="cp-boite cp-${k}"><summary>${tete}</summary>${rendre(b.corps)}</details>`;
        return `<div class="cp-boite cp-${k}"><p class="cp-tete">${tete}</p>${rendre(b.corps)}</div>`;
      }
      return "";
    }).join("");
  }

  // Formules courtes en ligne (« $k \geqslant 0$ ») : jamais coupées en fin de ligne sur un téléphone ; les longues gardent
  // les coupures de KaTeX après « = », « ⩽ »…, sinon elles déborderaient de l'écran
  function garderCourtes($app) {
    $app.querySelectorAll(".katex").forEach((k) => {
      if (k.closest(".katex-display")) return;
      const a = k.querySelector("annotation");
      if (a && a.textContent.length <= 30) k.classList.add("cp-court");
    });
  }

  /* ---------- Progression : où j'en suis (À voir, Vu, Revu, Maîtrisé) et meilleurs scores aux QCM ---------- */
  let minuterie = null;
  function sauver() {
    clearTimeout(minuterie);
    minuterie = setTimeout(() => o.sauverProgression(prog).catch(() => {
      const z = document.getElementById("cp-alerte");
      if (z) z.textContent = "La progression n'a pas pu être enregistrée (connexion ?). Elle le sera au prochain changement.";
    }), 800);
  }
  const etat = (id) => (prog.etats && prog.etats[id]) || 0;
  const pct = (els) => (els.length ? Math.round((els.reduce((s, e) => s + etat(e.id), 0) / (3 * els.length)) * 100) : 0);
  const barre = (p) => `<span class="barre" aria-hidden="true"><span style="width:${p}%"></span></span>`;

  /* ---------- Dates : compte à rebours ---------- */
  function jours(jour) {
    const [a, m, j] = jour.split("-").map(Number);
    const auj = new Date(); auj.setHours(0, 0, 0, 0);
    return Math.round((new Date(a, m - 1, j) - auj) / 86400000);
  }
  const heureFr = (h) => { const [a, b] = h.split(":"); return `${+a} h${b !== "00" ? " " + b : ""}`; };
  const dateFr = (jour) => new Date(jour + "T12:00:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  /* ---------- Page d'accueil de l'espace : calendrier, rubriques et fiches ---------- */
  function accueil($app) {
    const s = sommaire;
    const toutes = s.rubriques.flatMap((r) => r.elements);
    const aVenir = (s.dates || []).filter((d) => jours(d.jour) >= 0).sort((a, b) => a.jour.localeCompare(b.jour));
    $app.innerHTML = `<section class="page-capes">
      <p class="eyebrow">Espace réservé au compte prof.maths</p><h1>${txt(s.titre)}</h1>
      ${s.concours ? `<p class="lead">${txt(s.concours)}</p>` : ""}
      ${rendre(s.intro)}
      ${aVenir.length ? `<ul class="cp-dates">${aVenir.slice(0, 4).map((d) => { const n = jours(d.jour); return `<li><b>${n === 0 ? "Aujourd'hui" : `J-${n}`}</b><span><strong>${txt(d.quoi)}</strong><span class="meta">${o.esc(dateFr(d.jour))}${d.heure ? " · " + o.esc(heureFr(d.heure)) : ""}</span></span></li>`; }).join("")}</ul>` : ""}
      ${toutes.length ? `<p class="cp-global"><strong>Ma progression : ${pct(toutes)} %</strong>${barre(pct(toutes))}<span class="meta">${toutes.filter((e) => etat(e.id) === 3).length} fiche(s) maîtrisée(s) sur ${toutes.length}</span></p>` : ""}
      <p id="cp-alerte" class="meta" role="status"></p>
      ${s.rubriques.map((r) => `<section class="cp-rub"><h2>${txt(r.titre)}</h2>${rendre(r.corps)}
        ${r.elements.length ? `<div class="chapitres">${r.elements.map((e) => {
          const nb = [e.nb.fiche ? "fiche" : "", e.nb.exercices ? `${e.nb.exercices} exercice${e.nb.exercices > 1 ? "s" : ""}` : "", e.nb.qcm ? `QCM de ${e.nb.qcm} questions` : "", e.nb.cartes ? `${e.nb.cartes} cartes` : ""].filter(Boolean).join(" · ");
          return `<a class="chap" href="#capes.${o.esc(e.id)}"><span class="chap-t"><strong>${txt(e.titre)}</strong>${e.resume ? `<span class="meta">${txt(e.resume)}</span>` : ""}${nb ? `<span class="meta">${o.esc(nb)}</span>` : ""}${barre(Math.round((etat(e.id) / 3) * 100))}</span><span class="cp-badge cp-e${etat(e.id)}">${ETATS[etat(e.id)]}</span></a>`;
        }).join("")}</div>` : `<p class="muted">Pas encore de fiche dans cette rubrique.</p>`}</section>`).join("")}
    </section>`;
    garderCourtes($app);
  }

  /* ---------- Page d'une fiche ---------- */
  function melange(n) { const t = [...Array(n).keys()]; for (let i = n - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [t[i], t[j]] = [t[j], t[i]]; } return t; }
  function section(s, k, id) {
    const h = `<h2 id="cp-s${k}">${txt(s.titre || { fiche: "Fiche de cours", texte: "", exercices: "Exercices", qcm: "QCM", cartes: "Cartes flash", liens: "Liens" }[s.type] || "")}</h2>`;
    if (s.type === "fiche" || s.type === "texte") return `<section class="cp-sec cp-${s.type}">${h}${rendre(s.corps)}</section>`;
    if (s.type === "liens") return `<section class="cp-sec">${h}<ul class="cp-liens">${s.liens.map((l) => `<li><a href="${o.esc(l.url)}" target="_blank" rel="noopener">${txt(l.titre)}</a>${l.note ? ` <span class="meta">${txt(l.note)}</span>` : ""}</li>`).join("")}</ul></section>`;
    if (s.type === "exercices") return `<section class="cp-sec">${h}${rendre(s.intro)}${s.items.map((e, j) => `<article class="cp-exo" data-n="${e.indices.length}">
        <h3>${txt(e.titre)}</h3>${rendre(e.enonce)}
        ${e.indices.length ? `<div class="aides">${e.indices.map((x, i) => `<div class="aide" hidden><span class="tag">Indice ${i + 1}</span>${rendre(x)}</div>`).join("")}</div>` : ""}
        <p class="cp-actions">${e.indices.length ? `<button type="button" class="btn-sec" data-indice>Indice 1 sur ${e.indices.length}</button>` : ""}</p>
        ${e.corrige.length ? `<details class="cp-corrige"><summary>Voir le corrigé</summary>${rendre(e.corrige)}</details>` : ""}
      </article>`).join("")}</section>`;
    if (s.type === "cartes") return `<section class="cp-sec">${h}${rendre(s.intro)}<p class="meta">Touche une carte pour la retourner.</p><div class="cp-cartes">${s.items.map((c) => `<details class="cp-carte"><summary>${txt(c.recto)}</summary>${rendre(c.verso)}</details>`).join("")}</div></section>`;
    if (s.type === "qcm") {
      const cle = `${id}-${k}`, rec = prog.qcm && prog.qcm[cle];
      return `<section class="cp-sec">${h}${rendre(s.intro)}${rec != null ? `<p class="meta">Meilleur score : ${rec} %</p>` : ""}
        <form class="cp-qcm" data-cle="${o.esc(cle)}" data-s="${k}">${s.items.map((q, j) => `<fieldset class="q" data-j="${j}"><legend><span class="n">${j + 1}</span>${txt(q.q)}</legend>${rendre(q.suite)}
          <div class="choix">${melange(q.choix.length).map((i) => `<label class="opt${q.choix[i].ok ? " opt-bonne" : ""}"><input type="radio" name="q${k}-${j}" value="${i}"><span>${txt(q.choix[i].x)}</span></label>`).join("")}</div>
          ${q.expl.length ? `<div class="expl" hidden>${rendre(q.expl)}</div>` : ""}</fieldset>`).join("")}
          <p class="cp-actions"><button class="btn" type="submit">Corriger</button> <button class="btn-sec" type="button" data-refaire hidden>Recommencer</button></p>
          <p class="retour-rep" role="status"></p></form></section>`;
    }
    return "";
  }
  function pageFiche($app, f) {
    const r = sommaire && sommaire.rubriques.find((x) => x.id === f.rubrique);
    const e = etat(f.id);
    $app.innerHTML = `<a class="retour" href="#capes">← Préparation au CAPES</a>
      <header class="chap-head"><p class="eyebrow">${r ? txt(r.titre) : ""}</p><h1>${txt(f.titre)}</h1></header>
      <div class="cp-etat" role="group" aria-label="Où j'en suis">${ETATS.map((t, i) => `<button type="button" data-etat="${i}" aria-pressed="${i === e}">${t}</button>`).join("")}</div>
      <p id="cp-alerte" class="meta" role="status"></p>
      ${f.sections.length > 2 ? `<nav class="cp-plan" aria-label="Sur cette fiche">${f.sections.map((s, k) => (s.titre || s.type !== "texte" ? `<button type="button" class="filtre" data-aller="${k}">${txt(s.titre || { fiche: "Fiche", exercices: "Exercices", qcm: "QCM", cartes: "Cartes", liens: "Liens" }[s.type])}</button>` : "")).join("")}</nav>` : ""}
      <div class="page-capes cp-fiche">${rendre(f.intro)}${f.sections.map((s, k) => section(s, k, f.id)).join("")}</div>
      ${f.source ? `<p class="meta">Source : ${txt(f.source)}</p>` : ""}`;
    garderCourtes($app);
    $app.querySelectorAll("[data-etat]").forEach((b) => b.addEventListener("click", () => {
      prog.etats = Object.assign({}, prog.etats, { [f.id]: +b.dataset.etat });
      $app.querySelectorAll("[data-etat]").forEach((x) => x.setAttribute("aria-pressed", x === b));
      sauver();
    }));
    $app.querySelectorAll("[data-aller]").forEach((b) => b.addEventListener("click", () => { const c = document.getElementById("cp-s" + b.dataset.aller); if (c) c.scrollIntoView({ behavior: "smooth" }); }));
    $app.querySelectorAll(".cp-exo").forEach((ex) => {
      const b = ex.querySelector("[data-indice]");
      if (!b) return;
      b.addEventListener("click", () => {
        const caches = ex.querySelectorAll(".aide[hidden]");
        if (caches[0]) caches[0].hidden = false;
        const reste = caches.length - 1, n = +ex.dataset.n;
        if (reste > 0) b.textContent = `Indice ${n - reste + 1} sur ${n}`; else b.remove();
      });
    });
    $app.querySelectorAll(".cp-qcm").forEach((form) => {
      const s = f.sections[+form.dataset.s];
      form.addEventListener("submit", (ev) => {
        ev.preventDefault();
        let bons = 0;
        form.querySelectorAll(".q").forEach((fs) => {
          const q = s.items[+fs.dataset.j], c = fs.querySelector("input:checked");
          const ok = !!c && q.choix[+c.value].ok;
          if (ok) bons++;
          fs.classList.add(ok ? "q-bon" : "q-faux");
          fs.querySelectorAll("input").forEach((x) => { x.disabled = true; });
          const ex = fs.querySelector(".expl"); if (ex) ex.hidden = false;
        });
        const p = Math.round((bons / s.items.length) * 100), cle = form.dataset.cle;
        const rec = prog.qcm && prog.qcm[cle];
        form.querySelector(".retour-rep").className = "retour-rep " + (p >= 80 ? "bon" : "info");
        form.querySelector(".retour-rep").innerHTML = `<strong>${bons} / ${s.items.length} (${p} %)</strong>${rec != null && p > rec ? " · nouveau record !" : ""}`;
        form.querySelector("[type=submit]").hidden = true;
        form.querySelector("[data-refaire]").hidden = false;
        if (rec == null || p > rec) { prog.qcm = Object.assign({}, prog.qcm, { [cle]: p }); sauver(); }
      });
      form.querySelector("[data-refaire]").addEventListener("click", () => { pageFiche($app, f); const t = document.getElementById("cp-s" + form.dataset.s); if (t) t.scrollIntoView(); });
    });
  }

  /* ---------- Entrée : app.js appelle PM_CAPES($app, idFiche, outils) ---------- */
  function erreur($app, e) {
    const refus = e && (e.code === "permission-denied" || /permission/i.test(e.message || ""));
    $app.innerHTML = `<section class="page-capes"><p class="eyebrow">Préparation au CAPES</p><h1>${refus ? "Lecture refusée" : "Lecture impossible"}</h1>
      <p>${refus ? "Le serveur refuse la lecture : les règles Firestore de l'espace CAPES ne sont peut-être pas encore déployées." : "Vérifie la connexion internet, puis recharge la page."}</p></section>`;
  }
  async function monter($app, id, outils) {
    o = outils;
    try {
      if (!prog) prog = Object.assign({ etats: {}, qcm: {} }, (await o.progression()) || {});
      if (!sommaire) sommaire = await o.lire("sommaire");
      if (!o.ici()) return;
      if (!sommaire) {
        $app.innerHTML = `<section class="page-capes"><p class="eyebrow">Espace réservé au compte prof.maths</p><h1>Préparation au CAPES</h1>
          <p>Aucune fiche n'a encore été envoyée. Sur l'ordinateur, lance <code>node outils/capes/envoyer.js</code> (voir outils/capes/LISEZMOI.md).</p></section>`;
        return;
      }
      if (!id) { document.title = "Préparation au CAPES · ProfMaths"; return accueil($app); }
      if (!fiches[id]) {
        $app.innerHTML = `<a class="retour" href="#capes">← Préparation au CAPES</a><p class="patiente" role="status">Chargement de la fiche…</p>`;
        fiches[id] = await o.lire(id);
        if (!o.ici()) return;
      }
      if (!fiches[id]) { $app.innerHTML = `<a class="retour" href="#capes">← Préparation au CAPES</a><h1>Fiche introuvable</h1><p>Elle a peut-être été renommée ou supprimée.</p>`; delete fiches[id]; return; }
      document.title = fiches[id].titre + " · CAPES · ProfMaths";
      pageFiche($app, fiches[id]);
    } catch (e) {
      if (o.ici()) erreur($app, e);
    }
  }
  window.PM_CAPES = monter;
})();
