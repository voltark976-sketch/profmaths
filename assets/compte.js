/*
  Comptes élèves : connexion et sauvegarde de la progression.
  - Mode Firebase si data/config-comptes.js contient une configuration.
  - Sinon mode démonstration : comptes gardés sur l'appareil seulement.
  Les comptes sont créés par le professeur (outils/comptes/LISEZMOI.md) : identifiant et mot de passe,
  sans adresse e-mail. Le prénom, la classe et le groupe sont inscrits dans le compte lui-même
  (« custom claims ») : les règles Firestore refusent tout compte qui n'a pas été créé ainsi.
  Le compte du professeur (claim prof) lit la progression de tous les élèves (page #suivi).
*/
(function () {
  "use strict";
  const CFG = window.CONFIG_COMPTES || { firebase: null };
  const DOMAINE = "profmaths.example.com"; // identifiant -> adresse technique, aucun e-mail n'est envoyé
  const FB_VERSION = "10.14.1";
  let ecouteur = () => {};
  let eleve = null; // { uid, identifiant, prenom, nom, classe, groupe, prof }
  let fb = null; // { auth, db }
  let minuterie = null;
  let dernierClassement = ""; // évite de renvoyer la même ligne du classement
  // Points du classement : somme des records de l'élève sur tous les Défis chrono
  const pointsJeux = (jeux) => Object.values(jeux || {}).reduce((s, v) => s + (+v || 0), 0);

  const normId = (s) => String(s || "").trim().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s+/g, ".");
  function verifId(id) {
    if (!/^[a-z0-9._-]{3,30}$/.test(id)) return "L'identifiant doit faire 3 à 30 caractères : lettres sans accent, chiffres, point ou tiret.";
    return "";
  }

  function fusion(a, b) {
    a = a || {}; b = b || {};
    const out = { xp: Math.max(a.xp || 0, b.xp || 0), exo: Object.assign({}, a.exo), qcm: Object.assign({}, a.qcm), jeux: Object.assign({}, a.jeux), quand: Object.assign({}, a.quand) };
    for (const k in b.exo || {}) out.exo[k] = Math.max(out.exo[k] || 0, b.exo[k]);
    for (const k in b.qcm || {}) out.qcm[k] = Math.max(out.qcm[k] ?? 0, b.qcm[k]);
    for (const k in b.jeux || {}) out.jeux[k] = Math.max(out.jeux[k] || 0, b.jeux[k]);
    // Date du dernier essai de chaque série et de chaque QCM (pour le suivi des devoirs)
    for (const k in b.quand || {}) out.quand[k] = Math.max(out.quand[k] || 0, b.quand[k]);
    // Avatar : on garde le plus récemment modifié
    const av = [a.avatar, b.avatar].filter((x) => x && typeof x === "object").sort((x, y) => (y.t || 0) - (x.t || 0))[0];
    if (av) out.avatar = Object.assign({}, av);
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
      const idTech = (u.email || "").split("@")[0];
      let c;
      try { c = (await u.getIdTokenResult()).claims; }
      catch (e) { c = null; }
      if (c && c.prof) { eleve = { uid: u.uid, identifiant: idTech, prenom: c.prenom || "Professeur", classe: "", prof: true, groupes: Array.isArray(c.groupes) ? c.groupes : null }; ecouteur(eleve, null); return; }
      if (c && !c.eleve) {
        // Compte qui n'a pas été créé par le professeur : refusé
        erreurCompte = "Ce compte n'existe plus. Demande tes identifiants à ton professeur.";
        fb.auth.signOut(); return;
      }
      const profil = c ? { identifiant: idTech, prenom: c.prenom || "", nom: c.nom || "", classe: c.classe || "", groupe: c.groupe || "" } : { identifiant: idTech, prenom: "", classe: "" };
      try {
        const ref = fb.db.collection("eleves").doc(u.uid);
        const snap = await ref.get();
        const d = snap.exists ? snap.data() : {};
        // Première connexion : la fiche de l'élève est créée à partir de son compte
        if (!snap.exists) await ref.set(Object.assign({}, profil, { xp: 0, exo: {}, qcm: {}, creeLe: firebase.firestore.FieldValue.serverTimestamp() }));
        eleve = Object.assign({ uid: u.uid }, profil);
        ecouteur(eleve, { xp: d.xp || 0, exo: d.exo || {}, qcm: d.qcm || {}, jeux: d.jeux || {}, avatar: d.avatar || null, quand: d.quand || {} });
      } catch (e) {
        // Lecture impossible (réseau) : on n'écrase pas le compte avec la copie de l'appareil, on relira plus tard
        eleve = Object.assign({ uid: u.uid, lectureEchouee: true }, profil);
        ecouteur(eleve, null);
      }
    });
  }
  let erreurCompte = "";
  // Nouvel essai de lecture du compte après un échec ; la fusion se fait dans l'écouteur, qui enregistre ensuite
  let relectureEnCours = false;
  function relire() {
    if (relectureEnCours || !eleve) return;
    relectureEnCours = true;
    const e = eleve;
    fb.db.collection("eleves").doc(e.uid).get().then((snap) => {
      if (eleve !== e) return;
      const d = snap.exists ? snap.data() : {};
      e.lectureEchouee = false;
      ecouteur(e, { xp: d.xp || 0, exo: d.exo || {}, qcm: d.qcm || {}, jeux: d.jeux || {}, avatar: d.avatar || null, quand: d.quand || {} });
    }).catch(() => {}).then(() => { relectureEnCours = false; });
  }
  function messageFirebase(e) {
    const c = (e && e.code) || "";
    if (c.includes("email-already-in-use")) return "Cet identifiant est déjà pris. Choisis-en un autre.";
    if (c.includes("weak-password")) return "Le mot de passe doit faire au moins 6 caractères.";
    if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found") || c.includes("invalid-email")) return "Identifiant ou mot de passe incorrect.";
    if (c.includes("too-many-requests")) return "Trop d'essais. Attends quelques minutes puis réessaie.";
    if (c.includes("user-disabled")) return "Ce compte est désactivé. Parles-en à ton professeur.";
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
    erreurCompte: () => { const m = erreurCompte; erreurCompte = ""; return m; },
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

    // Mode démonstration seulement
    async creer({ identifiant, prenom, classe, mdp }) {
      const id = normId(identifiant);
      const err = verifId(id);
      if (err) throw new Error(err);
      if (!prenom.trim()) throw new Error("Indique ton prénom.");
      if (String(mdp).length < 6) throw new Error("Le mot de passe doit faire au moins 6 caractères.");
      // Avec Firebase, seuls les comptes créés par le professeur existent
      if (CFG.firebase) throw new Error("Les comptes sont créés par ton professeur.");
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

    // Top 10 du Défi chrono (classe = "" pour le classement général). Renvoie null si l'élève n'est pas connecté.
    async classement(classe) {
      let liste;
      if (fb) {
        if (!eleve) return null;
        const col = fb.db.collection("classement");
        // Par classe : pas de tri côté serveur (il faudrait créer un index), on trie ici
        const snap = await (classe ? col.where("classe", "==", classe) : col.orderBy("points", "desc").limit(10)).get();
        liste = snap.docs.map((d) => Object.assign({}, d.data(), { moi: d.id === eleve.uid }));
      } else {
        if (CFG.firebase) throw new Error("Firebase indisponible");
        liste = Object.entries(lireJSON(DEMO, {})).map(([id, c]) => ({ prenom: c.prenom, classe: c.classe, points: pointsJeux(c.prog && c.prog.jeux), moi: !!eleve && id === eleve.uid }))
          .filter((l) => l.points > 0 && (!classe || l.classe === classe));
      }
      return liste.sort((a, b) => b.points - a.points).slice(0, 10);
    },
    pointsJeux,

    // Professeur : fiches de tous les élèves (progression et dates des derniers essais)
    async suivi() {
      if (!fb || !eleve || !eleve.prof) return null;
      const col = fb.db.collection("eleves"), g = eleve.groupes;
      // Professeur rattaché à certaines classes : on ne demande que celles-là (les règles refusent le reste)
      const snaps = !g ? [await col.get()] : await Promise.all(Array.from({ length: Math.ceil(g.length / 30) }, (_, i) => col.where("groupe", "in", g.slice(i * 30, i * 30 + 30)).get()));
      return snaps.flatMap((snap) => snap.docs.map((d) => Object.assign({ uid: d.id }, d.data())));
    },

    // Enregistre la progression (regroupe les envois rapprochés pour économiser le réseau)
    sauver(prog) {
      if (!eleve) return;
      clearTimeout(minuterie);
      if (eleve.prof) return; // le compte du professeur n'enregistre pas de progression
      const copie = { xp: prog.xp, exo: Object.assign({}, prog.exo), qcm: Object.assign({}, prog.qcm), jeux: Object.assign({}, prog.jeux), quand: Object.assign({}, prog.quand) };
      if (prog.avatar) copie.avatar = Object.assign({}, prog.avatar);
      minuterie = setTimeout(() => {
        if (fb && eleve.lectureEchouee) { relire(); return; }
        if (fb) {
          fb.db.collection("eleves").doc(eleve.uid)
            .set(Object.assign(copie, { majLe: firebase.firestore.FieldValue.serverTimestamp() }), { merge: true })
            .catch(() => {}); // hors ligne : la copie locale reste, elle repartira au prochain enregistrement
          // Classement : seulement le prénom, la classe et les points (lisible par les élèves connectés)
          const pts = pointsJeux(copie.jeux), sig = [eleve.uid, eleve.prenom, eleve.classe, pts].join("|");
          if (pts > 0 && eleve.prenom && sig !== dernierClassement) {
            fb.db.collection("classement").doc(eleve.uid)
              .set({ prenom: eleve.prenom, classe: eleve.classe || "", points: pts, majLe: firebase.firestore.FieldValue.serverTimestamp() })
              .then(() => { dernierClassement = sig; }).catch(() => {});
          }
        } else {
          const comptes = lireJSON(DEMO, {});
          if (comptes[eleve.uid]) { comptes[eleve.uid].prog = copie; ecrireJSON(DEMO, comptes); }
        }
      }, fb ? 1500 : 0);
    }
  };
})();
