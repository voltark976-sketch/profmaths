/*
  Comptes élèves : connexion et sauvegarde de la progression.
  - Mode Firebase si data/config-comptes.js contient une configuration.
  - Sinon mode démonstration : comptes gardés sur l'appareil seulement.
  Les élèves n'ont pas besoin d'adresse e-mail : ils choisissent un identifiant et un mot de passe.
*/
(function () {
  "use strict";
  const CFG = window.CONFIG_COMPTES || { firebase: null };
  const DOMAINE = "profmaths.example.com"; // identifiant -> adresse technique, aucun e-mail n'est envoyé
  const FB_VERSION = "10.14.1";
  let ecouteur = () => {};
  let eleve = null; // { uid, identifiant, prenom, classe }
  let fb = null; // { auth, db }
  let minuterie = null;

  const normId = (s) => String(s || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, ".");
  function verifId(id) {
    if (!/^[a-z0-9._-]{3,30}$/.test(id)) return "L'identifiant doit faire 3 à 30 caractères : lettres sans accent, chiffres, point ou tiret.";
    return "";
  }

  function fusion(a, b) {
    a = a || {}; b = b || {};
    const out = { xp: Math.max(a.xp || 0, b.xp || 0), exo: Object.assign({}, a.exo), qcm: Object.assign({}, a.qcm) };
    for (const k in b.exo || {}) out.exo[k] = Math.max(out.exo[k] || 0, b.exo[k]);
    for (const k in b.qcm || {}) out.qcm[k] = Math.max(out.qcm[k] ?? 0, b.qcm[k]);
    return out;
  }

  /* ---------- Mode Firebase ---------- */
  function chargerScript(src) {
    return new Promise((ok, ko) => {
      const s = document.createElement("script");
      s.src = src; s.onload = ok; s.onerror = () => ko(new Error("script"));
      document.head.appendChild(s);
    });
  }
  async function initFirebase() {
    const base = `https://cdn.jsdelivr.net/npm/firebase@${FB_VERSION}/`;
    await chargerScript(base + "firebase-app-compat.js");
    await Promise.all([chargerScript(base + "firebase-auth-compat.js"), chargerScript(base + "firebase-firestore-compat.js")]);
    firebase.initializeApp(CFG.firebase);
    fb = { auth: firebase.auth(), db: firebase.firestore() };
    fb.auth.onAuthStateChanged(async (u) => {
      if (!u) { eleve = null; ecouteur(null, null); return; }
      try {
        const snap = await fb.db.collection("eleves").doc(u.uid).get();
        const d = snap.exists ? snap.data() : {};
        eleve = { uid: u.uid, identifiant: d.identifiant || u.email.split("@")[0], prenom: d.prenom || "", classe: d.classe || "" };
        ecouteur(eleve, { xp: d.xp || 0, exo: d.exo || {}, qcm: d.qcm || {} });
      } catch (e) {
        eleve = { uid: u.uid, identifiant: u.email.split("@")[0], prenom: "", classe: "" };
        ecouteur(eleve, null);
      }
    });
  }
  function messageFirebase(e) {
    const c = (e && e.code) || "";
    if (c.includes("email-already-in-use")) return "Cet identifiant est déjà pris. Choisis-en un autre.";
    if (c.includes("weak-password")) return "Le mot de passe doit faire au moins 6 caractères.";
    if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found") || c.includes("invalid-email")) return "Identifiant ou mot de passe incorrect.";
    if (c.includes("too-many-requests")) return "Trop d'essais. Attends quelques minutes puis réessaie.";
    if (c.includes("network")) return "Pas de connexion internet. Réessaie quand le réseau revient.";
    return "La connexion a échoué. Réessaie dans un instant.";
  }

  /* ---------- Mode démonstration (sur l'appareil) ---------- */
  const DEMO = "profmaths:demo-comptes", SESSION = "profmaths:demo-session";
  const lireJSON = (k, def) => { try { return JSON.parse(localStorage.getItem(k)) || def; } catch (e) { return def; } };
  const ecrireJSON = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
  const empreinte = (s) => { let h = 5381; for (const c of s) h = ((h << 5) + h + c.charCodeAt(0)) | 0; return String(h); };

  /* ---------- Interface publique ---------- */
  window.PM_COMPTE = {
    demo: !CFG.firebase,
    classes: CFG.classes || [],
    eleve: () => eleve,
    fusion,

    // onChange(eleve, progressionDistante) est appelé à chaque connexion ou déconnexion
    init(onChange) {
      ecouteur = onChange;
      if (CFG.firebase) {
        initFirebase().catch(() => { console.warn("Firebase indisponible"); ecouteur(null, null); });
      } else {
        const id = lireJSON(SESSION, null);
        const comptes = lireJSON(DEMO, {});
        if (id && comptes[id]) {
          const c = comptes[id];
          eleve = { uid: id, identifiant: id, prenom: c.prenom, classe: c.classe };
          setTimeout(() => ecouteur(eleve, c.prog || null));
        }
      }
    },

    async creer({ identifiant, prenom, classe, mdp }) {
      const id = normId(identifiant);
      const err = verifId(id);
      if (err) throw new Error(err);
      if (!prenom.trim()) throw new Error("Indique ton prénom.");
      if (String(mdp).length < 6) throw new Error("Le mot de passe doit faire au moins 6 caractères.");
      if (fb) {
        try {
          const r = await fb.auth.createUserWithEmailAndPassword(`${id}@${DOMAINE}`, mdp);
          await fb.db.collection("eleves").doc(r.user.uid).set({
            identifiant: id, prenom: prenom.trim(), classe, xp: 0, exo: {}, qcm: {},
            creeLe: firebase.firestore.FieldValue.serverTimestamp()
          });
          eleve = { uid: r.user.uid, identifiant: id, prenom: prenom.trim(), classe };
          ecouteur(eleve, { xp: 0, exo: {}, qcm: {} });
        } catch (e) { throw new Error(e.code ? messageFirebase(e) : e.message); }
        return;
      }
      if (CFG.firebase) throw new Error("Le service de comptes ne répond pas. Vérifie ta connexion internet.");
      const comptes = lireJSON(DEMO, {});
      if (comptes[id]) throw new Error("Cet identifiant est déjà pris. Choisis-en un autre.");
      comptes[id] = { mdp: empreinte(mdp), prenom: prenom.trim(), classe, prog: null };
      ecrireJSON(DEMO, comptes); ecrireJSON(SESSION, id);
      eleve = { uid: id, identifiant: id, prenom: prenom.trim(), classe };
      ecouteur(eleve, null);
    },

    async connecter(identifiant, mdp) {
      const id = normId(identifiant);
      if (fb) {
        try { await fb.auth.signInWithEmailAndPassword(`${id}@${DOMAINE}`, mdp); }
        catch (e) { throw new Error(messageFirebase(e)); }
        return; // onAuthStateChanged prend le relais
      }
      if (CFG.firebase) throw new Error("Le service de comptes ne répond pas. Vérifie ta connexion internet.");
      const c = lireJSON(DEMO, {})[id];
      if (!c || c.mdp !== empreinte(mdp)) throw new Error("Identifiant ou mot de passe incorrect.");
      ecrireJSON(SESSION, id);
      eleve = { uid: id, identifiant: id, prenom: c.prenom, classe: c.classe };
      ecouteur(eleve, c.prog || null);
    },

    async deconnecter() {
      clearTimeout(minuterie);
      if (fb) { await fb.auth.signOut(); return; }
      try { localStorage.removeItem(SESSION); } catch (e) {}
      eleve = null; ecouteur(null, null);
    },

    // Enregistre la progression (regroupe les envois rapprochés pour économiser le réseau)
    sauver(prog) {
      if (!eleve) return;
      clearTimeout(minuterie);
      const copie = { xp: prog.xp, exo: Object.assign({}, prog.exo), qcm: Object.assign({}, prog.qcm) };
      minuterie = setTimeout(() => {
        if (fb) {
          fb.db.collection("eleves").doc(eleve.uid)
            .set(Object.assign(copie, { majLe: firebase.firestore.FieldValue.serverTimestamp() }), { merge: true })
            .catch(() => {}); // hors ligne : la copie locale reste, elle repartira au prochain enregistrement
        } else {
          const comptes = lireJSON(DEMO, {});
          if (comptes[eleve.uid]) { comptes[eleve.uid].prog = copie; ecrireJSON(DEMO, comptes); }
        }
      }, fb ? 1500 : 0);
    }
  };
})();
