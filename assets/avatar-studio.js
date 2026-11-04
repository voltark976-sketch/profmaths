/*
  Éditeur d'avatar (« studio ») : grand aperçu animé, rubriques Visage · Cheveux · Tenue · Accessoires · Décor,
  essai des éléments pas encore débloqués, tirage au hasard, annulation et trois tenues enregistrées.
  Chargé seulement sur la page « Mon avatar ».
  PM_STUDIO(racine, { niveau, avatar, tenues, vuJusqua, enregistrer(avatar, tenues) }) → { niveau(n) }
*/
(function () {
  "use strict";
  const AV = window.PM_AVATAR, A = window.NIVEAUX.avatar;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
  const ic = (d) => `<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const ICONES = {
    visage: ic(`<circle cx="12" cy="12" r="8.5"/><path d="M8.6 14.2q3.4 3 6.8 0"/><circle cx="9.3" cy="10" r=".6" fill="currentColor"/><circle cx="14.7" cy="10" r=".6" fill="currentColor"/>`),
    cheveux: ic(`<path d="M5 15c-1-7 3-11 7-11s8 4 7 11"/><path d="M5 15c2-4 5-6 9-6 2 0 3.6 1 5 3"/><path d="M7.5 20c1.4-1 3-1.6 4.5-1.6S15.1 19 16.5 20"/>`),
    tenue: ic(`<path d="M8.5 4 4 6.5 5.8 11 8 10v10h8V10l2.2 1L20 6.5 15.5 4c-.6 1.6-2 2.6-3.5 2.6S9.1 5.6 8.5 4Z"/>`),
    accessoires: ic(`<circle cx="7" cy="13" r="3.4"/><circle cx="17" cy="13" r="3.4"/><path d="M10.4 12.6q1.6-1.2 3.2 0M3.6 12 2 10.4M20.4 12l1.6-1.6"/>`),
    decor: ic(`<path d="M12 3.5 13.9 9l5.6.2-4.4 3.5 1.6 5.4L12 15l-4.7 3.1 1.6-5.4-4.4-3.5L10.1 9Z"/>`),
    hasard: ic(`<rect x="4" y="4" width="16" height="16" rx="3.5"/><circle cx="9" cy="9" r="1" fill="currentColor"/><circle cx="15" cy="15" r="1" fill="currentColor"/><circle cx="15" cy="9" r="1" fill="currentColor"/><circle cx="9" cy="15" r="1" fill="currentColor"/>`),
    annuler: ic(`<path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>`),
    tenues: ic(`<path d="M12 7.5V6a2 2 0 1 1 2 2"/><path d="m12 7.5-8.6 6.2A1.4 1.4 0 0 0 4.2 16h15.6a1.4 1.4 0 0 0 .8-2.3Z"/>`),
    cadenas: `<svg viewBox="0 0 24 24" width="12" height="12" aria-hidden="true" fill="currentColor"><path d="M7 10V8a5 5 0 0 1 10 0v2h.5A1.5 1.5 0 0 1 19 11.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-8A1.5 1.5 0 0 1 6.5 10Zm2 0h6V8a3 3 0 0 0-6 0Z"/></svg>`
  };
  // Catégories où le tirage au hasard laisse souvent « aucun » (premier élément de la liste)
  const SOUVENT_RIEN = ["details", "barbe", "meches", "lunettes", "boucles", "accessoire", "compagnon", "effet", "motif"];
  const GARDER = ["peau", "forme"]; // le hasard ne touche pas à ce qui décrit la personne
  const rangDe = (n) => AV.rang(n);

  function monter(racine, o) {
    let niv = o.niveau;
    let brut = AV.migrer(o.avatar || {}); // choix de l'élève, gardés même si le niveau ne les permet pas encore
    let av = AV.normaliser(brut, niv);
    let tenues = Array.isArray(o.tenues) ? o.tenues.slice(0, 3) : [];
    let vu = Number.isFinite(o.vuJusqua) ? o.vuJusqua : niv; // éléments débloqués après ce niveau : « Nouveau »
    let section = "visage", cat = "forme", essai = null;
    const pile = [];

    racine.innerHTML = `<div class="studio">
      <div class="st-scene">
        <div class="st-av"></div>
        <div class="st-actions">
          <button type="button" class="st-btn" data-act="hasard">${ICONES.hasard}<span>Au hasard</span></button>
          <button type="button" class="st-btn" data-act="annuler" disabled>${ICONES.annuler}<span>Annuler</span></button>
          <button type="button" class="st-btn" data-act="tenues" aria-expanded="false">${ICONES.tenues}<span>Mes tenues</span></button>
        </div>
        <p class="st-essai" role="status" hidden></p>
      </div>
      <div class="st-tenues" hidden></div>
      <div class="st-coll"></div>
      <div class="st-sections" role="tablist" aria-label="Rubriques">${AV.SECTIONS.map((s) => `<button type="button" role="tab" data-sec="${s.id}">${ICONES[s.id]}<span>${esc(s.nom)}</span></button>`).join("")}</div>
      <div class="st-cats" role="tablist" aria-label="Parties"></div>
      <p class="st-note" hidden></p>
      <div class="st-grille"></div>
    </div>`;
    const $ = (s) => racine.querySelector(s);
    const $av = $(".st-av"), $essai = $(".st-essai"), $grille = $(".st-grille"), $cats = $(".st-cats"), $note = $(".st-note"), $tenues = $(".st-tenues"), $coll = $(".st-coll");
    const $annuler = $('[data-act="annuler"]'), $btTenues = $('[data-act="tenues"]');

    const nouveau = (e) => e.niveau && e.niveau > vu && e.niveau <= niv;
    const nouveautes = (c) => (A[c] || []).some(nouveau);
    function enregistrer() { if (o.enregistrer) o.enregistrer(Object.assign({}, av), tenues.slice()); }
    function changer(nv) {
      pile.push(av); if (pile.length > 30) pile.shift();
      brut = av = nv; essai = null; enregistrer(); tout();
    }

    function scene() {
      const montre = essai ? Object.assign({}, av, { [essai.cat]: essai.id }) : av;
      $av.innerHTML = AV.dessin(montre, 136, essai ? "Essai de ton avatar" : "Ton avatar", { anime: true });
      if (essai) {
        const e = AV.element(essai.cat, essai.id), r = AV.rarete(e);
        $essai.innerHTML = `<span class="st-rar" data-rarete="${r.id}">${esc(r.nom)}</span> Essai : <strong>${esc(e.nom)}</strong>, au niveau ${e.niveau}. <button type="button" class="st-lien" data-act="retirer">Retirer</button>`;
        $essai.title = `Se débloque au niveau ${e.niveau} (rang ${rangDe(e.niveau)})`;
        $essai.hidden = false;
      } else $essai.hidden = true;
      $annuler.disabled = !pile.length;
    }
    function compteur() {
      const c = AV.collection(niv);
      $coll.innerHTML = `<span>Collection</span><span class="barre-xp" aria-hidden="true"><span style="width:${Math.round((c.ok / c.tout) * 100)}%"></span></span><b>${c.ok} / ${c.tout}</b>`;
      $coll.setAttribute("aria-label", `Collection : ${c.ok} éléments débloqués sur ${c.tout}`);
    }
    function onglets() {
      racine.querySelectorAll(".st-sections [data-sec]").forEach((b) => {
        b.setAttribute("aria-selected", b.dataset.sec === section);
        b.classList.toggle("st-neuf", AV.CATEGORIES.some((c) => c.section === b.dataset.sec && nouveautes(c.id)));
      });
      const cs = AV.CATEGORIES.filter((c) => c.section === section);
      $cats.innerHTML = cs.map((c) => `<button type="button" role="tab" data-cat="${c.id}" aria-selected="${c.id === cat}"${nouveautes(c.id) ? ` class="st-neuf"` : ""}>${esc(c.court)}</button>`).join("");
    }
    function pastille(c, e) {
      if (c.id === "meches") {
        const base = AV.element("couleurCheveux", av.couleurCheveux);
        const fondBase = base.degrade ? `linear-gradient(${base.degrade.join(",")})` : base.couleur;
        return e.couleur ? `background:linear-gradient(170deg, ${base.couleur} 35%, ${e.couleur} 85%)` : `background:${fondBase}`;
      }
      return e.degrade ? `background:linear-gradient(135deg, ${e.degrade.join(",")})` : `background:${e.couleur}`;
    }
    function grille() {
      const c = AV.CATEGORIES.find((x) => x.id === cat);
      const h = AV.element("haut", av.haut);
      const note = cat === "motif" && ["salouva", "kandzou"].concat(A.haut.filter((x) => x.fixe).map((x) => x.id)).includes(av.haut)
        ? `Le haut « ${h.nom} » ne montre pas de motif : choisis un t-shirt, un sweat, un polo…`
        : cat === "couleurHaut" && h.fixe ? `Le haut « ${h.nom} » garde ses couleurs.` : cat === "boucles" && ["foulard", "kishali"].includes(av.cheveux) ? "Les boucles d'oreilles ne se voient pas avec un foulard." : "";
      $note.textContent = note; $note.hidden = !note;
      $grille.className = "st-grille" + (c.couleur ? " st-grille-coul" : "");
      $grille.setAttribute("aria-label", c.nom);
      $grille.innerHTML = A[cat].map((e) => {
        const ok = AV.debloque(e, niv), choisi = av[cat] === e.id, r = AV.rarete(e), enEssai = essai && essai.cat === cat && essai.id === e.id;
        const verrou = ok ? "" : `<span class="st-niv">${ICONES.cadenas}${e.niveau}</span>`;
        const neuf = nouveau(e) ? `<span class="st-badge">Nouveau</span>` : "";
        const titre = ok ? e.nom : `${e.nom} : à essayer, débloqué au niveau ${e.niveau}`;
        if (c.couleur) return `<button type="button" class="st-opt st-coul${ok ? "" : " verrou"}${enEssai ? " essai" : ""}" data-id="${e.id}" data-rarete="${r.id}" aria-pressed="${choisi}" aria-label="${esc(titre)}" title="${esc(titre)}"><span class="st-pas" style="${pastille(c, e)}">${e.couleur || c.id !== "meches" ? "" : `<i></i>`}</span>${verrou}${neuf}</button>`;
        const essaiAv = Object.assign({}, av, { [cat]: e.id });
        if (c.section !== "decor" && cat !== "compagnon") essaiAv.compagnon = "aucun"; // le compagnon cacherait la vignette
        return `<button type="button" class="st-opt${ok ? "" : " verrou"}${enEssai ? " essai" : ""}" data-id="${e.id}" data-rarete="${r.id}" aria-pressed="${choisi}" aria-label="${esc(titre)}">${AV.dessin(essaiAv, 64, null, { zoom: c.zoom })}<span class="st-nom">${esc(e.nom)}</span>${verrou}${neuf}</button>`;
      }).join("");
    }
    function listeTenues() {
      $tenues.innerHTML = `<p class="st-t-titre">Enregistre jusqu'à 3 tenues et change de style en un geste.</p><div class="st-t-liste">${[0, 1, 2].map((k) => {
        const t = tenues[k];
        return t ? `<div class="st-t"><button type="button" class="st-t-porter" data-porter="${k}" aria-label="Porter la tenue ${k + 1}">${AV.dessin(AV.normaliser(t, niv), 58)}</button><button type="button" class="st-lien" data-garder="${k}">Remplacer</button></div>`
          : `<div class="st-t"><button type="button" class="st-t-vide" data-garder="${k}" aria-label="Enregistrer ma tenue dans l'emplacement ${k + 1}">+</button><span class="st-t-l">Vide</span></div>`;
      }).join("")}</div>`;
    }
    function tout() { scene(); compteur(); onglets(); grille(); if (!$tenues.hidden) listeTenues(); }

    racine.addEventListener("click", (ev) => {
      const b = ev.target.closest("button");
      if (!b || !racine.contains(b)) return;
      if (b.dataset.sec) {
        section = b.dataset.sec; cat = AV.CATEGORIES.find((c) => c.section === section).id;
        onglets(); grille(); return;
      }
      if (b.dataset.cat) { cat = b.dataset.cat; onglets(); grille(); return; }
      if (b.classList.contains("st-opt")) {
        const e = AV.element(cat, b.dataset.id);
        if (!AV.debloque(e, niv)) { essai = essai && essai.cat === cat && essai.id === e.id ? null : { cat, id: e.id }; scene(); grille(); }
        else if (av[cat] !== e.id || essai) { if (av[cat] === e.id) { essai = null; scene(); grille(); } else changer(Object.assign({}, av, { [cat]: e.id })); }
        const nb = $grille.querySelector(`[data-id="${b.dataset.id}"]`); if (nb) nb.focus();
        return;
      }
      const act = b.dataset.act;
      if (act === "retirer") { essai = null; scene(); grille(); }
      else if (act === "annuler" && pile.length) { brut = av = pile.pop(); essai = null; enregistrer(); tout(); }
      else if (act === "hasard") {
        const nv = Object.assign({}, av);
        AV.CATEGORIES.forEach((c) => {
          if (GARDER.includes(c.id)) return;
          const ok = A[c.id].filter((e) => AV.debloque(e, niv));
          nv[c.id] = SOUVENT_RIEN.includes(c.id) && Math.random() < 0.55 ? A[c.id][0].id : ok[Math.floor(Math.random() * ok.length)].id;
        });
        changer(nv);
      }
      else if (act === "tenues") { $tenues.hidden = !$tenues.hidden; b.setAttribute("aria-expanded", !$tenues.hidden); if (!$tenues.hidden) listeTenues(); }
      else if (b.dataset.garder !== undefined) { tenues[+b.dataset.garder] = Object.assign({}, av); enregistrer(); listeTenues(); }
      else if (b.dataset.porter !== undefined) { const t = tenues[+b.dataset.porter]; if (t) changer(AV.normaliser(t, niv)); }
    });
    tout();
    return {
      // Changement de niveau (aperçu) : les éléments débloqués entre-temps passent en « Nouveau »
      niveau(n) { vu = Math.min(vu, niv); if (n < vu) vu = n; niv = n; av = AV.normaliser(brut, niv); essai = null; tout(); },
      avatar: () => Object.assign({}, av)
    };
  }
  window.PM_STUDIO = monter;
})();
