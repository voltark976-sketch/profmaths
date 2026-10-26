/*
  Exercices du CP (programme du cycle 2, BO n° 41 du 31 octobre 2024, en vigueur depuis la rentrée 2025).
  Chargé à l'ouverture d'un chapitre du CP, après assets/exercices-ecole.js dont il reprend les outils.
  Nombres jusqu'à 100 ; écriture en lettres jusqu'à 50 ; pas de calculatrice.
  Préfixes : cp1- (les nombres jusqu'à 100).
*/
(function () {
  "use strict";
  const { GEN, FIGURES } = window.PM_EXO;
  const E = window.PM_EXO.ecole;
  const { rand, pick, melange, nb, nbT, enLettres, prenom, paquets, collection, bande, droite, elisions } = E;
  const X = "\\times";

  /* =====================================================================
     Chapitre 1 : les nombres jusqu'à 100 (cp1-)
     ===================================================================== */
  FIGURES["cp1-cours-paquets"] = () => paquets(0, 3, 4, { aria: "3 barres de dix cubes et 4 cubes" });
  FIGURES["cp1-cours-collection"] = () => collection(26, { groupes: 10, aria: "26 ronds : 2 paquets de dix entourés et 6 ronds" });
  FIGURES["cp1-cours-23"] = () => paquets(0, 2, 3, { aria: "23 : 2 dizaines et 3 unités" });
  FIGURES["cp1-cours-32"] = () => paquets(0, 3, 2, { aria: "32 : 3 dizaines et 2 unités" });
  FIGURES["cp1-cours-bande"] = () => bande(40, 10, { colorie: [45] });
  FIGURES["cp1-cours-bonds"] = () => droite({ a: 0, pas: 10, n: 10, lab: [0, 2, 4, 6, 8, 10], origine: true, fleches: [[2, 3, "+10"], [3, 4, "+10"], [4, 5, "+10"]], aria: "Droite graduée de 10 en 10, bonds de 10" });
  FIGURES["cp1-qcm-paquets"] = () => paquets(0, 5, 8, { aria: "5 barres de dix et 8 cubes" });
  FIGURES["cp1-qcm-paquets2"] = () => paquets(0, 4, 13, { aria: "4 barres de dix et 13 cubes" });
  FIGURES["cp1-qcm-collection"] = () => collection(34, { groupes: 10, aria: "34 ronds : 3 paquets de dix et 4 ronds" });
  FIGURES["cp1-qcm-bande"] = () => bande(62, 9, { caches: [66] });
  FIGURES["cp1-methode-paquets"] = () => paquets(0, 6, 7, { aria: "6 barres de dix et 7 cubes" });

  // Une collection dessinée : barres et cubes, ou ronds entourés par dix
  GEN["cp1-denombrer"] = function () {
    const t = rand(0, 3);
    if (t === 0) { // barres de dix et cubes
      const d = rand(1, 9), u = rand(0, 9), n = 10 * d + u;
      return { enonce: "Chaque barre contient $10$ cubes. Combien y a-t-il de cubes en tout ?", figure: paquets(0, d, u), mode: "nombre", prefixe: "Il y a", suffixe: "cubes", attendu: n,
        erreurs: [{ valeur: d + u, message: "Une barre, ce n'est pas un cube : chaque barre vaut **dix** cubes." }, ...(u && u !== d ? [{ valeur: 10 * u + d, message: "Tu as inversé : les barres donnent les dizaines, les cubes seuls donnent les unités." }] : [])],
        aides: ["Compte d'abord les barres de dix : $10$, $20$, $30$…", `Il y a $${d}$ barre${d > 1 ? "s" : ""}, donc $${d}$ dizaine${d > 1 ? "s" : ""} : $${10 * d}$ cubes.`, `Ajoute les $${u}$ cube${u > 1 ? "s" : ""} seul${u > 1 ? "s" : ""}.`],
        solution: `$${d}$ barre${d > 1 ? "s" : ""} de dix, c'est $${10 * d}$. Avec $${u}$ cube${u > 1 ? "s" : ""} en plus : $${10 * d} + ${u} = ${n}$ cubes.` };
    }
    if (t === 1) { // ronds entourés par paquets de dix
      const n = rand(12, 59), d = Math.floor(n / 10), u = n % 10;
      return { enonce: "Les ronds sont rangés par paquets de $10$. Combien y a-t-il de ronds en tout ?", figure: collection(n, { groupes: 10 }), mode: "nombre", prefixe: "Il y a", suffixe: "ronds", attendu: n,
        erreurs: [{ valeur: d + u, message: "Chaque paquet entouré contient **dix** ronds, pas un seul." }],
        aides: ["Compte les paquets de dix.", `Il y a $${d}$ paquet${d > 1 ? "s" : ""} de dix : $${10 * d}$ ronds.`, `Compte les ronds seuls et ajoute-les.`],
        solution: `$${d}$ paquet${d > 1 ? "s" : ""} de dix et $${u}$ rond${u > 1 ? "s" : ""} seul${u > 1 ? "s" : ""} : $${10 * d} + ${u} = ${n}$ ronds.` };
    }
    if (t === 2) { // combien de paquets de dix peut-on faire ?
      const n = rand(13, 99), d = Math.floor(n / 10), u = n % 10, c = E.chose(), P = prenom(), reste = rand(0, 1);
      return { enonce: `${P.nom} a $${n}$ ${c.p}${rand(0, 1) ? "" : " à " + pick(E.LIEUX)}. ${P.Il} fait des paquets de $10$ ${c.p}. ${reste ? `Combien de ${c.p} restent tout seuls ?` : "Combien de paquets complets peut-" + P.il + " faire ?"}`, mode: "nombre", prefixe: reste ? "Il en reste" : P.Il + " fait", suffixe: reste ? (u > 1 ? "seuls" : "") : "paquets", attendu: reste ? u : d,
        erreurs: reste ? [{ valeur: d, message: `$${d}$, c'est le nombre de paquets. On demande ce qui reste.` }] : [{ valeur: u, message: `$${u}$, c'est ce qui reste. On demande le nombre de paquets de dix.` }],
        aides: [`Dans $${n}$, le chiffre des dizaines dit combien de paquets de dix on peut faire.`, `$${n}$, c'est $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}.`, reste ? "Les unités, ce sont les objets qui restent seuls." : "Les dizaines, ce sont les paquets de dix."],
        solution: `$${n} = ${10 * d} + ${u}$ : ${P.il} fait $${d}$ paquet${d > 1 ? "s" : ""} de $10$ et il reste $${u}$ ${u > 1 ? c.p : c.s} seul${u > 1 ? "s" : ""}.` };
    }
    // barres et trop de cubes : il faut refaire une dizaine
    const d = rand(1, 7), u = rand(11, 19), n = 10 * d + u;
    return { enonce: "Attention, il y a beaucoup de cubes seuls ! Combien y a-t-il de cubes en tout ?", figure: paquets(0, d, u), mode: "nombre", prefixe: "Il y a", suffixe: "cubes", attendu: n,
      erreurs: [{ valeur: d + u, message: "Chaque barre vaut **dix** cubes." }, { valeur: 100 * d + u, message: `Ce n'est pas « ${d} » suivi de « ${u} » : avec $${u}$ cubes seuls, on peut refaire une barre de dix.` }],
      aides: [`Avec $10$ des $${u}$ cubes seuls, on peut faire une nouvelle barre.`, `Cela fait $${d + 1}$ barres et $${u - 10}$ cube${u - 10 > 1 ? "s" : ""} seul${u - 10 > 1 ? "s" : ""}.`, `$${d + 1}$ dizaines et $${u - 10}$ unité${u - 10 > 1 ? "s" : ""}.`],
      solution: `$${u}$ cubes seuls, c'est $1$ dizaine et $${u - 10}$ unité${u - 10 > 1 ? "s" : ""}. En tout : $${d + 1}$ dizaines et $${u - 10}$ unité${u - 10 > 1 ? "s" : ""}, donc $${n}$ cubes.` };
  };

  // Dizaines et unités : lire un chiffre, composer un nombre
  GEN["cp1-dizaines"] = function () {
    const t = rand(0, 4);
    if (t === 0) { // chiffre des dizaines ou des unités
      let n; do n = rand(11, 99); while (n % 11 === 0);
      const d = Math.floor(n / 10), u = n % 10, quoi = rand(0, 1);
      return { enonce: `Dans le nombre $${n}$, quel est le chiffre des **${quoi ? "unités" : "dizaines"}** ?`, mode: "nombre", prefixe: "Le chiffre est", attendu: quoi ? u : d,
        erreurs: [{ valeur: quoi ? d : u, message: `Ça, c'est le chiffre des ${quoi ? "dizaines" : "unités"}. ${quoi ? "Les unités sont à droite." : "Les dizaines sont à gauche."}` }, { valeur: n, message: "On demande un seul chiffre." }, ...(quoi ? [] : [{ valeur: 10 * d, message: `$${10 * d}$, c'est la valeur des dizaines. On demande seulement le chiffre.` }])],
        aides: ["Dans un nombre à deux chiffres, le premier chiffre (à gauche) est celui des dizaines.", "Le deuxième chiffre (à droite) est celui des unités.", `$${n}$ : $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}.`],
        solution: `$${n}$, c'est $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}. Le chiffre des ${quoi ? "unités" : "dizaines"} est $${quoi ? u : d}$.` };
    }
    if (t === 1) { // d dizaines et u unités, dans un ordre ou dans l'autre
      const d = rand(1, 9), u = rand(1, 9), n = 10 * d + u, inv = rand(0, 1);
      return { enonce: `Quel nombre fait ${inv ? `$${u}$ unité${u > 1 ? "s" : ""} et $${d}$ dizaine${d > 1 ? "s" : ""}` : `$${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}`} ?`, mode: "nombre", prefixe: "C'est", attendu: n,
        erreurs: [...(u !== d ? [{ valeur: 10 * u + d, message: "Attention à l'ordre : on écrit d'abord le chiffre des **dizaines**, puis celui des unités." }] : []), { valeur: d + u, message: "Une dizaine vaut $10$ unités." }],
        aides: ["Une dizaine, c'est $10$ unités.", `$${d}$ dizaine${d > 1 ? "s" : ""}, c'est $${10 * d}$.`, `$${10 * d} + ${u}$.`],
        solution: `$${d}$ dizaine${d > 1 ? "s" : ""} $= ${10 * d}$, et $${10 * d} + ${u} = ${n}$.` };
    }
    if (t === 2) { // dizaines entières
      const d = rand(2, 10), sens = rand(0, 1);
      return sens
        ? { enonce: `Combien y a-t-il de dizaines dans $${10 * d}$ ?`, mode: "nombre", prefixe: "Il y a", suffixe: "dizaines", attendu: d,
          erreurs: [{ valeur: 10 * d, message: "On demande le nombre de **dizaines** (de paquets de dix)." }],
          aides: ["Une dizaine, c'est $10$.", `Compte de $10$ en $10$ jusqu'à $${10 * d}$.`, "Compte combien de bonds de $10$ tu as faits."],
          solution: `En comptant de $10$ en $10$ : ${Array.from({ length: d }, (_, k) => `$${10 * (k + 1)}$`).join(", ")}. Cela fait $${d}$ bonds : il y a $${d}$ dizaines dans $${10 * d}$.` }
        : { enonce: `Combien font $${d}$ dizaines ?`, mode: "nombre", prefixe: "Cela fait", attendu: 10 * d,
          erreurs: [{ valeur: d, message: "Chaque dizaine vaut $10$." }, { valeur: d + 10, message: `Ce n'est pas $${d} + 10$ : c'est $${d}$ fois $10$.` }],
          aides: ["Une dizaine, c'est $10$.", "Compte de $10$ en $10$.", `${Array.from({ length: d }, (_, k) => `$${10 * (k + 1)}$`).join(", ")}.`],
          solution: `On compte $${d}$ fois de $10$ en $10$ : ${Array.from({ length: d }, (_, k) => `$${10 * (k + 1)}$`).join(", ")}. Donc $${d}$ dizaines, c'est $${10 * d}$.` };
    }
    if (t === 3) { // trop d'unités
      const d = rand(1, 7), u = rand(10, 19), n = 10 * d + u;
      return { enonce: `Quel nombre fait $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unités ?`, mode: "nombre", prefixe: "C'est", attendu: n,
        erreurs: [{ valeur: 100 * d + u, message: `On ne colle pas $${d}$ et $${u}$ : $${u}$ unités, c'est $1$ dizaine et $${u - 10}$ unités.` }, { valeur: d + u, message: "Une dizaine vaut $10$ unités." }],
        aides: [`$${u}$ unités, c'est $1$ dizaine et $${u - 10}$ unités.`, `En tout, cela fait $${d + 1}$ dizaines et $${u - 10}$ unités.`, `$${10 * d} + ${u}$.`],
        solution: `$${d}$ dizaine${d > 1 ? "s" : ""} $= ${10 * d}$ et $${10 * d} + ${u} = ${n}$. (On peut aussi dire : $${d + 1}$ dizaines et $${u - 10}$ unités.)` };
    }
    // choisir le nombre qui correspond (23 ou 32 ?)
    let d, u; do { d = rand(1, 9); u = rand(1, 9); } while (d === u);
    const n = 10 * d + u, c = melange(`$${n}$`, [`$${10 * u + d}$`, `$${d + u}$`, `$${d}0${u}$`]);
    return { enonce: `Quel nombre a $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le chiffre des dizaines s'écrit à gauche.", "Le chiffre des unités s'écrit à droite.", `On écrit $${d}$ puis $${u}$.`],
      solution: `$${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}, c'est $${10 * d} + ${u} = ${n}$. Attention : $${10 * u + d}$, c'est $${u}$ dizaines et $${d}$ unité${d > 1 ? "s" : ""}.` };
  };

  // Plusieurs écritures d'un même nombre (chiffres, lettres jusqu'à 50, décomposition, unités de numération)
  const lettresFausses = (n) => {
    const f = new Set();
    const d = Math.floor(n / 10), u = n % 10;
    if (u && d && u !== d && 10 * u + d <= 50) f.add(enLettres(10 * u + d));
    [n - 1, n + 1, n + 10, n - 10].filter((x) => x > 0 && x <= 60).forEach((x) => f.add(enLettres(x)));
    return [...f].filter((x) => x !== enLettres(n));
  };
  GEN["cp1-ecritures"] = function () {
    const t = rand(0, 4);
    if (t === 0) { // lettres → chiffres
      const n = rand(11, 50), c = melange(`$${n}$`, [...(n % 10 && Math.floor(n / 10) !== n % 10 ? [`$${10 * (n % 10) + Math.floor(n / 10)}$`] : []), `$${n + 1}$`, `$${n - 1}$`, `$${n + 10}$`].filter((x) => x !== `$${n}$`));
      return { enonce: `Quel nombre s'écrit « **${enLettres(n)}** » ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Lis le premier mot : il donne les dizaines (vingt, trente, quarante…).", "Le mot suivant donne les unités.", n < 17 ? "Les nombres de onze à seize ont un nom à eux." : `« ${enLettres(10 * Math.floor(n / 10))} », c'est $${10 * Math.floor(n / 10)}$.`],
        solution: `« ${enLettres(n)} » s'écrit $${n}$.` };
    }
    if (t === 1) { // chiffres → lettres
      const n = rand(11, 50), c = melange(enLettres(n), lettresFausses(n));
      return { enonce: `Comment s'écrit $${n}$ en lettres ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`$${n}$, c'est $${10 * Math.floor(n / 10)}$ et encore $${n % 10}$.`, `$${10 * Math.floor(n / 10)}$ s'écrit « ${enLettres(10 * Math.floor(n / 10))} ».`, "Lis chaque proposition à voix haute."],
        solution: `$${n}$ s'écrit « ${enLettres(n)} ».` };
    }
    if (t === 2) { // décomposition additive à trou
      const d = rand(1, 9), u = rand(1, 9), n = 10 * d + u, trou = rand(0, 2);
      const [enonce, rep] = [[`$${n} = ${10 * d} + \\ldots$`, u], [`$${n} = \\ldots + ${u}$`, 10 * d], [`$${10 * d} + ${u} = \\ldots$`, n]][trou];
      return { enonce: `Complète : ${enonce}`, mode: "nombre", prefixe: "Le nombre qui manque :", attendu: rep,
        erreurs: trou === 1 ? [{ valeur: d, message: `Le chiffre $${d}$ vaut ici $${d}$ dizaine${d > 1 ? "s" : ""}, c'est-à-dire $${10 * d}$.` }] : trou === 2 ? [{ valeur: d + u, message: `$${10 * d} + ${u}$ : on garde les $${d}$ dizaine${d > 1 ? "s" : ""} et on ajoute $${u}$ unité${u > 1 ? "s" : ""}.` }] : [],
        aides: [`$${n}$, c'est $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}.`, `$${d}$ dizaine${d > 1 ? "s" : ""}, c'est $${10 * d}$.`, `$${n} = ${10 * d} + ${u}$.`],
        solution: `$${n} = ${10 * d} + ${u}$ : le nombre qui manque est $${rep}$.` };
    }
    if (t === 3) { // la figure correspond à quelle écriture ?
      let d, u; do { d = rand(1, 9); u = rand(1, 9); } while (d === u);
      const c = melange(`$${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}`, [`$${u}$ dizaine${u > 1 ? "s" : ""} et $${d}$ unité${d > 1 ? "s" : ""}`, `$${d + u}$ unités`, `$${10 * d + u}$ dizaines`]);
      return { enonce: "Quelle écriture correspond aux cubes dessinés ?", figure: paquets(0, d, u), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Une barre, c'est une dizaine.", "Un cube seul, c'est une unité.", `Compte les barres ($${d}$), puis les cubes seuls.`],
        solution: `Il y a $${d}$ barre${d > 1 ? "s" : ""} de dix et $${u}$ cube${u > 1 ? "s" : ""} seul${u > 1 ? "s" : ""} : $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}, c'est le nombre $${10 * d + u}$.` };
    }
    // nombre d'unités en tout
    const d = rand(2, 9), u = rand(0, 9), n = 10 * d + u;
    return { enonce: `Le nombre $${n}$, c'est combien d'**unités** en tout ?`, mode: "nombre", prefixe: "C'est", suffixe: "unités", attendu: n,
      erreurs: [{ valeur: u, message: `$${u}$, c'est seulement le chiffre des unités. Chaque dizaine vaut aussi $10$ unités.` }, { valeur: d + u, message: "Une dizaine vaut $10$ unités." }],
      aides: ["Une dizaine, c'est $10$ unités.", `$${d}$ dizaines, c'est $${10 * d}$ unités.`, `Ajoute les $${u}$ unités.`],
      solution: `$${n}$, c'est $${d}$ dizaines et $${u}$ unité${u > 1 ? "s" : ""}, soit $${n}$ unités en tout : on peut dire « $${n}$ unités » ou « $${d}$ dizaines et $${u}$ unité${u > 1 ? "s" : ""} ».` };
  };

  // Compter de 1 en 1, de 2 en 2, de 10 en 10, en avançant ou à rebours
  GEN["cp1-compter"] = function () {
    const t = rand(0, 3);
    if (t === 0) { // juste avant, juste après
      const apres = rand(0, 1), n = apres ? pick([rand(10, 98), 10 * rand(1, 9) - 1, 10 * rand(1, 9) - 1]) : pick([rand(11, 99), 10 * rand(2, 9), 10 * rand(1, 9) + 1]);
      const rep = apres ? n + 1 : n - 1;
      return { enonce: `Quel nombre vient juste ${apres ? "**après**" : "**avant**"} $${n}$ ?`, mode: "nombre", prefixe: "C'est", attendu: rep,
        erreurs: [{ valeur: apres ? n - 1 : n + 1, message: apres ? "Ça, c'est le nombre juste avant." : "Ça, c'est le nombre juste après." }, ...(apres && n % 10 === 9 ? [{ valeur: n - 9 + 100, message: "Après $9$ unités, on passe à la dizaine suivante." }] : [])],
        aides: [apres ? "Le nombre juste après, c'est le nombre plus $1$." : "Le nombre juste avant, c'est le nombre moins $1$.", rep % 10 === 0 || n % 10 === 0 ? "Attention au passage de la dizaine !" : "Seul le chiffre des unités change.", `Récite : $${n - 1}$, $${n}$, $${n + 1}$.`],
        solution: `$${n - 1}$, $${n}$, $${n + 1}$ : le nombre juste ${apres ? "après" : "avant"} $${n}$ est $${rep}$.` };
    }
    if (t === 1 || t === 2) { // suite de pas 1, 2, 5 ou 10, montante ou descendante, trou à la fin ou au milieu
      const pas = pick([1, 2, 2, 5, 10, 10]), desc = rand(0, 2) === 0, L = 5;
      const max = 100 - pas * (L - 1);
      let a = pas === 5 ? 5 * rand(0, Math.floor(max / 5)) : rand(0, max);
      if (pas === 2 && rand(0, 1)) a -= a % 2;
      const suite = Array.from({ length: L }, (_, k) => a + k * pas);
      if (desc) suite.reverse();
      const pos = t === 1 ? L - 1 : rand(1, L - 2), rep = suite[pos];
      const aff = suite.map((v, k) => (k === pos ? "\\ldots" : v)).join(" \\;;\\; ");
      return { enonce: `Complète la suite : $${aff}$`, mode: "nombre", prefixe: "Le nombre qui manque :", attendu: rep,
        erreurs: [{ valeur: pos > 0 ? suite[pos - 1] + (desc ? -1 : 1) : suite[1] + (desc ? 1 : -1), message: `Regarde l'écart entre deux nombres : on ${desc ? "recule" : "avance"} de $${pas}$, pas de $1$.` }].filter((e) => e.valeur !== rep && pas !== 1),
        aides: ["Regarde deux nombres qui se suivent : de combien change-t-on ?", `On ${desc ? "recule" : "avance"} de $${pas}$ à chaque fois.`, pos > 0 ? `$${suite[pos - 1]} ${desc ? "-" : "+"} ${pas}$.` : `$${suite[1]} ${desc ? "+" : "-"} ${pas}$.`],
        solution: `On ${desc ? "recule" : "avance"} de $${pas}$ en $${pas}$ : $${suite.join(" \\;;\\; ")}$. Le nombre qui manque est $${rep}$.` };
    }
    // bande numérique avec une case cachée
    const a = rand(0, 90), n = 10, cache = a + rand(1, n - 1);
    return { enonce: "Quel nombre est caché sous le point d'interrogation ?", figure: bande(a, n, { caches: [cache] }), mode: "nombre", prefixe: "C'est", attendu: cache,
      erreurs: [{ valeur: cache + 1, message: "Regarde la case juste avant le « ? » et ajoute $1$." }, { valeur: cache - 1, message: "Regarde la case juste avant le « ? » : le nombre caché est un de plus." }],
      aides: ["Sur la bande, chaque case vaut un de plus que la précédente.", `Regarde la case juste avant : $${cache - 1}$.`, `$${cache - 1} + 1$.`],
      solution: `Avant le « ? », il y a $${cache - 1}$ ; après, il y a $${cache + 1}$. Le nombre caché est $${cache}$.` };
  };

  // Écrire en chiffres un nombre dicté (jusqu'à 100), les nombres difficiles de 60 à 99 surtout
  GEN["cp1-dictee"] = function () {
    const n = rand(0, 3) ? rand(60, 100) : rand(17, 59), P = prenom(), d = Math.floor(n / 10), u = n % 10;
    const er = [];
    if (n >= 70 && n < 80) er.push({ valeur: +(`60${n - 60}`), message: `« soixante-${enLettres(n - 60)} », c'est $60 + ${n - 60} = ${n}$ : on ne colle pas les chiffres.` });
    if (n >= 80 && n < 100) { er.push({ valeur: 420 + (n - 80), message: `« quatre-vingt », c'est quatre fois vingt : $80$.` }); if (n > 80) er.push({ valeur: +(`80${n - 80}`), message: `« quatre-vingt-${enLettres(n - 80)} », c'est $80 + ${n - 80} = ${n}$.` }); }
    if (d && u && d !== u) er.push({ valeur: 10 * u + d, message: "Attention à l'ordre : les dizaines d'abord, les unités ensuite." });
    return { enonce: `${P.nom} dit à voix haute : « **${enLettres(n)}** ». Écris ce nombre en chiffres.`, mode: "nombre", prefixe: "En chiffres :", attendu: n,
      erreurs: er.filter((e) => e.valeur !== n),
      aides: [n >= 70 && n < 80 ? "« soixante-dix », c'est $70$ : soixante et encore dix." : n >= 80 && n < 100 ? "« quatre-vingts », c'est $80$ (quatre fois vingt)." : n === 100 ? "Après quatre-vingt-dix-neuf vient cent." : `Le premier mot donne les dizaines.`,
        n >= 70 && n < 80 ? `« soixante-${enLettres(n - 60)} », c'est $60 + ${n - 60}$.` : n > 90 && n < 100 ? `« quatre-vingt-${enLettres(n - 80)} », c'est $80 + ${n - 80}$.` : `Cherche les dizaines, puis les unités.`,
        `Le nombre a $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}.`],
      solution: `« ${enLettres(n)} » s'écrit $${n}$ : $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}.` };
  };

  /* =====================================================================
     Chapitre 2 : comparer et ranger (cp2-)
     ===================================================================== */
  const SIGNES = ["$<$", "$>$", "$=$"];
  FIGURES["cp2-cours-signes"] = () => droite({ a: 40, pas: 1, n: 12, lab: [0, 2, 4, 6, 8, 10, 12], points: [{ i: 3, label: "43" }, { i: 8, label: "48" }], aria: "43 est avant 48 sur la droite graduée" });
  FIGURES["cp2-cours-collections"] = () => `${paquets(0, 3, 6, { aria: "36 cubes" })}`;
  FIGURES["cp2-cours-droite"] = () => droite({ a: 20, pas: 1, n: 10, lab: [0, 5, 10], points: [{ i: 7, label: "A" }], aria: "Droite graduée de 20 à 30, point A" });
  FIGURES["cp2-qcm-droite"] = () => droite({ a: 50, pas: 1, n: 10, lab: [0, 5, 10], points: [{ i: 3, label: "B" }], aria: "Droite graduée de 50 à 60, point B" });
  FIGURES["cp2-methode-droite"] = () => droite({ a: 60, pas: 1, n: 10, lab: [0, 10], points: [{ i: 4, label: "C" }], aria: "Droite graduée de 60 à 70, point C" });

  // Placer <, > ou = (trois choix)
  GEN["cp2-signes"] = function () {
    const t = rand(0, 3);
    let a, b;
    if (t === 0) { a = rand(10, 99); b = rand(10, 99); }
    else if (t === 1) { const d = rand(1, 9), u = rand(1, 9); a = 10 * d + u; b = u !== d ? 10 * u + d : a + rand(1, 9); } // mêmes chiffres
    else if (t === 2) { a = rand(11, 98); b = a + pick([-1, 1, 0, 10, -10].filter((k) => a + k <= 100)); }
    else { // dizaines et unités contre un nombre
      const d = rand(1, 9), u = rand(0, 9), n = 10 * d + u, m = n + pick([-2, -1, 0, 1, 2, 10, -10]);
      const c = melange(SIGNES[n < m ? 0 : n > m ? 1 : 2], SIGNES);
      return { enonce: `Choisis le bon signe : $${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""} $\\;\\ldots\\;$ $${m}$`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`$${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}, c'est $${n}$.`, `Compare $${n}$ et $${m}$ : regarde d'abord les dizaines.`, "Le signe $<$ veut dire « plus petit que », le signe $>$ « plus grand que »."],
        solution: `$${d}$ dizaine${d > 1 ? "s" : ""} et $${u}$ unité${u > 1 ? "s" : ""}, c'est $${n}$, et $${n} ${n < m ? "<" : n > m ? ">" : "="} ${m}$.` };
    }
    const sg = a < b ? "<" : a > b ? ">" : "=", c = melange(`$${sg}$`, SIGNES);
    const da = Math.floor(a / 10), db = Math.floor(b / 10);
    return { enonce: `Choisis le bon signe : $${a} \\;\\ldots\\; ${b}$`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Le signe $<$ veut dire « est plus petit que », le signe $>$ « est plus grand que ».", "La pointe du signe montre toujours le plus petit nombre.", da !== db ? `Compare d'abord les dizaines : $${da}$ et $${db}$.` : `Même nombre de dizaines : compare les unités, $${a % 10}$ et $${b % 10}$.`],
      solution: a === b ? `Les deux nombres sont égaux : $${a} = ${b}$.` : da !== db ? `$${a}$ a $${da}$ dizaine${da > 1 ? "s" : ""}, $${b}$ en a $${db}$ : $${a} ${sg} ${b}$.` : `Même nombre de dizaines ($${da}$) ; on compare les unités $${a % 10}$ et $${b % 10}$ : $${a} ${sg} ${b}$.` };
  };

  // Qui a le plus, le moins ? Ranger (toujours au moins trois nombres)
  GEN["cp2-ranger"] = function () {
    const t = rand(0, 2), k = t === 2 ? 4 : 3, nums = new Set();
    while (nums.size < k) nums.add(rand(10, 99));
    const L = [...nums], tri = L.slice().sort((x, y) => x - y);
    if (t === 2) { // ordre croissant ou décroissant parmi des propositions
      const dec = rand(0, 1), bon = (dec ? tri.slice().reverse() : tri).map((v) => `$${v}$`).join(" ; ");
      const fausses = [L.map((v) => `$${v}$`).join(" ; "), (dec ? tri : tri.slice().reverse()).map((v) => `$${v}$`).join(" ; "), [tri[1], tri[0], tri[2], tri[3]].map((v) => `$${v}$`).join(" ; "), [tri[0], tri[2], tri[1], tri[3]].map((v) => `$${v}$`).join(" ; ")];
      const c = melange(bon, fausses);
      return { enonce: `Quels nombres sont rangés dans l'ordre **${dec ? "décroissant" : "croissant"}** (du plus ${dec ? "grand au plus petit" : "petit au plus grand"}) ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`${dec ? "Décroissant" : "Croissant"} : on commence par le plus ${dec ? "grand" : "petit"}.`, `Le plus ${dec ? "grand" : "petit"} est $${dec ? tri[3] : tri[0]}$.`, "Compare les dizaines, puis les unités si besoin."],
        solution: `Dans l'ordre ${dec ? "décroissant" : "croissant"} : ${bon}.` };
    }
    const [A, B, C] = E.tirage(E.PRENOMS, 3).map((p) => p[0]), ch = E.chose(), plus = t === 0;
    const qui = [A, B, C][L.indexOf(plus ? tri[2] : tri[0])], c = melange(qui, [A, B, C]);
    return { enonce: `${A} a $${L[0]}$ ${ch.p}, ${B} en a $${L[1]}$ et ${C} en a $${L[2]}$. Qui en a le **${plus ? "plus" : "moins"}** ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Compare les nombres deux par deux.", "Regarde d'abord le chiffre des dizaines.", `Le plus ${plus ? "grand" : "petit"} des trois nombres est $${plus ? tri[2] : tri[0]}$.`],
      solution: `$${tri[0]} < ${tri[1]} < ${tri[2]}$ : c'est ${qui} qui en a le ${plus ? "plus" : "moins"} ($${plus ? tri[2] : tri[0]}$ ${ch.p}).` };
  };

  // Encadrer, intercaler
  GEN["cp2-encadrer"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // le nombre entre deux nombres
      const a = rand(10, 97);
      return { enonce: `Quel nombre se trouve entre $${a}$ et $${a + 2}$ ?`, mode: "nombre", prefixe: "C'est", attendu: a + 1,
        erreurs: [{ valeur: a + 2, message: `$${a + 2}$ est une des bornes : on cherche le nombre **entre** les deux.` }, { valeur: a, message: `$${a}$ est une des bornes : on cherche le nombre **entre** les deux.` }],
        aides: [`Récite les nombres à partir de $${a}$.`, `Après $${a}$ vient…`, `$${a} + 1$.`],
        solution: `$${a} < ${a + 1} < ${a + 2}$ : le nombre entre les deux est $${a + 1}$.` };
    }
    if (t === 1) { // encadrer entre deux dizaines
      let n; do n = rand(11, 99); while (n % 10 === 0);
      const bas = rand(0, 1), d = Math.floor(n / 10);
      return { enonce: `Complète avec une dizaine : ${bas ? `$\\ldots < ${n} < ${10 * d + 10}$` : `$${10 * d} < ${n} < \\ldots$`}`, mode: "nombre", prefixe: "La dizaine qui manque :", attendu: bas ? 10 * d : 10 * d + 10,
        erreurs: [{ valeur: bas ? n - 1 : n + 1, message: "On demande une **dizaine** : un nombre qui se termine par $0$." }, { valeur: bas ? d : d + 1, message: `On demande la dizaine entière, par exemple $${10 * d}$, pas le chiffre $${d}$.` }],
        aides: [`$${n}$ a $${d}$ dizaine${d > 1 ? "s" : ""}.`, `La dizaine juste avant est $${10 * d}$, la dizaine juste après est $${10 * d + 10}$.`, bas ? "Cherche la dizaine juste avant." : "Cherche la dizaine juste après."],
        solution: `$${10 * d} < ${n} < ${10 * d + 10}$.` };
    }
    // nombre juste plus grand / plus petit parmi une liste, ou plus grand nombre avec deux chiffres
    const a = rand(1, 9); let b; do b = rand(1, 9); while (b === a);
    const grand = rand(0, 1), rep = grand ? 10 * Math.max(a, b) + Math.min(a, b) : 10 * Math.min(a, b) + Math.max(a, b);
    return { enonce: `Avec les chiffres $${a}$ et $${b}$ (une fois chacun), écris le plus ${grand ? "**grand**" : "**petit**"} nombre possible.`, mode: "nombre", prefixe: "C'est", attendu: rep,
      erreurs: [{ valeur: grand ? 10 * Math.min(a, b) + Math.max(a, b) : 10 * Math.max(a, b) + Math.min(a, b), message: `Ça, c'est le plus ${grand ? "petit" : "grand"}.` }, { valeur: a + b, message: "On n'additionne pas : on écrit un nombre à deux chiffres." }],
      aides: ["Le chiffre des dizaines compte le plus.", `Mets le plus ${grand ? "grand" : "petit"} chiffre aux dizaines.`, `Les deux nombres possibles sont $${10 * a + b}$ et $${10 * b + a}$.`],
      solution: `On peut écrire $${10 * a + b}$ ou $${10 * b + a}$. Le plus ${grand ? "grand" : "petit"} est $${rep}$.` };
  };

  // Lire un nombre sur une droite graduée de un en un
  GEN["cp2-droite"] = function () {
    const a = 10 * rand(0, 9), n = 10, i = rand(1, 9), lab = pick([[0, 10], [0, 5, 10], [0, 5, 10]]);
    if (lab.length === 2 && i === 5) return GEN["cp2-droite"]();
    const L = pick(["A", "B", "C", "M", "P"]);
    return { enonce: `Quel nombre est au point ${L} ?`, figure: droite({ a, pas: 1, n, lab, points: [{ i, label: L }], aria: `Droite graduée de ${a} à ${a + 10}, point ${L}` }), mode: "nombre", prefixe: `Point ${L} :`, attendu: a + i,
      erreurs: [{ valeur: a + i + 1, message: "Compte les bonds entre les traits, pas les traits." }, { valeur: a + i - 1, message: "Compte les bonds depuis le nombre écrit, sans oublier le dernier." }, { valeur: i, message: `La droite ne commence pas à $0$ : elle commence à $${a}$.` }].filter((e) => e.valeur !== a + i),
      aides: ["Entre deux traits qui se suivent, on avance de $1$.", lab.length === 3 ? `Le trait du milieu est $${a + 5}$.` : `Le premier nombre écrit est $${a}$.`, `Compte les bonds de $1$ jusqu'au point ${L}.`],
      solution: `Chaque bond vaut $1$. Le point ${L} est à $${i}$ bonds de $${a}$ : $${a} + ${i} = ${a + i}$.` };
  };

  /* =====================================================================
     Chapitre 3 : les rangs et les suites (cp3-)
     ===================================================================== */
  const ORD = ["", "premier", "deuxième", "troisième", "quatrième", "cinquième", "sixième", "septième", "huitième", "neuvième", "dixième", "onzième", "douzième", "treizième", "quatorzième", "quinzième", "seizième", "dix-septième", "dix-huitième", "dix-neuvième", "vingtième"];
  const ordF = (k, f) => (k === 1 ? (f ? "première" : "premier") : ORD[k]);
  const FORMES = ["▲", "■", "●", "★", "◆", "♥"];
  FIGURES["cp3-cours-file"] = () => motifs(["1er", "2e", "3e", "4e", "5e", "6e", "7e"].map((x) => x));
  FIGURES["cp3-cours-motifs"] = () => motifs(["▲", "■", "●", "▲", "■", "●", "▲", "■", "?"]);
  FIGURES["cp3-qcm-motifs"] = () => motifs(["★", "★", "●", "★", "★", "●", "★", "?"]);
  const motifs = E.motifs;

  // Position dans une file
  GEN["cp3-file"] = function () {
    const t = rand(0, 3), P = prenom(), tot = rand(6, 20), r = rand(2, tot - 1);
    const lieu = pick(["à la cantine", "devant la barge", "au marché de Mamoudzou", "pour prendre le bus", "à la bibliothèque", "devant le stade de Cavani"]);
    if (t === 0) return { enonce: `${P.nom} fait la queue ${lieu}. ${P.Il} est ${P.f ? "la" : "le"} ${ordF(r, P.f)} de la file. Combien de personnes y a-t-il **devant** ${P.f ? "elle" : "lui"} ?`, mode: "nombre", prefixe: "Il y a", suffixe: "personnes", attendu: r - 1,
      erreurs: [{ valeur: r, message: `${P.nom} est ${ordF(r, P.f)}, mais on ne ${P.f ? "la" : "le"} compte pas : on compte seulement ceux qui sont devant.` }],
      aides: [`Le ${ordF(r)} a des personnes devant lui : le premier, le deuxième…`, `Devant ${P.nom}, il y a tous les rangs avant ${P.f ? "la" : "le"} ${ordF(r, P.f)}.`, `$${r} - 1$.`],
      solution: `Devant ${P.nom}, il y a les personnes du premier au ${ORD[r - 1] || "premier"} rang : $${r - 1}$ personne${r - 1 > 1 ? "s" : ""}.` };
    if (t === 1) return { enonce: `Il y a $${tot}$ enfants dans la file ${lieu}. ${P.nom} est ${P.f ? "la" : "le"} ${ordF(r, P.f)}. Combien d'enfants y a-t-il **derrière** ${P.f ? "elle" : "lui"} ?`, mode: "nombre", prefixe: "Il y a", suffixe: "enfants", attendu: tot - r,
      erreurs: [{ valeur: r - 1, message: "Ça, ce sont les enfants devant. On demande ceux qui sont derrière." }, { valeur: tot - r + 1, message: `N'oublie pas d'enlever ${P.nom} aussi.` }],
      aides: [`Il y a $${r - 1}$ enfant${r - 1 > 1 ? "s" : ""} devant ${P.nom}.`, `Avec ${P.nom}, cela fait $${r}$ enfants.`, `Les autres sont derrière : $${tot} - ${r}$.`],
      solution: `${P.nom} et les enfants devant ${P.f ? "elle" : "lui"} : $${r}$ enfants. Derrière : $${tot} - ${r} = ${tot - r}$ enfant${tot - r > 1 ? "s" : ""}.` };
    if (t === 2) return { enonce: `Dans la file ${lieu}, il y a $${r - 1}$ personne${r - 1 > 1 ? "s" : ""} devant ${P.nom}. Quel est son rang ? (écris le nombre : $3$ pour troisième)`, mode: "nombre", prefixe: `${P.nom} est`, suffixe: "e", attendu: r,
      erreurs: [{ valeur: r - 1, message: `Il faut compter ${P.nom} aussi : ${P.il} vient juste après.` }],
      aides: [`Les $${r - 1}$ personnes devant ont les rangs $1$ à $${r - 1}$.`, `${P.nom} vient juste après.`, `$${r - 1} + 1$.`],
      solution: `$${r - 1}$ personne${r - 1 > 1 ? "s" : ""} devant, puis ${P.nom} : ${P.il} est ${ordF(r, P.f)} ($${r}$e).` };
    // mot ordinal
    const k = rand(2, 20), c = melange(ordF(k), [k >= 4 && k <= 6 ? ORD[k + 10] : ORD[k > 10 ? k - 10 : k + 1], ORD[k === 20 ? 19 : k + 1], ORD[k - 1] || "premier", { 2: "deuxe", 3: "troisème", 4: "quatrème", 5: "cinqième", 9: "neufième" }[k] || ORD[Math.max(2, k - 2)]]);
    return { enonce: `Comment écrit-on en lettres le rang $${k}$e ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["On ajoute « ième » au nom du nombre.", k === 5 ? "Pour cinq, on ajoute un « u » : cinquième." : k === 9 ? "Pour neuf, le « f » devient « v » : neuvième." : `Le nombre $${k}$ s'écrit « ${enLettres(k)} ».`, "Lis chaque proposition."],
      solution: `$${k}$e s'écrit « ${ordF(k)} ».` };
  };

  // Rang d'un nombre dans une liste
  GEN["cp3-liste"] = function () {
    const pas = pick([1, 2, 3, 4, 5, 10]), a = rand(0, 20), L = Array.from({ length: 6 }, (_, k) => a + k * pas), k = rand(1, 6), sens = rand(0, 1);
    const aff = `$${L.join(" \\;;\\; ")}$`;
    return sens
      ? { enonce: `Voici une liste : ${aff}. Quel nombre est en **${ordF(k)}** position ?`.replace("premier position", "première position"), mode: "nombre", prefixe: "C'est", attendu: L[k - 1],
        erreurs: [...(k < 6 ? [{ valeur: L[k], message: "Tu as compté un nombre de trop : le premier nombre est en première position." }] : []), ...(k > 1 ? [{ valeur: L[k - 2], message: "Il manque un nombre : recompte depuis le début." }] : [])],
        aides: ["Le premier nombre de la liste est en première position.", "Pointe chaque nombre en disant : premier, deuxième, troisième…", `Arrête-toi au ${ordF(k)}.`],
        solution: `On compte : ${L.slice(0, k).map((v, j) => `$${v}$ (${ordF(j + 1, 1)})`).join(", ")}. Le nombre en ${ordF(k, 1)} position est $${L[k - 1]}$.` }
      : { enonce: `Voici une liste : ${aff}. À quelle position est le nombre $${L[k - 1]}$ ? (écris $1$ pour la première, $2$ pour la deuxième…)`, mode: "nombre", prefixe: "Position :", attendu: k,
        erreurs: [{ valeur: L[k - 1], message: "On ne demande pas le nombre, mais sa place dans la liste." }, { valeur: k - 1, message: "Le premier nombre de la liste est en position $1$." }].filter((e) => e.valeur !== k),
        aides: ["Compte les nombres depuis le début de la liste.", "Le premier nombre est en position $1$.", `Compte jusqu'à $${L[k - 1]}$ compris.`],
        solution: `$${L[k - 1]}$ est le ${ordF(k)} nombre de la liste : position $${k}$.` };
  };

  // Suites répétitives de formes : le n-ième élément
  GEN["cp3-motifs"] = function () {
    const lg = rand(2, 4), base = E.tirage(FORMES, lg), motif = rand(0, 2) && lg === 2 ? [base[0], base[0], base[1]] : base, p = motif.length;
    const vis = rand(6, 9), cible = rand(0, 1) ? vis + 1 : rand(vis + 2, 20), rep = motif[(cible - 1) % p];
    const autres = FORMES.filter((f) => !motif.includes(f));
    const c = melange(rep, [...motif, ...autres]);
    const L = Array.from({ length: vis }, (_, k) => motif[k % p]);
    return { enonce: `Les formes se répètent toujours dans le même ordre. Quelle est la **${ordF(cible, 1)}** forme ?`, figure: motifs(cible === vis + 1 ? [...L, "?"] : L), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [`Trouve le motif qui se répète : ${motif.join(" ")}.`, `Le motif a $${p}$ formes. Il recommence à la forme ${p + 1}, ${2 * p + 1}, ${3 * p + 1}…`, `Continue la suite jusqu'à la ${ordF(cible, 1)} forme.`],
      solution: `Le motif ${motif.join(" ")} recommence toutes les $${p}$ formes. En continuant : la ${ordF(cible, 1)} forme est ${rep}.` };
  };

  // Suites de nombres qui avancent ou reculent d'un même pas : le n-ième terme
  GEN["cp3-suite-nombres"] = function () {
    const pas = pick([1, 2, 2, 3, 5, 10]), a = rand(0, 15), k = rand(5, 9), rep = a + (k - 1) * pas;
    if (rep > 100) return GEN["cp3-suite-nombres"]();
    return { enonce: `La suite commence par $${a} \\;;\\; ${a + pas} \\;;\\; ${a + 2 * pas} \\;;\\; ${a + 3 * pas}$ et continue de la même façon. Quel est le **${ordF(k)}** nombre ?`, mode: "nombre", prefixe: "C'est", attendu: rep,
      erreurs: [{ valeur: rep + pas, message: "Tu es allé un cran trop loin : le premier nombre compte comme le premier." }, { valeur: rep - pas, message: "Il manque un cran : continue jusqu'au bon rang." }],
      aides: [`On ajoute $${pas}$ à chaque fois.`, `Écris la suite : ${[0, 1, 2, 3, 4].map((j) => `$${a + j * pas}$`).join(", ")}…`, `Compte les rangs : premier, deuxième… jusqu'au ${ordF(k)}.`],
      solution: `$${Array.from({ length: k }, (_, j) => a + j * pas).join(" \\;;\\; ")}$ : le ${ordF(k)} nombre est $${rep}$.` };
  };

  /* =====================================================================
     Chapitre 4 : additionner et soustraire (cp4-)
     ===================================================================== */
  // Addition posée en KaTeX (nombres alignés à droite) ; res = résultat affiché ou non
  const posee = (L, op, res) => `$\\begin{array}{r} ${L.map((v, k) => (k ? `${op}\\;${v}` : `${v}`)).join(" \\\\ ")} \\\\ \\hline ${res === undefined ? "\\phantom{00}" : res} \\end{array}$\n\n`;
  FIGURES["cp4-cours-collections"] = () => collection(12, { groupes: 0, aria: "12 ronds" });
  FIGURES["cp4-cours-schema"] = () => schema([["32", 32], ["15", 15]], null, { total: "47 en tout" });
  FIGURES["cp4-cours-fois"] = () => collection(15, { groupes: 5, aria: "3 paquets de 5 ronds" });
  FIGURES["cp4-qcm-fois"] = () => collection(12, { groupes: 4, aria: "3 paquets de 4 ronds" });
  const schema = E.schema;

  // Le sens : quelle opération, puis le résultat
  GEN["cp4-sens"] = function () {
    const t = rand(0, 3), P = prenom(), c = E.chose();
    if (t <= 1) { // ajout ou retrait, résultat
      const ajout = t === 0, a = rand(5, 60), b = ajout ? rand(2, Math.min(39, 99 - a)) : rand(2, a - 1), rep = ajout ? a + b : a - b;
      const verbe = ajout ? pick([`en reçoit encore $${b}$`, `en trouve encore $${b}$`, `en achète encore $${b}$ au marché`]) : pick([`en donne $${b}$ à ${pick(["sa sœur", "son frère", "son cousin", "sa cousine"])}`, `en perd $${b}$`, `en mange $${b}$`.replace("mange", c.p.includes("mangue") || c.p.includes("banane") || c.p.includes("papaye") ? "mange" : "donne")]);
      return { enonce: `${P.nom} a $${a}$ ${c.p}. ${P.Il} ${verbe}. Combien de ${c.p} a-t-${P.il} maintenant ?`, mode: "nombre", prefixe: `${P.Il} a`, suffixe: c.p, attendu: rep,
        erreurs: [{ valeur: ajout ? a - b : a + b, message: ajout ? `${P.nom} en a **plus** qu'avant : c'est une addition.` : `${P.nom} en a **moins** qu'avant : c'est une soustraction.` }],
        aides: [ajout ? "On en ajoute : le nombre augmente." : "On en enlève : le nombre diminue.", `Écris l'opération : $${a} ${ajout ? "+" : "-"} ${b}$.`, ajout ? "Ajoute d'abord les dizaines, puis les unités." : `Enlève d'abord ${b >= 10 ? "les dizaines, puis les unités" : "pour arriver à la dizaine, puis le reste"}.`],
        solution: `$${a} ${ajout ? "+" : "-"} ${b} = ${rep}$. ${P.Il} a maintenant $${rep}$ ${c.p}.` };
    }
    if (t === 2) { // choisir l'opération
      const a = rand(12, 60), b = rand(3, 11), ajout = rand(0, 1);
      const bon = ajout ? `$${a} + ${b}$` : `$${a} - ${b}$`, c2 = melange(bon, [ajout ? `$${a} - ${b}$` : `$${a} + ${b}$`, `$${b} - ${a}$`, `$${a} + ${a}$`]);
      return { enonce: `Dans le bus pour ${pick(E.LIEUX)}, il y a $${a}$ passagers. Au premier arrêt, $${b}$ passagers ${ajout ? "montent" : "descendent"}. Quelle opération donne le nombre de passagers maintenant ?`, mode: "choix", choix: c2.choix, attendu: c2.attendu,
        aides: [ajout ? "Des passagers montent : il y en a plus." : "Des passagers descendent : il y en a moins.", ajout ? "Quand on ajoute, on fait une addition." : "Quand on enlève, on fait une soustraction.", "On part toujours du nombre de départ."],
        solution: `On part de $${a}$ passagers et on ${ajout ? "ajoute" : "enlève"} $${b}$ : ${bon} $= ${ajout ? a + b : a - b}$.` };
    }
    // l'addition et la soustraction sont inverses
    const a = rand(11, 60), b = rand(5, 39), s = a + b, q = rand(0, 1);
    return { enonce: `On sait que $${a} + ${b} = ${s}$. Sans poser d'opération, calcule $${s} - ${q ? a : b}$.`, mode: "nombre", prefixe: "Résultat :", attendu: q ? b : a,
      erreurs: [{ valeur: s, message: "On enlève un des deux nombres : il reste l'autre." }, { valeur: q ? a : b, message: "Tu as donné le nombre qu'on enlève : il reste l'autre." }],
      aides: [`$${s}$, c'est $${a}$ et $${b}$ ensemble.`, `Si on enlève $${q ? a : b}$, il reste l'autre nombre.`, `La soustraction défait l'addition.`],
      solution: `$${a} + ${b} = ${s}$, donc $${s} - ${q ? a : b} = ${q ? b : a}$.` };
  };

  // Le signe = : écritures justes ou fausses, égalités
  GEN["cp4-egal"] = function () {
    const t = rand(0, 2);
    if (t === 0) { // trouver l'écriture juste
      const a = rand(21, 79), b = rand(3, 9), dz = Math.ceil((a + 1) / 10) * 10, k = dz - a;
      if (k >= b) return GEN["cp4-egal"]();
      const bon = `$${a} + ${k} = ${dz}$ puis $${dz} + ${b - k} = ${a + b}$`;
      const c = melange(bon, [`$${a} + ${k} = ${dz} + ${b - k} = ${a + b}$`, `$${a} + ${b} = ${dz} = ${a + b}$`, `$${a} = ${dz} - ${k} + ${b} = ${a + b}$`]);
      return { enonce: `Pour calculer $${a} + ${b}$, on passe par $${dz}$. Quelle écriture est **juste** ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le signe $=$ ne se met qu'entre deux choses qui ont la même valeur.", `Est-ce que $${a} + ${k}$ vaut la même chose que $${dz} + ${b - k}$ ?`, "Écris chaque étape dans une égalité séparée."],
        solution: `$${a} + ${k}$ vaut $${dz}$, mais $${dz} + ${b - k}$ vaut $${a + b}$ : on ne peut pas les relier par $=$. On écrit deux égalités : ${bon}.` };
    }
    if (t === 1) { // égalité à trou
      const a = rand(10, 50), b = rand(2, 40), c = a + b, pos = rand(0, 2);
      const txt = [`$\\ldots + ${b} = ${c}$`, `$${a} + \\ldots = ${c}$`, `$${c} = ${a} + \\ldots$`][pos], rep = pos === 0 ? a : b;
      return { enonce: `Complète l'égalité : ${txt}`, mode: "nombre", prefixe: "Le nombre qui manque :", attendu: rep,
        erreurs: [{ valeur: c + (pos ? a : b), message: "Le nombre qui manque est plus petit que le total : il faut chercher ce qui manque." }],
        aides: ["Les deux côtés du signe $=$ ont la même valeur.", `Cherche ce qu'il faut ajouter à $${pos === 0 ? b : a}$ pour arriver à $${c}$.`, `$${c} - ${pos === 0 ? b : a}$.`],
        solution: `$${c} - ${pos === 0 ? b : a} = ${rep}$, donc ${txt.replace("\\ldots", String(rep))}.` };
    }
    // l'ordre ne compte pas pour l'addition, mais compte pour la soustraction
    const a = rand(20, 70), b = rand(5, 19), q = rand(0, 1);
    const bon = q ? `$${b} + ${a}$` : `$${a} - ${b}$`, c = melange(bon, q ? [`$${b} - ${a}$`, `$${a} - ${b}$`, `$${a} + ${a}$`] : [`$${b} - ${a}$`, `$${b} + ${a}$`, `$${a} + ${b}$`]);
    return { enonce: q ? `Quel calcul donne le même résultat que $${a} + ${b}$ ?` : `Il y a $${a}$ mangues dans le panier. On en prend $${b}$. Quel calcul donne le nombre de mangues qui restent ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: q ? ["Dans une addition, on peut échanger les nombres.", "Dans une soustraction, on ne peut pas.", "Cherche une addition avec les mêmes nombres."] : ["On enlève des mangues : soustraction.", "On part du nombre de mangues du panier.", "Dans une soustraction, l'ordre des nombres compte."],
      solution: q ? `$${a} + ${b} = ${b} + ${a} = ${a + b}$ : l'ordre ne change pas une addition.` : `On part de $${a}$ et on enlève $${b}$ : $${a} - ${b} = ${a - b}$. Le calcul $${b} - ${a}$ ne veut rien dire ici.` };
  };

  // Addition posée en colonnes (deux ou trois nombres, résultat jusqu'à 100)
  GEN["cp4-posee"] = function () {
    const trois = rand(0, 3) === 0;
    let L;
    do { L = trois ? [rand(10, 50), rand(2, 9), rand(10, 40)] : [rand(10, 79), rand(5, 49)]; } while (L.reduce((s, v) => s + v, 0) > 100);
    const s = L.reduce((x, v) => x + v, 0), u = L.reduce((x, v) => x + (v % 10), 0), ret = Math.floor(u / 10);
    return { enonce: `Pose et calcule : $${L.join(" + ")}$`, figure: undefined, mode: "nombre", prefixe: "Résultat :", attendu: s,
      erreurs: ret ? [{ valeur: s - 10 * ret, message: "Tu as oublié la retenue : les unités font plus de $10$, il faut ajouter une dizaine." }, { valeur: Number(`${Math.floor((s - u) / 10)}${u}`), message: "Quand les unités dépassent $9$, on écrit seulement le chiffre des unités et on retient une dizaine." }] : [],
      aides: ["Écris les unités sous les unités, les dizaines sous les dizaines.", `Additionne d'abord les unités : $${L.map((v) => v % 10).join(" + ")} = ${u}$.${ret ? ` Écris $${u % 10}$ et retiens $${ret}$.` : ""}`, `Additionne ensuite les dizaines${ret ? " sans oublier la retenue" : ""}.`],
      solution: `${posee(L, "+", s)}Unités : $${L.map((v) => v % 10).join(" + ")} = ${u}$${ret ? ` (on écrit $${u % 10}$, on retient $${ret}$)` : ""}. Dizaines : $${[...(ret ? [ret] : []), ...L.map((v) => Math.floor(v / 10))].join(" + ")} = ${Math.floor(s / 10)}$. Résultat : $${s}$.` };
  };

  // Le sens de la multiplication : « fois », addition répétée (nombres jusqu'à 30)
  GEN["cp4-fois"] = function () {
    const t = rand(0, 2), k = rand(2, 5), v = rand(2, Math.min(10, Math.floor(30 / k)));
    const [obj, boite] = pick([["biscuits", "paquets"], ["œufs", "boîtes"], ["mangues", "sacs"], ["crayons", "trousses"], ["billes", "sachets"], ["poissons", "seaux"]]);
    if (t === 0) return { enonce: `Il y a $${k}$ ${boite} de $${v}$ ${obj}. Combien y a-t-il de ${obj} en tout ?`, figure: k * v <= 30 ? collection(k * v, { groupes: v }) : undefined, mode: "nombre", prefixe: "Il y a", suffixe: obj, attendu: k * v,
      erreurs: [{ valeur: k + v, message: `Il n'y a pas $${k}$ ${obj} et $${v}$ ${obj} : il y a $${k}$ fois $${v}$ ${obj}.` }],
      aides: [`Chaque ${boite.slice(0, -1)} contient $${v}$ ${obj}.`, `C'est $${k}$ fois $${v}$ : $${Array(k).fill(v).join(" + ")}$.`, "Ajoute les nombres un à un."],
      solution: `$${k}$ fois $${v}$ : $${Array(k).fill(v).join(" + ")} = ${k * v}$ ${obj}.` };
    if (t === 1) {
      const bon = `$${Array(k).fill(v).join(" + ")}$`, c = melange(bon, [`$${k} + ${v}$`, `$${Array(v).fill(k).join(" + ")}$`.length > 60 ? `$${v} + ${v}$` : `$${k} + ${k}$`, `$${Array(k + 1).fill(v).join(" + ")}$`, `$${v} - ${k}$`]);
      return { enonce: `« $${k}$ fois $${v}$ », c'est :`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: [`« $${k}$ fois $${v}$ », c'est le nombre $${v}$ répété $${k}$ fois.`, "Compte combien de fois le même nombre est écrit.", "Ce n'est pas une simple addition de deux nombres."],
        solution: `« $${k}$ fois $${v}$ » $= ${Array(k).fill(v).join(" + ")} = ${k * v}$.` };
    }
    return { enonce: `Combien y a-t-il de ronds ? Compte les paquets.`, figure: collection(k * v, { groupes: v }), mode: "nombre", prefixe: "Il y a", suffixe: "ronds", attendu: k * v,
      erreurs: [{ valeur: k, message: "Ça, c'est le nombre de paquets. Combien de ronds en tout ?" }, { valeur: v, message: "Ça, c'est le nombre de ronds dans un paquet." }],
      aides: ["Compte les paquets.", `Il y a $${k}$ paquets de $${v}$ ronds.`, `$${Array(k).fill(v).join(" + ")}$.`],
      solution: `$${k}$ paquets de $${v}$ : $${Array(k).fill(v).join(" + ")} = ${k * v}$ ronds ($${k}$ fois $${v}$).` };
  };

  /* =====================================================================
     Chapitre 5 : calcul mental (cp5-)
     ===================================================================== */
  FIGURES["cp5-cours-passer10"] = () => droite({ a: 45, pas: 1, n: 12, lab: [2, 5, 10], fleches: [[2, 5, "+3"], [5, 10, "+5"]], aria: "47 + 8 : on va de 47 à 50 (+3) puis de 50 à 55 (+5)" });
  FIGURES["cp5-cours-plus9"] = () => droite({ a: 35, pas: 1, n: 13, lab: [2, 11, 12], fleches: [[2, 12, "+10"], [12, 11, "−1"]], aria: "37 + 9 : on ajoute 10 puis on enlève 1" });

  // Tables d'addition dans les deux sens
  GEN["cp5-tables"] = function () {
    const a = rand(0, 10), b = rand(0, 10), c = a + b, pos = rand(0, 3);
    const [txt, rep] = [[`$${a} + ${b} = \\ldots$`, c], [`$${a} + \\ldots = ${c}$`, b], [`$\\ldots + ${b} = ${c}$`, a], [`$${c} = ${a} + \\ldots$`, b]][pos];
    return { enonce: `Complète : ${txt}`, mode: "nombre", prefixe: "Le nombre qui manque :", attendu: rep,
      erreurs: [...(pos ? [{ valeur: c + (pos === 2 ? b : a), message: "Le nombre qui manque est plus petit que le total : cherche ce qu'il faut ajouter." }] : []), { valeur: rep + 1, message: "Presque ! Recompte un par un pour vérifier." }, { valeur: rep - 1, message: "Presque ! Recompte un par un pour vérifier." }].filter((e) => e.valeur >= 0),
      aides: pos ? [`Pars de $${pos === 2 ? b : a}$ et compte jusqu'à $${c}$.`, "Tu peux t'aider des doubles ou du passage par $10$.", `$${c} - ${pos === 2 ? b : a}$.`] : ["Pars du plus grand nombre et ajoute le plus petit.", Math.abs(a - b) <= 1 ? "C'est presque un double !" : "Tu peux passer par $10$.", `Récite la table de $${Math.min(a, b)}$.`],
      solution: `$${a} + ${b} = ${c}$.` };
  };

  // Doubles et moitiés
  GEN["cp5-doubles"] = function () {
    const t = rand(0, 4);
    if (t === 0) { const n = pick([...Array.from({ length: 10 }, (_, k) => k + 1), 20, 30, 40, 50]); return { enonce: `Quel est le double de $${n}$ ?`, mode: "nombre", prefixe: "Le double est", attendu: 2 * n, erreurs: [{ valeur: n / 2, message: "Ça, c'est la moitié. Le double, c'est deux fois plus." }, { valeur: n + 2, message: "Le double, ce n'est pas « plus 2 » : c'est le nombre ajouté à lui-même." }], aides: ["Le double d'un nombre, c'est ce nombre ajouté à lui-même.", `$${n} + ${n}$.`, n >= 20 ? `Double des dizaines : $${n / 10}$ dizaines, deux fois.` : "Pense à tes doigts : deux mains pareilles."], solution: `Le double de $${n}$ : $${n} + ${n} = ${2 * n}$.` }; }
    if (t === 1) { const n = pick([2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 40, 60, 80, 100]); return { enonce: `Quelle est la moitié de $${n}$ ?`, mode: "nombre", prefixe: "La moitié est", attendu: n / 2, erreurs: [{ valeur: 2 * n, message: "Ça, c'est le double. La moitié, c'est deux fois moins." }], aides: ["La moitié, c'est partager en deux parts égales.", `Quel nombre ajouté à lui-même donne $${n}$ ?`, `$\\ldots + \\ldots = ${n}$ avec deux fois le même nombre.`], solution: `$${n / 2} + ${n / 2} = ${n}$ : la moitié de $${n}$ est $${n / 2}$.` }; }
    if (t === 2) { const n = rand(1, 10), q = rand(0, 1); return q ? { enonce: `Complète : double de $\\ldots = ${2 * n}$`, mode: "nombre", prefixe: "Le nombre est", attendu: n, erreurs: [{ valeur: 4 * n, message: "On cherche le nombre de départ : c'est la moitié." }], aides: [`Quel nombre ajouté à lui-même donne $${2 * n}$ ?`, `C'est la moitié de $${2 * n}$.`, `$${n} + ${n} = ${2 * n}$ ?`], solution: `Le double de $${n}$ est $${2 * n}$.` } : { enonce: `Combien font $${n} + ${n}$ ?`, mode: "nombre", prefixe: "Résultat :", attendu: 2 * n, erreurs: [], aides: ["C'est un double.", "Pense aux doigts des deux mains.", `Le double de $${n}$.`], solution: `$${n} + ${n} = ${2 * n}$ (le double de $${n}$).` }; }
    // moitié d'un nombre pair par décomposition (dizaines paires)
    const d = 2 * rand(1, 4), u = 2 * rand(1, 4), n = 10 * d + u;
    return { enonce: `Quelle est la moitié de $${n}$ ?`, mode: "nombre", prefixe: "La moitié est", attendu: n / 2,
      erreurs: [{ valeur: 10 * (d / 2) + u, message: "Il faut aussi prendre la moitié des unités." }, { valeur: 5 * d + u / 2 + 10, message: "Recompte la moitié des dizaines." }],
      aides: [`Décompose : $${n} = ${10 * d} + ${u}$.`, `La moitié de $${10 * d}$ est $${5 * d}$, la moitié de $${u}$ est $${u / 2}$.`, `$${5 * d} + ${u / 2}$.`],
      solution: `$${n} = ${10 * d} + ${u}$. Moitiés : $${5 * d}$ et $${u / 2}$. Donc la moitié de $${n}$ est $${5 * d + u / 2}$.` };
  };

  // Ajouter ou enlever 1, 2, 10, des dizaines
  GEN["cp5-dizaines"] = function () {
    const t = rand(0, 2);
    if (t === 0) { const a = rand(12, 97), k = pick([1, 2]), plus = rand(0, 1) || a + k > 100; const r = plus && a + k <= 100 ? a + k : a - k; const op = r > a ? "+" : "-"; return { enonce: `Calcule : $${a} ${op} ${k}$`, mode: "nombre", prefixe: "Résultat :", attendu: r, erreurs: [{ valeur: op === "+" ? a - k : a + k, message: op === "+" ? "On ajoute : le résultat est plus grand." : "On enlève : le résultat est plus petit." }], aides: [op === "+" ? "Ajouter $1$, c'est dire le nombre juste après." : "Enlever $1$, c'est dire le nombre juste avant.", k === 2 ? `Fais-le deux fois.` : "Récite la comptine des nombres.", `${op === "+" ? "Après" : "Avant"} $${a}$ vient $${op === "+" ? a + 1 : a - 1}$.`], solution: `$${a} ${op} ${k} = ${r}$.` }; }
    const k = t === 1 ? 1 : rand(2, 9), a = rand(10, 99), plus = rand(0, 1);
    if ((plus && a + 10 * k > 100) || (!plus && a - 10 * k < 0)) return GEN["cp5-dizaines"]();
    const r = plus ? a + 10 * k : a - 10 * k;
    return { enonce: `Calcule : $${a} ${plus ? "+" : "-"} ${10 * k}$`, mode: "nombre", prefixe: "Résultat :", attendu: r,
      erreurs: [{ valeur: plus ? a + k : a - k, message: `$${10 * k}$, c'est $${k}$ dizaine${k > 1 ? "s" : ""}, pas $${k}$ unité${k > 1 ? "s" : ""} : c'est le chiffre des dizaines qui change.` }],
      aides: [`$${10 * k}$, c'est $${k}$ dizaine${k > 1 ? "s" : ""}.`, `$${a}$ a $${Math.floor(a / 10)}$ dizaines : ${plus ? "ajoute" : "enlève"} $${k}$ dizaine${k > 1 ? "s" : ""}.`, "Le chiffre des unités ne change pas."],
      solution: `$${a}$, c'est $${Math.floor(a / 10)}$ dizaines et $${a % 10}$ unités. $${Math.floor(a / 10)} ${plus ? "+" : "-"} ${k} = ${Math.floor(r / 10)}$ dizaine${Math.floor(r / 10) > 1 ? "s" : ""}, et toujours $${a % 10}$ unités : $${a} ${plus ? "+" : "-"} ${10 * k} = ${r}$.` };
  };

  // Procédures : complément à la dizaine, passer par la dizaine, ajouter 9, ajouter deux nombres, dizaine moins un petit nombre
  GEN["cp5-procedures"] = function () {
    const t = rand(0, 4);
    if (t === 0) { let a; do a = rand(11, 89); while (a % 10 === 0); const dz = Math.ceil(a / 10) * 10; return { enonce: `Combien faut-il ajouter à $${a}$ pour arriver à la dizaine juste après ?`, mode: "nombre", prefixe: "Il faut ajouter", attendu: dz - a, erreurs: [{ valeur: dz, message: "On demande ce qu'il faut ajouter, pas la dizaine." }, { valeur: a % 10, message: `$${a % 10}$, c'est le chiffre des unités : on cherche son complément à $10$.` }], aides: [`La dizaine juste après $${a}$ est $${dz}$.`, `$${a % 10}$ unités : il en manque combien pour faire $10$ ?`, `$${a % 10} + \\ldots = 10$.`], solution: `$${a % 10} + ${10 - (a % 10)} = 10$, donc $${a} + ${dz - a} = ${dz}$.` }; }
    if (t === 1) { const a = rand(12, 88), b = rand(2, 8), dz = Math.ceil((a + 1) / 10) * 10, k = dz - a; if (k >= b || a + b > 100 || a % 10 === 0) return GEN["cp5-procedures"](); return { enonce: `Calcule en passant par $${dz}$ : $${a} + ${b}$`, mode: "nombre", prefixe: "Résultat :", attendu: a + b, erreurs: [{ valeur: a + b - 10, message: "Tu as dépassé la dizaine : le chiffre des dizaines augmente de $1$." }], aides: [`Pour aller de $${a}$ à $${dz}$, il faut $${k}$.`, `Il reste à ajouter $${b} - ${k} = ${b - k}$.`, `$${dz} + ${b - k}$.`], solution: `$${a} + ${k} = ${dz}$, puis $${dz} + ${b - k} = ${a + b}$. Donc $${a} + ${b} = ${a + b}$.` }; }
    if (t === 2) { const a = rand(10, 90), r = a + 9; if (r > 100) return GEN["cp5-procedures"](); return { enonce: `Calcule : $${a} + 9$`, mode: "nombre", prefixe: "Résultat :", attendu: r, erreurs: [{ valeur: a + 10, message: "Tu as ajouté $10$ : il faut ensuite enlever $1$." }, { valeur: a + 8, message: "Ajouter $9$, c'est ajouter $10$ puis enlever $1$ (pas $2$)." }], aides: ["Ajouter $9$, c'est ajouter $10$, puis enlever $1$.", `$${a} + 10 = ${a + 10}$.`, `$${a + 10} - 1$.`], solution: `$${a} + 10 = ${a + 10}$, puis $${a + 10} - 1 = ${r}$.` }; }
    if (t === 3) { const a = rand(11, 59), b = rand(11, 99 - a); if (a + b > 99) return GEN["cp5-procedures"](); const D = 10 * (Math.floor(a / 10) + Math.floor(b / 10)), U = (a % 10) + (b % 10); return { enonce: `Calcule de tête : $${a} + ${b}$`, mode: "nombre", prefixe: "Résultat :", attendu: a + b, erreurs: U >= 10 ? [{ valeur: D + (U % 10), message: `Les unités font $${U}$ : c'est $1$ dizaine et $${U % 10}$ unités.` }] : [], aides: ["Ajoute les dizaines entre elles, puis les unités entre elles.", `Dizaines : $${10 * Math.floor(a / 10)} + ${10 * Math.floor(b / 10)} = ${D}$. Unités : $${a % 10} + ${b % 10} = ${U}$.`, `$${D} + ${U}$.`], solution: `$${D} + ${U} = ${a + b}$, donc $${a} + ${b} = ${a + b}$.` }; }
    const dz = 10 * rand(2, 10), b = rand(2, 9);
    return { enonce: `Calcule : $${dz} - ${b}$`, mode: "nombre", prefixe: "Résultat :", attendu: dz - b, erreurs: [{ valeur: dz - 10 + b, message: `On casse une dizaine : il reste $10 - ${b} = ${10 - b}$ unités, pas $${b}$.` }, { valeur: dz + b, message: "On enlève : le résultat est plus petit." }],
      aides: [`$${dz}$, c'est $${dz / 10 - 1}$ dizaines et $10$ unités.`, `$10 - ${b} = ${10 - b}$.`, `Il reste $${dz / 10 - 1}$ dizaines et $${10 - b}$ unités.`],
      solution: `On casse une dizaine : $${dz} = ${dz - 10} + 10$. $10 - ${b} = ${10 - b}$, donc $${dz} - ${b} = ${dz - b}$.` };
  };

  /* =====================================================================
     Chapitre 6 : résoudre des problèmes (cp6-)
     ===================================================================== */
  FIGURES["cp6-cours-tout"] = () => schema([["25", 25], ["?", 18, 1]], null, { total: "43 cerises" });
  FIGURES["cp6-cours-groupes"] = () => collection(21, { groupes: 7, aria: "3 paquets de 7 biscuits" });
  FIGURES["cp6-qcm-schema"] = () => schema([["30", 30], ["12", 12]], null, { total: "?" });

  // Problèmes parties-tout et de transformation en une étape
  GEN["cp6-parties"] = function () {
    const t = rand(0, 4), P = prenom(), c = E.chose();
    if (t === 0) { // tout à partir de deux parties
      const a = rand(10, 60), b = rand(5, 99 - a), [lieu, qa, qb] = pick([["À l'école", "filles", "garçons"], ["Dans le panier", "mangues vertes", "mangues jaunes"], ["À la bibliothèque", "livres de contes", "bandes dessinées"], ["Dans l'aquarium", "poissons rouges", "poissons bleus"]]);
      return { enonce: `${lieu}, il y a $${a}$ ${qa} et $${b}$ ${qb}. Combien y en a-t-il en tout ?`, figure: schema([[String(a), a], [String(b), b]], null, { total: "?" }), mode: "nombre", prefixe: "En tout :", attendu: a + b,
        erreurs: [{ valeur: Math.abs(a - b), message: "On cherche le tout : on réunit les deux parties, c'est une addition." }],
        aides: ["Les deux parties ensemble font le tout.", `Écris le calcul : $${a} + ${b}$.`, "Ajoute les dizaines, puis les unités."],
        solution: `$${a} + ${b} = ${a + b}$. Il y en a $${a + b}$ en tout.` };
    }
    if (t === 1) { // une partie à partir du tout
      const tot = rand(25, 99), a = rand(5, tot - 5);
      return { enonce: `${P.nom} a $${tot}$ ${c.p}. $${a}$ sont dans ${pick(["son sac", "une boîte", "son cartable", "un panier"])}, les autres sont sur la table. Combien de ${c.p} sont sur la table ?`, figure: schema([[String(a), a], ["?", tot - a, 1]], null, { total: `${tot}` }), mode: "nombre", prefixe: "Sur la table :", suffixe: c.p, attendu: tot - a,
        erreurs: [{ valeur: tot + a, message: "On connaît le tout et une partie : on cherche l'autre partie, c'est une soustraction." }],
        aides: [`Le tout, c'est $${tot}$. Une partie, c'est $${a}$.`, "L'autre partie, c'est ce qui reste quand on enlève la première.", `$${tot} - ${a}$, ou : $${a} + \\ldots = ${tot}$.`],
        solution: `$${tot} - ${a} = ${tot - a}$. Il y a $${tot - a}$ ${c.p} sur la table.` };
    }
    if (t === 2) { // combien sont partis ?
      const a = rand(20, 90), b = rand(5, a - 5), [obj, verbe] = pick([["oiseaux dans le manguier", "se sont envolés"], ["enfants au parc", "sont rentrés chez eux"], ["poissons dans le filet", "se sont échappés"], ["passagers dans la barge", "sont descendus"]]);
      return { enonce: `Il y avait $${a}$ ${obj}. Maintenant, il n'en reste que $${b}$. Combien ${verbe} ?`, mode: "nombre", prefixe: "Réponse :", attendu: a - b,
        erreurs: [{ valeur: a + b, message: "Il en reste moins qu'avant : on cherche l'écart, c'est une soustraction." }],
        aides: [`Au début : $${a}$. À la fin : $${b}$.`, "Ceux qui sont partis + ceux qui restent = ceux du début.", `$${b} + \\ldots = ${a}$, ou $${a} - ${b}$.`],
        solution: `$${a} - ${b} = ${a - b}$. Réponse : $${a - b}$.` };
    }
    if (t === 3) { // combien au début ?
      const b = rand(3, 30), r = rand(10, 99 - b);
      return { enonce: `${P.nom} a mangé $${b}$ ${pick(["litchis", "bonbons", "morceaux d'ananas"])}. Il en reste encore $${r}$ dans le bol. Combien y en avait-il dans le bol avant ?`, mode: "nombre", prefixe: "Avant :", attendu: r + b,
        erreurs: [{ valeur: Math.abs(r - b), message: "Avant, il y en avait plus : ceux mangés et ceux qui restent." }],
        aides: ["Avant = ceux qui ont été mangés + ceux qui restent.", `$${b} + ${r}$.`, "Ajoute les dizaines, puis les unités."],
        solution: `$${r} + ${b} = ${r + b}$. Il y en avait $${r + b}$.` };
    }
    // trois parties (wagons, rangées)
    let a, b, d; do { a = rand(10, 40); b = rand(10, 40); d = rand(5, 30); } while (a + b + d > 100);
    return { enonce: `La barge transporte des voitures : $${a}$ au premier voyage, $${b}$ au deuxième et $${d}$ au troisième. Combien de voitures a-t-elle transportées en tout ?`, mode: "nombre", prefixe: "En tout :", suffixe: "voitures", attendu: a + b + d,
      erreurs: [{ valeur: a + b, message: "N'oublie pas le troisième voyage." }],
      aides: ["Il faut ajouter les trois nombres.", `$${a} + ${b} = ${a + b}$.`, `$${a + b} + ${d}$.`],
      solution: `$${a} + ${b} + ${d} = ${a + b + d}$ voitures.` };
  };

  // Problèmes en deux étapes (nombres jusqu'à 30)
  GEN["cp6-deux-etapes"] = function () {
    const t = rand(0, 2), P = prenom();
    if (t === 0) { let a, d, m; do { a = rand(12, 30); d = rand(2, a - 2); m = rand(2, 12); } while (a - d + m > 30); return { enonce: `Il y a $${a}$ enfants dans le taxi-brousse${""} pour ${pick(E.LIEUX)}. Au premier arrêt, $${d}$ enfants descendent. Au deuxième arrêt, $${m}$ enfants montent. Combien y a-t-il d'enfants maintenant ?`.replace("taxi-brousse", "bus"), mode: "nombre", prefixe: "Il y a", suffixe: "enfants", attendu: a - d + m, erreurs: [{ valeur: a + d + m, message: "Au premier arrêt, des enfants descendent : on enlève." }, { valeur: a - d - m, message: "Au deuxième arrêt, des enfants montent : on ajoute." }, { valeur: a - d, message: "N'oublie pas le deuxième arrêt." }], aides: ["Fais le calcul arrêt par arrêt.", `Après le premier arrêt : $${a} - ${d} = ${a - d}$.`, `Après le deuxième : $${a - d} + ${m}$.`], solution: `$${a} - ${d} = ${a - d}$, puis $${a - d} + ${m} = ${a - d + m}$ enfants.` }; }
    if (t === 1) { let tot, x, y; do { tot = rand(15, 30); x = rand(3, 10); y = rand(3, 10); } while (x + y >= tot); return { enonce: `Sur l'étagère, il y a $${tot}$ livres : $${x}$ albums, $${y}$ bandes dessinées et le reste sont des documentaires. Combien y a-t-il de documentaires ?`, figure: schema([[String(x), x], [String(y), y], ["?", tot - x - y, 1]], null, { total: `${tot} livres` }), mode: "nombre", prefixe: "Il y a", suffixe: "documentaires", attendu: tot - x - y, erreurs: [{ valeur: tot - x, message: "Il faut aussi enlever les bandes dessinées." }, { valeur: x + y, message: "Ça, ce sont les albums et les BD ensemble. On cherche le reste." }], aides: ["Le tout, c'est tous les livres.", `Albums et BD ensemble : $${x} + ${y} = ${x + y}$.`, `$${tot} - ${x + y}$.`], solution: `$${x} + ${y} = ${x + y}$, puis $${tot} - ${x + y} = ${tot - x - y}$ documentaires.` }; }
    let a, b, c; do { a = rand(5, 15); b = rand(2, 10); c = rand(2, 10); } while (a + b - c > 30 || a + b - c < 1);
    return { enonce: `${P.nom} a $${a}$ coquillages. ${P.Il} en ramasse encore $${b}$ sur la plage de ${pick(["Moya", "N'Gouja", "Sakouli", "Saziley"])}, puis en donne $${c}$ à ${pick(["Awa", "Anli", "son petit frère", "sa grand-mère"])}. Combien en a-t-${P.il} maintenant ?`, mode: "nombre", prefixe: `${P.Il} en a`, attendu: a + b - c,
      erreurs: [{ valeur: a + b + c, message: `${P.Il} en donne : il faut enlever.` }, { valeur: a + b, message: "N'oublie pas ceux qui sont donnés." }],
      aides: ["Fais le calcul dans l'ordre de l'histoire.", `D'abord : $${a} + ${b} = ${a + b}$.`, `Puis : $${a + b} - ${c}$.`],
      solution: `$${a} + ${b} = ${a + b}$, puis $${a + b} - ${c} = ${a + b - c}$ coquillages.` };
  };

  // Problèmes multiplicatifs (jusqu'à 30) : groupes égaux, partage
  GEN["cp6-groupes"] = function () {
    const t = rand(0, 2), k = rand(2, 6), v = rand(2, Math.min(10, Math.floor(30 / k))), N = k * v;
    const [obj, gr] = pick([["biscuits", "paquets"], ["élèves", "équipes"], ["mangues", "sacs"], ["perles", "colliers"], ["œufs", "boîtes"], ["chaises", "rangées"]]);
    if (t === 0) return { enonce: `Il y a $${k}$ ${gr}. Dans chacun${["équipes", "boîtes", "rangées"].includes(gr) ? "e" : ""}, il y a $${v}$ ${obj}. Combien y a-t-il de ${obj} en tout ?`, mode: "nombre", prefixe: "En tout :", suffixe: obj, attendu: N,
      erreurs: [{ valeur: k + v, message: `Il y a $${v}$ ${obj} **dans chaque** groupe : ajoute $${v}$ autant de fois qu'il y a de groupes.` }],
      aides: ["Dessine les groupes avec des croix si tu veux.", `C'est $${k}$ fois $${v}$.`, `$${Array(k).fill(v).join(" + ")}$.`],
      solution: `$${Array(k).fill(v).join(" + ")} = ${N}$ ${obj}.` };
    if (t === 1) return { enonce: `On a $${N}$ ${obj}. On fait des ${gr} de $${v}$ ${obj}. Combien de ${gr} peut-on faire ?`, figure: collection(N, { groupes: v }), mode: "nombre", prefixe: "On fait", suffixe: gr, attendu: k,
      erreurs: [{ valeur: N - v, message: "On ne fait pas qu'un seul groupe : on fait des groupes tant qu'il reste des objets." }, { valeur: v, message: `$${v}$, c'est le nombre de ${obj} dans un groupe.` }],
      aides: [`Fais des paquets de $${v}$.`, `Compte de $${v}$ en $${v}$ jusqu'à $${N}$.`, "Compte combien de paquets tu as faits."],
      solution: `$${Array(k).fill(v).join(" + ")} = ${N}$ : on fait $${k}$ ${gr}.` };
    return { enonce: `On partage $${N}$ ${obj} équitablement entre $${k}$ ${pick(["enfants", "amis", "cousins"])}. Combien chacun en reçoit-il ?`, mode: "nombre", prefixe: "Chacun reçoit", suffixe: obj, attendu: v,
      erreurs: [{ valeur: N - k, message: "On distribue un par un à chacun, jusqu'à ce qu'il n'en reste plus." }, { valeur: k, message: `$${k}$, c'est le nombre d'enfants.` }],
      aides: ["Distribue un objet à chacun, puis recommence.", `Chaque tour, on donne $${k}$ ${obj}.`, `Combien de tours pour arriver à $${N}$ ?`],
      solution: `$${k}$ fois $${v}$ font $${N}$ : chacun reçoit $${v}$ ${obj}.` };
  };

  /* =====================================================================
     Chapitre 7 : longueurs et masses (cp7-)
     ===================================================================== */
  const { regle, svg, r1 } = E;
  // Segments horizontaux nommés, alignés à gauche ou non : L = [[nom, longueur en px, décalage]]
  const segments = (L) => svg("segments", 320, L.length * 34 + 6, "Segments à comparer", L.map(([n, l, d], k) => `<text class="g-clabel" x="14" y="${k * 34 + 26}" text-anchor="middle">${n}</text><line class="g-segment" x1="${36 + (d || 0)}" y1="${k * 34 + 21}" x2="${36 + (d || 0) + l}" y2="${k * 34 + 21}" style="stroke-width:3"/><line class="g-segment" x1="${36 + (d || 0)}" y1="${k * 34 + 15}" x2="${36 + (d || 0)}" y2="${k * 34 + 27}"/><line class="g-segment" x1="${36 + (d || 0) + l}" y1="${k * 34 + 15}" x2="${36 + (d || 0) + l}" y2="${k * 34 + 27}"/>`).join(""));
  // Balance à plateaux : g et d = textes des objets ; pente > 0 si le plateau de gauche descend
  function balance(g, d, pente) {
    const a = pente * 12, yg = 70 + a, yd = 70 - a;
    return svg("balance", 320, 130, `Balance : ${g} à gauche, ${d} à droite`, `<path class="g-segment" d="M160 120 L160 40 M130 120 H190"/><line class="g-segment" x1="70" y1="${r1(40 + a / 2)}" x2="250" y2="${r1(40 - a / 2)}"/><circle class="g-point" cx="160" cy="40" r="5"/>` +
      [[70, yg, g, 40 + a / 2], [250, yd, d, 40 - a / 2]].map(([x, y, t, yh]) => `<line class="g-droite" x1="${x}" y1="${r1(yh)}" x2="${x - 30}" y2="${r1(y)}"/><line class="g-droite" x1="${x}" y1="${r1(yh)}" x2="${x + 30}" y2="${r1(y)}"/><path class="g-rect" d="M${x - 40} ${r1(y)} H${x + 40} L${x + 30} ${r1(y + 12)} H${x - 30} Z"/><text class="g-clabel" x="${x}" y="${r1(y - 6)}" text-anchor="middle">${t}</text>`).join(""));
  }
  FIGURES["cp7-cours-regle"] = () => regle(10, 0, 70, { nom: "7 cm" });
  FIGURES["cp7-cours-regle2"] = () => regle(10, 20, 80, { nom: "?" });
  FIGURES["cp7-cours-balance"] = () => balance("ananas", "citron", 1);
  FIGURES["cp7-qcm-regle"] = () => regle(10, 30, 90);
  FIGURES["cp7-qcm-balance"] = () => balance("noix de coco", "mangue", 1);
  FIGURES["cp7-qcm-segments"] = () => segments([["A", 160, 0], ["B", 210, 0], ["C", 120, 0]]);

  GEN["cp7-mesurer"] = function () {
    if (rand(0, 2) === 0) { // tracer un segment : jusqu'à quelle graduation ?
      const a = pick([0, 0, 1, 2, 3, 4, 5]), l = rand(2, 14), P = prenom();
      return { enonce: `${P.nom} veut tracer un segment de $${l}$ cm. ${P.Il} commence ${a ? `à la graduation $${a}$` : "au $0$"} de sa règle. Jusqu'à quelle graduation doit-${P.il} tracer ?`, mode: "nombre", prefixe: "Jusqu'à", attendu: a + l,
        erreurs: a ? [{ valeur: l, message: `${P.Il} ne part pas du $0$ mais du $${a}$ : il faut avancer de $${l}$ cm à partir de $${a}$.` }, { valeur: a + l - 1, message: "Compte bien les centimètres (les espaces), pas les traits." }] : [{ valeur: l - 1, message: "Compte bien les centimètres (les espaces), pas les traits." }, { valeur: l + 1, message: "Compte bien les centimètres (les espaces), pas les traits." }],
        aides: ["Chaque centimètre est l'espace entre deux nombres de la règle.", a ? `On part de $${a}$ et on avance de $${l}$.` : "En partant du $0$, on s'arrête au nombre de centimètres.", a ? `$${a} + ${l}$.` : `Le segment s'arrête sur le $${l}$.`],
        solution: a ? `$${a} + ${l} = ${a + l}$ : ${P.il} trace jusqu'à la graduation $${a + l}$.` : `Du $0$ au $${l}$, il y a $${l}$ cm : ${P.il} trace jusqu'à $${l}$.` };
    }
    const n = 10, a = rand(0, 1) ? 0 : rand(1, 4), l = rand(2, n - a), b = a + l;
    return { enonce: a ? "Attention, le segment ne commence pas au $0$ de la règle ! Combien mesure-t-il ?" : "Combien mesure le segment posé sur la règle ?", figure: regle(n, 10 * a, 10 * b), mode: "nombre", prefixe: "Il mesure", suffixe: "cm", attendu: l,
      erreurs: a ? [{ valeur: b, message: `Le segment commence à $${a}$, pas à $0$ : compte les centimètres de $${a}$ à $${b}$.` }, { valeur: l + 1, message: "Compte les espaces entre les traits, pas les traits." }] : [{ valeur: l + 1, message: "Compte les espaces entre les traits, pas les traits." }],
      aides: ["Regarde où commence le segment et où il finit sur la règle.", a ? `Il commence à $${a}$ et finit à $${b}$.` : "Il commence au $0$ de la règle.", a ? `Compte les centimètres de $${a}$ à $${b}$ : $${b} - ${a}$.` : `Lis le nombre au bout du segment.`],
      solution: a ? `Le segment va de $${a}$ à $${b}$ : $${b} - ${a} = ${l}$ cm.` : `Le segment part de $0$ et arrive à $${b}$ : il mesure $${l}$ cm.` };
  };
  GEN["cp7-comparer"] = function () {
    const t = rand(0, 1);
    if (t === 0) {
      const ls = E.tirage([90, 110, 130, 150, 170, 190, 210, 230, 250], 3), noms = ["A", "B", "C"], long = rand(0, 1);
      const idx = ls.indexOf(long ? Math.max(...ls) : Math.min(...ls)), dec = rand(0, 1) ? [0, 0, 0] : [rand(0, 40), rand(0, 40), rand(0, 40)];
      const c = melange(noms[idx], noms.concat(["Ils ont tous la même longueur"]));
      return { enonce: `Quel segment est le plus **${long ? "long" : "court"}** ?${dec[0] + dec[1] + dec[2] ? " Attention, ils ne commencent pas au même endroit." : ""}`, figure: segments(ls.map((l, k) => [noms[k], l, dec[k]])), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Compare la longueur des traits, pas l'endroit où ils finissent.", "Tu peux mesurer avec une bande de papier ou ta règle.", `Cherche le plus ${long ? "long" : "court"} des trois.`],
        solution: `Le segment ${noms[idx]} est le plus ${long ? "long" : "court"}.` };
    }
    const objs = E.tirage([["la porte de la classe", 200], ["la table", 70], ["le crayon", 15], ["la trousse", 20], ["le cahier", 30], ["la règle", 30], ["le tableau", 300], ["la gomme", 5], ["le livre", 25], ["le bureau", 120]], 3).filter((o, k, L) => L.findIndex((x) => x[1] === o[1]) === k);
    if (objs.length < 3) return GEN["cp7-comparer"]();
    const long = rand(0, 1), tri = objs.slice().sort((x, y) => x[1] - y[1]), rep = long ? tri[2][0] : tri[0][0];
    const c = melange(Maj2(rep), objs.map((o) => Maj2(o[0])));
    const txt = (o) => o[1] >= 100 ? `$${o[1] / 100 === Math.floor(o[1] / 100) ? o[1] / 100 + "$ m" : o[1] + "$ cm"}` : `$${o[1]}$ cm`;
    return { enonce: `${objs.map((o) => `${Maj2(o[0])} mesure ${txt(o)}`).join(", ")}. Lequel est le plus **${long ? "long" : "court"}** ?`.replace(/, ([A-Z])/g, (m, l) => ", " + l.toLowerCase()), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Exprime toutes les longueurs dans la même unité.", "$1$ m $= 100$ cm.", "Compare ensuite les nombres."],
      solution: `En centimètres : ${objs.map((o) => `${o[0]} $${o[1]}$ cm`).join(", ")}. Le plus ${long ? "long" : "court"} est ${rep}.` };
  };
  const Maj2 = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  GEN["cp7-unites"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const [obj, v, u] = pick([["une trousse", 20, "cm"], ["un crayon", 15, "cm"], ["une gomme", 4, "cm"], ["la porte de la classe", 2, "m"], ["un cahier", 30, "cm"], ["un enfant de CP", 1, "m"], ["une fourmi", 1, "cm"], ["un banga", 3, "m"], ["une feuille de cocotier", 4, "m"], ["une mangue", 12, "cm"], ["un timbre", 3, "cm"], ["une pirogue", 6, "m"]]);
      const bon = `$${v}$ ${u}`, autre = u === "cm" ? "m" : "cm", c = melange(bon, [`$${v}$ ${autre}`, `$${v * 10}$ ${u}`, `$${v * 100}$ ${u}`, v > 1 ? `$1$ ${autre}` : `$${v + 50}$ ${u}`]);
      return { enonce: `Quelle est la longueur la plus probable pour ${obj} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["$1$ cm, c'est à peu près la largeur d'un doigt.", "$1$ m, c'est un grand pas d'adulte, ou $100$ cm.", "Imagine l'objet devant toi."],
        solution: `${Maj2(obj)} mesure environ ${bon}.` };
    }
    if (t === 1) { const k = rand(1, 5), q = rand(0, 1); return q ? { enonce: `Complète : $${k}$ m $=$ … cm`, mode: "nombre", prefixe: "", suffixe: "cm", attendu: 100 * k, erreurs: [{ valeur: 10 * k, message: "$1$ m $= 100$ cm, pas $10$." }, { valeur: k, message: "Le nombre change quand on change d'unité : $1$ m $= 100$ cm." }], aides: ["$1$ m $= 100$ cm.", `$${k}$ m, c'est $${k}$ fois $100$ cm.`, `$${Array(k).fill(100).join(" + ")}$.`], solution: `$1$ m $= 100$ cm, donc $${k}$ m $= ${100 * k}$ cm.` } : { enonce: `Complète : $${100 * k}$ cm $=$ … m`, mode: "nombre", prefixe: "", suffixe: "m", attendu: k, erreurs: [{ valeur: 10 * k, message: "$100$ cm font $1$ m." }, { valeur: 100 * k, message: "On change d'unité : $100$ cm $= 1$ m." }], aides: ["$100$ cm $= 1$ m.", `Combien de fois $100$ dans $${100 * k}$ ?`, `$${Array(k).fill(100).join(" + ")} = ${100 * k}$.`], solution: `$${100 * k}$ cm $= ${k}$ m.` }; }
    const a = rand(10, 90), b = rand(5, 99 - a), P = prenom();
    return { enonce: `${P.nom} met bout à bout deux bâtons : l'un mesure $${a}$ cm, l'autre $${b}$ cm. Quelle longueur obtient-${P.il} ?`, mode: "nombre", prefixe: "Longueur :", suffixe: "cm", attendu: a + b,
      erreurs: [{ valeur: Math.abs(a - b), message: "Bout à bout, les longueurs s'ajoutent." }, { valeur: a + b + 10, message: "Vérifie le calcul des dizaines." }],
      aides: ["Bout à bout : on ajoute les longueurs.", `$${a} + ${b}$.`, "Ajoute les dizaines, puis les unités."],
      solution: `$${a} + ${b} = ${a + b}$ cm.` };
  };
  GEN["cp7-masses"] = function () {
    // masses approximatives en grammes, pour que les comparaisons soient vraisemblables
    const M = { "œuf": 60, "citron": 100, "banane": 150, "trousse": 200, "mangue": 350, "cahier": 250, "ballon": 450, "livre": 600, "ananas": 1200, "papaye": 900, "noix de coco": 1500, "pastèque": 4000 };
    const t = rand(0, 1);
    if (t === 0) {
      const egal = rand(0, 3) === 0;
      let g, d; do { [g, d] = E.tirage(Object.keys(M), 2); } while (!egal && Math.abs(M[g] - M[d]) < 100);
      if (egal) d = g;
      const p = egal ? 0 : M[g] > M[d] ? 1 : -1, rep = p > 0 ? Maj2(leLa(g)) : p < 0 ? Maj2(leLa(d)) : "Ils ont la même masse";
      const c = melange(rep, [Maj2(leLa(g)), Maj2(leLa(d)), "Ils ont la même masse", "On ne peut pas savoir"]);
      return { enonce: egal ? `On a mis ${unUne(g)} de chaque côté. Que montre la balance ?` : "Regarde la balance. Quel objet est le plus lourd ?", figure: balance(g, d, p), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Le plateau le plus lourd descend.", "Si la balance est droite, les deux objets ont la même masse.", "Regarde quel plateau est le plus bas."],
        solution: p ? `Le plateau ${p > 0 ? "de gauche" : "de droite"} descend : ${leLa(p > 0 ? g : d)} est ${fem(p > 0 ? g : d) ? "la plus lourde" : "le plus lourd"}.` : "La balance est droite : les deux objets ont la même masse." };
    }
    let L; do L = E.tirage(Object.keys(M), 3).sort((x, y) => M[y] - M[x]); while (M[L[0]] - M[L[1]] < 100 || M[L[1]] - M[L[2]] < 100);
    const [A, B, C] = L, lourd = rand(0, 1), rep = lourd ? A : C;
    const c = melange(Maj2(leLa(rep)), [Maj2(leLa(A)), Maj2(leLa(B)), Maj2(leLa(C))]);
    const adj = (o) => (lourd ? (fem(o) ? "la plus lourde" : "le plus lourd") : fem(o) ? "la plus légère" : "le plus léger");
    return { enonce: `On pèse avec une balance : ${leLa(A)} est plus lourd${fem(A)} que ${leLa(B)}, et ${leLa(B)} est plus lourd${fem(B)} que ${leLa(C)}. Quel objet est le plus **${lourd ? "lourd" : "léger"}** ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [`Range du plus lourd au plus léger : ${leLa(A)} d'abord.`, `Puis ${leLa(B)}, puis ${leLa(C)}.`, lourd ? "Le plus lourd est le premier." : "Le plus léger est le dernier."],
      solution: `Du plus lourd au plus léger : ${leLa(A)}, ${leLa(B)}, ${leLa(C)}. ${Maj2(leLa(rep))} est ${adj(rep)}.` };
  };
  const unUne = (o) => (FEM.includes(o) ? "une " : "un ") + o;
  const FEM = ["mangue", "noix de coco", "papaye", "banane", "trousse", "pastèque"];
  const leLa = (o) => (/^[aeiouœ]/.test(o) ? "l'" : FEM.includes(o) ? "la " : "le ") + o, fem = (o) => (FEM.includes(o) ? "e" : "");

  /* =====================================================================
     Chapitre 8 : la monnaie (cp8-)
     ===================================================================== */
  const { monnaie } = E;
  const somme = (L) => L.reduce((s, v) => s + v, 0) / 100;
  // Une somme en euros (entiers) faite de billets et de pièces
  function tirerMonnaie(max) {
    const L = [], valeurs = [5000, 2000, 1000, 500, 200, 100];
    let n = rand(2, 6);
    while (n-- > 0) { const v = pick(valeurs); if (somme([...L, v]) <= max) L.push(v); }
    return L.length >= 2 ? L : tirerMonnaie(max);
  }
  FIGURES["cp8-cours-monnaie"] = () => monnaie([1000, 500, 200, 100, 100]);
  FIGURES["cp8-qcm-monnaie"] = () => monnaie([2000, 500, 200, 200]);
  FIGURES["cp8-methode-monnaie"] = () => monnaie([2000, 1000, 500, 200, 100]);

  GEN["cp8-valeur"] = function () {
    const L = tirerMonnaie(99), v = somme(L);
    return { enonce: "Combien d'euros y a-t-il en tout ?", figure: monnaie(L), mode: "nombre", prefixe: "Il y a", suffixe: "euros", attendu: v,
      erreurs: [{ valeur: L.length, message: "On ne compte pas les pièces et les billets : on additionne leurs **valeurs**." }, { valeur: v + 10, message: "Vérifie : additionne d'abord les billets, puis les pièces." }],
      aides: ["Commence par les billets (les plus grosses valeurs).", `Billets : $${L.filter((x) => x >= 500).map((x) => x / 100).join(" + ") || "0"}$.`, `Pièces : $${L.filter((x) => x < 500).map((x) => x / 100).join(" + ") || "0"}$.`],
      solution: `$${L.map((x) => x / 100).join(" + ")} = ${v}$ euros.` };
  };
  GEN["cp8-comparer"] = function () {
    let A, B; do { A = tirerMonnaie(60); B = tirerMonnaie(60); } while (Math.abs(somme(A) - somme(B)) > 15 || (somme(A) === somme(B) && rand(0, 2)));
    const [P1, P2] = E.deux(), a = somme(A), b = somme(B), rep = a > b ? P1.nom : a < b ? P2.nom : "Ils ont autant l'un que l'autre";
    const c = melange(rep, [P1.nom, P2.nom, "Ils ont autant l'un que l'autre", "On ne peut pas savoir"]);
    return { enonce: `${P1.nom} a : ${A.map((x) => `$${x / 100}$ €`).join(", ")}. ${P2.nom} a : ${B.map((x) => `$${x / 100}$ €`).join(", ")}. Qui a le plus d'argent ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Ce n'est pas le nombre de pièces qui compte, c'est leur valeur.", `Calcule ce qu'a ${P1.nom} : $${A.map((x) => x / 100).join(" + ")}$.`, `Calcule ce qu'a ${P2.nom} : $${B.map((x) => x / 100).join(" + ")}$.`],
      solution: `${P1.nom} a $${a}$ € et ${P2.nom} a $${b}$ €. ${a === b ? "Ils ont autant l'un que l'autre." : `C'est ${rep} qui a le plus d'argent.`}` };
  };
  GEN["cp8-payer"] = function () {
    const prix = rand(6, 89), d = Math.floor(prix / 10), u = prix % 10;
    // décomposition juste avec billets de 10 et 5, pièces de 2 et 1
    const juste = []; let r = prix;
    [[50, 5000], [20, 2000], [10, 1000], [5, 500], [2, 200], [1, 100]].forEach(([e, c]) => { while (r >= e) { juste.push(c); r -= e; } });
    const ecr = (L) => L.map((x) => `$${x / 100}$ €`).join(" + ");
    const f1 = juste.slice(); f1[f1.length - 1] === 100 ? f1.pop() : f1.push(100);
    const f2 = juste.map((x) => (x === 1000 ? 100 : x));
    const f3 = juste.slice(); f3.push(200);
    const c = melange(ecr(juste), [ecr(f1), ecr(f2), ecr(f3)].filter((x) => x !== ecr(juste)));
    return { enonce: `Un jouet coûte $${prix}$ €. Avec quelles pièces et quels billets peut-on payer **juste** le prix ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Additionne la valeur de chaque proposition.", `Il faut trouver exactement $${prix}$ €.`, d ? `Les dizaines d'euros ($${10 * d}$ €) peuvent se faire avec des billets.` : "Utilise des pièces de $1$ € et $2$ €."],
      solution: `${ecr(juste)} $= ${prix}$ €.` };
  };
  GEN["cp8-rendre"] = function () {
    const billet = pick([10, 20, 20, 50, 50]), prix = rand(Math.max(2, billet - 25), billet - 1), P = prenom();
    const [qui, ou] = pick([["un ballon", "au magasin"], ["des mangues", "au marché de Mamoudzou"], ["un livre", "à la librairie"], ["un poisson", "au port de Mamoudzou"], ["des brochettes", "au marché"]]);
    return { enonce: `${P.nom} achète ${qui} ${ou} pour $${prix}$ €. ${P.Il} paie avec un billet de $${billet}$ €. Combien la marchande lui rend-elle ?`, figure: monnaie([billet * 100]), mode: "nombre", prefixe: "Elle rend", suffixe: "euros", attendu: billet - prix,
      erreurs: [{ valeur: billet + prix, message: "On rend la différence entre le billet et le prix : c'est une soustraction." }, { valeur: prix, message: "Ça, c'est le prix. On cherche ce qu'on lui rend." }],
      aides: ["La marchande garde le prix et rend le reste.", `Compte de $${prix}$ jusqu'à $${billet}$.`, `$${billet} - ${prix}$.`],
      solution: `$${prix} + ${billet - prix} = ${billet}$, donc elle rend $${billet - prix}$ €.` };
  };

  /* =====================================================================
     Chapitre 9 : lire l'heure (cp9-), heures entières
     ===================================================================== */
  const { horloges } = E;
  const NOM_H = (h) => (h === 12 ? "midi (12 heures)" : `${h} heure${h > 1 ? "s" : ""}`);
  FIGURES["cp9-cours-horloge"] = () => horloges([[3, 0, "3 heures"]]);
  FIGURES["cp9-cours-aiguilles"] = () => horloges([[9, 0, "9 heures"], [12, 0, "midi"]]);
  FIGURES["cp9-qcm-horloge"] = () => horloges([[8, 0, ""]]);
  FIGURES["cp9-qcm-horloges"] = () => horloges([[2, 0, "A"], [10, 0, "B"], [12, 0, "C"]]);

  GEN["cp9-lire"] = function () {
    const t = rand(0, 3);
    if (t === 1) { // placer la petite aiguille
      const h = rand(1, 12), P = prenom();
      return { enonce: `${P.nom} veut montrer ${NOM_H(h)} sur son horloge en carton. La grande aiguille est sur le $12$. Sur quel nombre doit-${P.il} mettre la **petite** aiguille ?`, mode: "nombre", prefixe: "Sur le", attendu: h,
        erreurs: [{ valeur: 12, message: "Le $12$, c'est pour la grande aiguille. La petite montre l'heure." }, { valeur: h === 6 ? 3 : 6, message: "La petite aiguille va sur le nombre de l'heure." }],
        aides: ["La petite aiguille montre les heures.", "Pour une heure juste, la grande aiguille est sur le $12$.", `L'heure est ${NOM_H(h)}.`],
        solution: `Pour ${NOM_H(h)}, la petite aiguille va sur le $${h}$ et la grande sur le $12$.` };
    }
    if (t >= 2) { // plus tard ou plus tôt
      const h = rand(2, 10), k = rand(1, 3), apres = t === 2, r = apres ? h + k : h - k;
      if (r < 1 || r > 12) return GEN["cp9-lire"]();
      return { enonce: `Lis l'heure sur l'horloge. Quelle heure ${apres ? "sera" : "était"}-il ${apres ? "dans" : "il y a"} $${k}$ heure${k > 1 ? "s" : ""} ?`, figure: horloges([[h, 0, ""]]), mode: "nombre", prefixe: apres ? "Il sera" : "Il était", suffixe: "heures", attendu: r,
        erreurs: [{ valeur: h, message: "Ça, c'est l'heure de l'horloge maintenant." }, { valeur: apres ? h - k : h + k, message: apres ? "Plus tard, on avance : on ajoute." : "Avant, on recule : on enlève." }].filter((e) => e.valeur > 0),
        aides: [`L'horloge indique ${NOM_H(h)}.`, apres ? `Avance la petite aiguille de $${k}$ nombre${k > 1 ? "s" : ""}.` : `Recule la petite aiguille de $${k}$ nombre${k > 1 ? "s" : ""}.`, `$${h} ${apres ? "+" : "-"} ${k}$.`],
        solution: `Il est ${NOM_H(h)}. ${apres ? `Dans $${k}$ heure${k > 1 ? "s" : ""}, il sera` : `Il y a $${k}$ heure${k > 1 ? "s" : ""}, il était`} ${NOM_H(r)}.` };
    }
    const h = rand(1, 12);
    return { enonce: "Quelle heure indique l'horloge ? (heures entières)", figure: horloges([[h, 0, ""]]), mode: "nombre", prefixe: "Il est", suffixe: "heures", attendu: h,
      erreurs: [{ valeur: 12, message: "La grande aiguille est sur le $12$ : elle dit seulement que c'est une heure juste. Regarde la **petite** aiguille." }, ...(h !== 6 ? [{ valeur: (h + 6) % 12 || 12, message: "Regarde bien le bout de la petite aiguille." }] : [])],
      aides: ["La petite aiguille montre les heures.", "La grande aiguille est sur le $12$ : c'est une heure juste.", "Lis le nombre que montre la petite aiguille."],
      solution: `La petite aiguille est sur le $${h}$ et la grande sur le $12$ : il est ${NOM_H(h)}.` };
  };
  GEN["cp9-choisir"] = function () {
    const hs = E.tirage([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 3), k = rand(0, 2), noms = ["A", "B", "C"];
    const c = melange(noms[k], [...noms, "Aucune"]);
    return { enonce: `Quelle horloge indique ${NOM_H(hs[k])} ?`, figure: horloges(hs.map((h, i) => [h, 0, noms[i]])), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Regarde la petite aiguille de chaque horloge.", `On cherche la petite aiguille sur le $${hs[k]}$.`, "La grande aiguille est sur le $12$ pour toutes."],
      solution: `L'horloge ${noms[k]} a sa petite aiguille sur le $${hs[k]}$ : elle indique ${NOM_H(hs[k])}.` };
  };
  GEN["cp9-moments"] = function () {
    const t = rand(0, 1), P = prenom();
    if (t === 0) {
      const [act, h, autres] = pick([["se lève pour aller à l'école", "6 h", ["12 h", "9 h du soir", "3 h de l'après-midi"]], ["arrive à l'école le matin", "7 h", ["midi", "8 h du soir", "4 h de l'après-midi"]], ["déjeune à la cantine", "midi", ["7 h du matin", "9 h du soir", "minuit"]], ["se couche le soir", "8 h du soir", ["8 h du matin", "midi", "3 h de l'après-midi"]], ["prend le goûter", "4 h de l'après-midi", ["minuit", "6 h du matin", "midi"]], ["va à la madrassa après l'école", "4 h de l'après-midi", ["minuit", "6 h du matin", "2 h du matin"]]]);
      const c = melange(h, autres);
      return { enonce: `Le plus souvent, à quelle heure ${P.nom} ${act} ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Pense à ta journée : le matin, le midi, l'après-midi, le soir.", "La nuit, on dort.", "Choisis l'heure qui correspond au bon moment de la journée."],
        solution: `${P.nom} ${act} vers ${h}.` };
    }
    const h = rand(1, 10), k = rand(1, 2);
    return { enonce: `L'horloge indique l'heure où ${P.nom} part en randonnée au mont Choungui. La randonnée dure $${k}$ heure${k > 1 ? "s" : ""}. À quelle heure finit-elle ?`, figure: horloges([[h, 0, ""]]), mode: "nombre", prefixe: "À", suffixe: "heures", attendu: h + k,
      erreurs: [{ valeur: h, message: "Ça, c'est l'heure du départ." }, { valeur: h - k, message: "Le temps avance : on ajoute." }].filter((e) => e.valeur > 0),
      aides: [`L'horloge indique ${NOM_H(h)}.`, `On avance de $${k}$ heure${k > 1 ? "s" : ""}.`, `$${h} + ${k}$.`],
      solution: `Départ à ${NOM_H(h)}, $${k}$ heure${k > 1 ? "s" : ""} plus tard : ${NOM_H(h + k)}.` };
  };

  /* =====================================================================
     Chapitre 10 : solides et figures (cp10-)
     ===================================================================== */
  const { solide, solides, formes, quadrillage, fleches, barres } = E;
  const NOM_S = { cube: "un cube", pave: "un pavé", boule: "une boule", cylindre: "un cylindre", cone: "un cône" };
  const NOM_F = { carre: "un carré", rectangle: "un rectangle", triangle: "un triangle", disque: "un disque" };
  FIGURES["cp10-cours-solides"] = () => solides(["cube", "pave", "boule"], ["cube", "pavé", "boule"]);
  FIGURES["cp10-cours-solides2"] = () => solides(["cylindre", "cone"], ["cylindre", "cône"]);
  FIGURES["cp10-cours-formes"] = () => formes([{ type: "carre", nom: "carré" }, { type: "rectangle", nom: "rectangle" }, { type: "triangle", nom: "triangle" }, { type: "disque", nom: "disque" }]);
  FIGURES["cp10-qcm-cylindre"] = () => solide("cylindre");
  FIGURES["cp10-qcm-pave"] = () => solide("pave");
  FIGURES["cp10-qcm-formes"] = () => formes([{ type: "triangle", nom: "A" }, { type: "carre", nom: "B" }, { type: "disque", nom: "C" }]);
  // Quatre points, trois alignés (A, B, C, D mélangés)
  function pointsAlignes() {
    const noms = E.tirage(["A", "B", "C", "D"], 4), x0 = rand(30, 70), y0 = rand(50, 110), dx = rand(50, 70), dy = rand(-20, 20);
    const P = [[x0, y0], [x0 + dx, y0 + dy], [x0 + 2 * dx + rand(-5, 5) * 0, y0 + 2 * dy]];
    let hors; do hors = [rand(40, 280), rand(20, 140)]; while (Math.abs((hors[1] - y0) * dx - (hors[0] - x0) * dy) < 2500);
    const pts = [...P, hors];
    const s = pts.map(([x, y], k) => `<path class="g-segment" d="M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10" style="stroke-width:2"/><text class="g-clabel" x="${x + 9}" y="${y - 8}">${noms[k]}</text>`).join("");
    return { fig: svg("points", 320, 160, "Quatre points", s), alignes: noms.slice(0, 3).sort(), seul: noms[3] };
  }
  FIGURES["cp10-cours-alignes"] = () => svg("points", 320, 120, "Points A, B, C alignés et D", [[40, 90, "A"], [130, 70, "B"], [220, 50, "C"], [150, 105, "D"]].map(([x, y, n]) => `<path class="g-segment" d="M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10" style="stroke-width:2"/><text class="g-clabel" x="${x + 9}" y="${y - 8}">${n}</text>`).join("") + `<line class="g-guide" x1="20" y1="94" x2="300" y2="32"/>`);

  GEN["cp10-solides"] = function () {
    const t = rand(0, 3), types = Object.keys(NOM_S);
    if (t === 2) { // lequel est un … ? (trois solides)
      const L = E.tirage(types, 3), k = rand(0, 2), noms = ["A", "B", "C"], c = melange(noms[k], [...noms, "Aucun"]);
      return { enonce: `Lequel de ces solides est ${NOM_S[L[k]]} ?`, figure: solides(L), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Regarde chaque solide l'un après l'autre.", { cube: "Le cube a des faces carrées.", pave: "Le pavé a des faces rectangles.", boule: "La boule est toute ronde.", cylindre: "Le cylindre a deux disques.", cone: "Le cône a une pointe." }[L[k]], "Élimine ceux qui ne vont pas."],
        solution: `Le solide ${noms[k]} est ${NOM_S[L[k]]}.` };
    }
    if (t === 3) { // combien roulent ?
      const L = E.tirage(types, rand(3, 4)), n = L.filter((x) => ["boule", "cylindre", "cone"].includes(x)).length;
      return { enonce: "Parmi ces solides, combien peuvent **rouler** ?", figure: solides(L), mode: "nombre", prefixe: "", suffixe: "solides", attendu: n,
        erreurs: [{ valeur: L.length, message: "Le cube et le pavé ne roulent pas : leurs faces sont plates." }, { valeur: L.filter((x) => x === "boule").length, message: "La boule roule, mais le cylindre et le cône aussi." }],
        aides: ["Un solide roule s'il a une partie arrondie.", "La boule, le cylindre et le cône roulent.", "Le cube et le pavé ne roulent pas."],
        solution: `Ceux qui roulent : ${L.filter((x) => ["boule", "cylindre", "cone"].includes(x)).map((x) => NOM_S[x]).join(", ") || "aucun"}. Il y en a $${n}$.` };
    }
    if (t === 0) {
      const ty = pick(types), c = melange(Maj2(NOM_S[ty]), types.map((x) => Maj2(NOM_S[x])));
      return { enonce: "Comment s'appelle ce solide ?", figure: solide(ty), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Regarde s'il roule (boule, cylindre, cône) ou s'il a des faces plates partout (cube, pavé).", { cube: "Toutes ses faces sont des carrés pareils.", pave: "Ses faces sont des rectangles.", boule: "Il est tout rond.", cylindre: "Il a deux disques et roule.", cone: "Il a une pointe et un disque." }[ty], "Compare avec le cours."],
        solution: `C'est ${NOM_S[ty]}.` };
    }
    const [obj, ty] = pick([["un dé à jouer", "cube"], ["une boîte à chaussures", "pave"], ["un ballon de foot", "boule"], ["une boîte de conserve", "cylindre"], ["un cornet de glace", "cone"], ["une brique de lait", "pave"], ["une orange", "boule"], ["un rouleau d'essuie-tout", "cylindre"], ["un chapeau de clown", "cone"], ["un carton de déménagement", "pave"], ["un glaçon", "cube"], ["une bille", "boule"], ["une bougie", "cylindre"], ["une boîte de mouchoirs", "pave"], ["une boule de pétanque", "boule"], ["un tube de colle", "cylindre"], ["un morceau de sucre", "cube"], ["une boîte de céréales", "pave"], ["un entonnoir à l'envers", "cone"], ["un verre droit", "cylindre"]]);
    const c = melange(Maj2(NOM_S[ty]), types.map((x) => Maj2(NOM_S[x])));
    return { enonce: `${Maj2(obj)} a la forme de quel solide ?`, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Imagine l'objet dans ta main.", "Est-ce qu'il roule ? A-t-il une pointe ? Des faces plates ?", "Compare avec les solides du cours."],
      solution: `${Maj2(obj)} a la forme d'${NOM_S[ty]}.` };
  };
  GEN["cp10-faces"] = function () {
    const t = rand(0, 4);
    if (t === 4) { // quelle figure a k côtés ?
      const T = { triangle: 3, carre: 4, pentagone: 5, hexagone: 6, disque: 0 }, L = E.tirage(Object.keys(T), 3), k = rand(0, 2), noms = ["A", "B", "C"];
      const c = melange(noms[k], [...noms, "Aucune"]), nbC = T[L[k]];
      return { enonce: nbC ? `Quelle figure a $${nbC}$ côtés ?` : "Quelle figure n'a aucun côté ?", figure: formes(L.map((ty, i) => ({ type: ty, nom: noms[i] }))), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Compte les côtés de chaque figure en faisant le tour avec ton doigt.", "Un côté est un trait droit du bord.", "Un disque n'a pas de côté."],
        solution: `La figure ${noms[k]} ${nbC ? `a $${nbC}$ côtés` : "est un disque : elle n'a pas de côté"}.` };
    }
    if (t <= 1) {
      const ty = t ? "cube" : "pave", q = rand(0, 1);
      if (q) return { enonce: `Combien de faces a ${NOM_S[ty]} ?`, figure: solide(ty), mode: "nombre", prefixe: "Il a", suffixe: "faces", attendu: 6,
        erreurs: [{ valeur: 3, message: "Sur le dessin, on ne voit que $3$ faces : les autres sont cachées derrière." }, { valeur: 4, message: "N'oublie pas la face du dessus et celle du dessous." }],
        aides: ["Compte les faces que tu vois, puis celles qui sont cachées.", "Devant, derrière, à gauche, à droite…", "… et dessus, dessous."],
        solution: `${Maj2(NOM_S[ty])} a $6$ faces : devant, derrière, gauche, droite, dessus et dessous.` };
      const bon = ty === "cube" ? "des carrés tous pareils" : "des rectangles (ou des rectangles et des carrés)";
      const c = melange(bon, ["des triangles", "des disques", ty === "cube" ? "des rectangles pas carrés" : "seulement des triangles", "des ronds et des carrés"]);
      return { enonce: `Les faces d'${NOM_S[ty].slice(3)} sont :`, figure: solide(ty), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Regarde la forme de chaque face.", ty === "cube" ? "Toutes les faces du cube sont pareilles." : "Les faces du pavé sont allongées.", "Une face est une surface plate."],
        solution: `Les faces d'${NOM_S[ty].slice(3)} sont ${bon}.` };
    }
    const [ty, cotes] = pick([["triangle", 3], ["carre", 4], ["rectangle", 4], ["pentagone", 5], ["hexagone", 6]]), q = rand(0, 1);
    return { enonce: `Combien de ${q ? "sommets" : "côtés"} a cette figure ?`, figure: formes([{ type: ty }]), mode: "nombre", prefixe: "Elle a", suffixe: q ? "sommets" : "côtés", attendu: cotes,
      erreurs: [{ valeur: cotes - 1, message: "Recompte en mettant un doigt sur chaque " + (q ? "sommet (coin)." : "côté (trait).") }, { valeur: cotes + 1, message: "Tu as compté un " + (q ? "sommet" : "côté") + " deux fois." }],
      aides: [q ? "Un sommet, c'est un coin de la figure." : "Un côté, c'est un trait droit du bord.", "Pars d'un endroit et fais le tour en comptant.", "Une figure a autant de sommets que de côtés."],
      solution: `Cette figure a $${cotes}$ côtés et $${cotes}$ sommets.` };
  };
  GEN["cp10-figures"] = function () {
    const t = rand(0, 2);
    if (t === 0) {
      const ty = pick(Object.keys(NOM_F)), c = melange(Maj2(NOM_F[ty]), Object.keys(NOM_F).map((x) => Maj2(NOM_F[x])));
      return { enonce: "Comment s'appelle cette figure ?", figure: formes([{ type: ty }]), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Compte les côtés.", "Regarde si les côtés ont la même longueur.", { carre: "$4$ côtés de la même longueur.", rectangle: "$4$ côtés, deux longs et deux courts.", triangle: "$3$ côtés.", disque: "Pas de côté : c'est rond." }[ty]],
        solution: `C'est ${NOM_F[ty]}.` };
    }
    if (t === 1) {
      const L = E.tirage(["carre", "rectangle", "triangle", "disque"], 3), noms = ["A", "B", "C"], k = rand(0, 2);
      const c = melange(noms[k], [...noms, "Aucune"]);
      return { enonce: `Quelle figure est ${NOM_F[L[k]]} ?`, figure: formes(L.map((ty, i) => ({ type: ty, nom: noms[i] }))), mode: "choix", choix: c.choix, attendu: c.attendu,
        aides: ["Regarde chaque figure et compte ses côtés.", { carre: "Un carré a $4$ côtés de même longueur.", rectangle: "Un rectangle a $4$ côtés : deux longs, deux courts.", triangle: "Un triangle a $3$ côtés.", disque: "Un disque est tout rond." }[L[k]], "Élimine les figures qui ne vont pas."],
        solution: `La figure ${noms[k]} est ${NOM_F[L[k]]}.` };
    }
    const A = pointsAlignes(), bon = A.alignes.join(", "), toutes = [["A", "B", "C"], ["A", "B", "D"], ["A", "C", "D"], ["B", "C", "D"]].map((x) => x.join(", "));
    const c = melange(bon, toutes);
    return { enonce: "Quels sont les trois points alignés (on peut les relier avec une règle sur une même ligne droite) ?", figure: A.fig, mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Pose ta règle sur deux points.", "Regarde si un troisième point est aussi le long de la règle.", `Un des quatre points n'est pas sur la ligne.`],
      solution: `Les points ${bon} sont alignés. Le point ${A.seul} n'est pas sur la même ligne droite.` };
  };

  /* =====================================================================
     Chapitre 11 : se repérer et se déplacer (cp11-)
     ===================================================================== */
  const SYMB = ["★", "●", "▲", "■", "♥", "◆"];
  const VOC = { d: "à droite du", g: "à gauche du", h: "au-dessus du", b: "en dessous du" };
  FIGURES["cp11-cours-positions"] = () => quadrillage(5, 3, { objets: [[2, 1, "★"], [3, 1, "●"], [1, 1, "▲"], [2, 0, "■"], [2, 2, "♥"]] });
  FIGURES["cp11-cours-chemin"] = () => quadrillage(6, 4, { depart: [0, 3], chemin: "ddhhd", objets: [[3, 1, "A"]] });
  FIGURES["cp11-qcm-chemin"] = () => quadrillage(6, 4, { depart: [0, 3], objets: [[2, 1, "A"], [3, 0, "B"], [4, 3, "C"]] });

  GEN["cp11-positions"] = function () {
    const n = 5, m = 4, cells = E.tirage(Array.from({ length: n * m }, (_, k) => [k % n, Math.floor(k / n)]), 5), sym = E.tirage(SYMB, 5);
    const objets = cells.map(([c, l], k) => [c, l, sym[k]]);
    // une relation vraie : on cherche deux objets voisins
    const paires = [];
    objets.forEach((a) => objets.forEach((b) => { if (a === b) return; const dc = b[0] - a[0], dl = b[1] - a[1]; const dir = dc === 1 && !dl ? "d" : dc === -1 && !dl ? "g" : !dc && dl === -1 ? "h" : !dc && dl === 1 ? "b" : null; if (dir) paires.push([a, b, dir]); }));
    if (!paires.length) return GEN["cp11-positions"]();
    const [a, b, dir] = pick(paires), c = melange(b[2], [...sym, "Rien"]);
    return { enonce: `Quelle forme est juste **${VOC[dir]}** ${a[2]} ?`.replace(" du ★", " de l'étoile ★").replace(" du ●", " du rond ●").replace(" du ▲", " du triangle ▲").replace(" du ■", " du carré ■").replace(" du ♥", " du cœur ♥").replace(" du ◆", " du losange ◆"), figure: quadrillage(n, m, { objets }), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: [`Trouve d'abord ${a[2]} sur le quadrillage.`, { d: "La droite, c'est le côté de ta main droite.", g: "À gauche, c'est du côté de ta main gauche.", h: "Au-dessus, c'est la case juste en haut.", b: "En dessous, c'est la case juste en bas." }[dir], "Regarde la case collée, juste à côté."],
      solution: `Juste ${VOC[dir]} ${a[2]}, il y a ${b[2]}.`.replace(" du ★", " de l'étoile").replace(" du ●", " du rond").replace(" du ▲", " du triangle").replace(" du ■", " du carré").replace(" du ♥", " du cœur").replace(" du ◆", " du losange") };
  };
  // Un chemin au hasard qui reste dans le quadrillage n × m
  function cheminHasard(n, m, k) {
    for (let essai = 0; essai < 50; essai++) {
      let c = rand(0, n - 1), l = rand(0, m - 1); const dep = [c, l]; let ch = "", ok = true;
      for (let i = 0; i < k; i++) {
        const opts = ["h", "b", "g", "d"].filter((d) => { const nc = c + (d === "d") - (d === "g"), nl = l + (d === "b") - (d === "h"); return nc >= 0 && nc < n && nl >= 0 && nl < m && !(ch.slice(-1) === { h: "b", b: "h", g: "d", d: "g" }[d]); });
        if (!opts.length) { ok = false; break; }
        const d = pick(opts); ch += d; c += (d === "d") - (d === "g"); l += (d === "b") - (d === "h");
      }
      if (ok && (c !== dep[0] || l !== dep[1])) return { dep, ch, fin: [c, l] };
    }
    return cheminHasard(n, m, k);
  }
  GEN["cp11-chemin"] = function () {
    const n = 6, m = 4, C = cheminHasard(n, m, rand(3, 6)), noms = ["A", "B", "C", "D"];
    const autres = [];
    while (autres.length < 3) { const p = [rand(0, n - 1), rand(0, m - 1)]; if ((p[0] !== C.fin[0] || p[1] !== C.fin[1]) && (p[0] !== C.dep[0] || p[1] !== C.dep[1]) && !autres.some((q) => q[0] === p[0] && q[1] === p[1])) autres.push(p); }
    const k = rand(0, 3), places = [...autres]; places.splice(k, 0, C.fin);
    const c = melange(noms[k], noms);
    return { enonce: `Le robot part du point rond et suit le code ${fleches(C.ch)} (une flèche = une case). Sur quelle lettre arrive-t-il ?`, figure: quadrillage(n, m, { depart: C.dep, objets: places.map((p, i) => [p[0], p[1], noms[i]]) }), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Pose ton doigt sur le point rond.", "Avance d'une case pour chaque flèche, dans le sens de la flèche.", "Suis les flèches dans l'ordre, de gauche à droite."],
      solution: `En suivant ${fleches(C.ch)} case par case, le robot arrive sur ${noms[k]}.`, figureSolution: quadrillage(n, m, { depart: C.dep, chemin: C.ch, objets: places.map((p, i) => [p[0], p[1], noms[i]]) }) };
  };
  GEN["cp11-coder"] = function () {
    const n = 6, m = 4, C = cheminHasard(n, m, rand(3, 5)), inv = { h: "b", b: "h", g: "d", d: "g" };
    const f1 = C.ch.split("").map((d) => inv[d]).join(""), f2 = C.ch.slice(0, -1), f3 = C.ch + C.ch.slice(-1), f4 = C.ch.split("").reverse().join("");
    const c = melange(fleches(C.ch), [f1, f2, f3, f4].filter((x) => x !== C.ch).map(fleches));
    return { enonce: "Le trait montre le chemin du robot depuis le point rond. Quel code décrit ce chemin ?", figure: quadrillage(n, m, { depart: C.dep, chemin: C.ch }), mode: "choix", choix: c.choix, attendu: c.attendu,
      aides: ["Pars du point rond.", "Pour chaque case traversée, écris la flèche du sens dans lequel tu vas.", `Le chemin fait $${C.ch.length}$ cases.`],
      solution: `Le code est ${fleches(C.ch)}.` };
  };
  GEN["cp11-rang"] = function () {
    const L = E.tirage(E.PRENOMS.map((p) => p[0]), 4), t = rand(0, 2), k = rand(0, 3);
    const lieu = pick(["sur un banc de la cour", "sur la photo de classe", "devant le tableau", "dans la pirogue"]);
    const intro = `${L.join(", ")} sont ${lieu}, dans cet ordre de **gauche à droite**.`;
    if (t === 0) { if (k === 3) return GEN["cp11-rang"](); const c = melange(L[k + 1], [...L, "Personne"]); return { enonce: `${intro} Qui est juste à droite de ${L[k]} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["On lit les prénoms de gauche à droite, comme dans un livre.", `Trouve ${L[k]} dans la liste.`, "Celui qui est juste à droite est le prénom suivant."], solution: `Juste à droite de ${L[k]}, il y a ${L[k + 1]}.` }; }
    if (t === 1) { if (k === 0) return GEN["cp11-rang"](); const c = melange(L[k - 1], [...L, "Personne"]); return { enonce: `${intro} Qui est juste à gauche de ${L[k]} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["On lit les prénoms de gauche à droite.", `Trouve ${L[k]} dans la liste.`, "Celui qui est juste à gauche est le prénom d'avant."], solution: `Juste à gauche de ${L[k]}, il y a ${L[k - 1]}.` }; }
    const j = rand(1, 2), c = melange(L[j], [...L, "Personne"]);
    return { enonce: `${intro} Qui est entre ${L[j - 1]} et ${L[j + 1]} ?`, mode: "choix", choix: c.choix, attendu: c.attendu, aides: ["Entre deux enfants, c'est au milieu.", `Trouve ${L[j - 1]} et ${L[j + 1]}.`, "Regarde qui est au milieu."], solution: `Entre ${L[j - 1]} et ${L[j + 1]}, il y a ${L[j]}.` };
  };

  /* =====================================================================
     Chapitre 12 : tableaux et diagrammes (cp12-)
     ===================================================================== */
  const TX = (t) => "\\text{" + t + "}";
  const ENQUETES = [
    ["Fruit préféré", ["mangue", "banane", "papaye", "ananas", "litchi"]],
    ["Animal préféré", ["maki", "tortue", "dauphin", "chat", "zébu"]],
    ["Moyen de venir à l'école", ["à pied", "en bus", "en voiture", "à vélo"]],
    ["Sport préféré", ["foot", "basket", "natation", "course"]],
    ["Couleur préférée", ["rouge", "bleu", "vert", "jaune", "violet"]]
  ];
  function enquete() {
    const [titre, cats0] = pick(ENQUETES), k = rand(3, Math.min(5, cats0.length)), cats = E.tirage(cats0, k);
    const vals = []; while (vals.length < k) { const v = rand(1, 12); if (!vals.includes(v)) vals.push(v); }
    return { titre, cats, vals, tot: vals.reduce((s, v) => s + v, 0) };
  }
  const tableHTML = (L) => `<div class="scroll-x"><table class="valeurs croise">${L.map((l, i) => `<tr>${l.map((v, j) => (i === 0 || j === 0 ? `<th>${v}</th>` : `<td>${v}</td>`)).join("")}</tr>`).join("")}</table></div>`;
  FIGURES["cp12-cours-tableau"] = () => tableHTML([["Fruit", "orange", "fraise", "banane", "kiwi"], ["Élèves", 4, 12, 8, 2]]);
  FIGURES["cp12-cours-double"] = () => tableHTML([["", "à pied", "en bus", "en voiture"], ["Filles", 7, 5, 2], ["Garçons", 6, 4, 3]]);
  FIGURES["cp12-cours-barres"] =() => barres([["orange", 4], ["fraise", 12], ["banane", 8], ["kiwi", 2]], 2, "élèves");
  FIGURES["cp12-qcm-barres"] = () => barres([["mangue", 9], ["banane", 5], ["papaye", 7]], 1, "élèves");

  GEN["cp12-tableau"] = function () {
    const Q = enquete(), t = rand(0, 2), i = rand(0, Q.cats.length - 1);
    const tab = { lignes: [[TX(Q.titre), ...Q.cats.map(TX)], [TX("Élèves"), ...Q.vals.map(String)]] };
    if (t === 0) return { enonce: `La classe a fait une enquête. Combien d'élèves ont choisi « ${Q.cats[i]} » ?`, tableau: tab, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: Q.vals[i], erreurs: [{ valeur: Q.tot, message: "On demande une seule case, pas le total." }, { valeur: Q.vals[(i + 1) % Q.vals.length], message: "Tu as lu la case d'à côté : regarde bien la bonne colonne." }], aides: [`Cherche « ${Q.cats[i]} » dans la première ligne.`, "Descends dans la même colonne.", "Lis le nombre d'élèves."], solution: `Sous « ${Q.cats[i]} », on lit $${Q.vals[i]}$ élèves.` };
    if (t === 1) return { enonce: "Combien d'élèves ont répondu à l'enquête en tout ?", tableau: tab, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: Q.tot, erreurs: [{ valeur: Q.cats.length, message: "On ne compte pas les colonnes : on additionne les nombres d'élèves." }, { valeur: Math.max(...Q.vals), message: "Il faut additionner tous les nombres." }], aides: ["Il faut additionner tous les nombres d'élèves.", `$${Q.vals.join(" + ")}$.`, "Ajoute-les un par un."], solution: `$${Q.vals.join(" + ")} = ${Q.tot}$ élèves.` };
    let j; do j = rand(0, Q.cats.length - 1); while (j === i);
    const [a, b] = Q.vals[i] > Q.vals[j] ? [i, j] : [j, i];
    return { enonce: `Combien d'élèves de plus ont choisi « ${Q.cats[a]} » que « ${Q.cats[b]} » ?`, tableau: tab, mode: "nombre", prefixe: "", suffixe: "élèves de plus", attendu: Q.vals[a] - Q.vals[b], erreurs: [{ valeur: Q.vals[a] + Q.vals[b], message: "On cherche l'écart : c'est une soustraction." }, { valeur: Q.vals[a], message: "Il faut comparer avec l'autre colonne." }], aides: [`« ${Q.cats[a]} » : $${Q.vals[a]}$ élèves.`, `« ${Q.cats[b]} » : $${Q.vals[b]}$ élèves.`, `$${Q.vals[a]} - ${Q.vals[b]}$.`], solution: `$${Q.vals[a]} - ${Q.vals[b]} = ${Q.vals[a] - Q.vals[b]}$ élèves de plus.` };
  };
  GEN["cp12-diagramme"] = function () {
    const Q = enquete(), t = rand(0, 2), fig = barres(Q.cats.map((c, k) => [c, Q.vals[k]]), 2, "élèves");
    if (t === 0) { const i = rand(0, Q.cats.length - 1); return { enonce: `${Q.titre} : combien d'élèves ont choisi « ${Q.cats[i]} » ?`, figure: fig, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: Q.vals[i], erreurs: [{ valeur: Q.vals[i] + 1, message: "Regarde bien la ligne qui passe au bout de la barre." }, { valeur: Q.vals[i] - 1, message: "Regarde bien la ligne qui passe au bout de la barre." }], aides: [`Trouve la barre « ${Q.cats[i]} ».`, "Suis le haut de la barre jusqu'aux nombres à gauche.", "Les lignes vont de $2$ en $2$ : une barre peut s'arrêter entre deux lignes."], solution: `La barre « ${Q.cats[i]} » monte jusqu'à $${Q.vals[i]}$.` }; }
    if (t === 1) { const plus = rand(0, 1), v = plus ? Math.max(...Q.vals) : Math.min(...Q.vals), rep = Q.cats[Q.vals.indexOf(v)], c = melange(rep, Q.cats); return { enonce: `${Q.titre} : quel choix a été le **${plus ? "plus" : "moins"}** choisi ?`, figure: fig, mode: "choix", choix: c.choix, attendu: c.attendu, aides: [`Cherche la barre la plus ${plus ? "haute" : "basse"}.`, "Compare la hauteur des barres.", "Lis le nom sous cette barre."], solution: `La barre la plus ${plus ? "haute" : "basse"} est « ${rep} » ($${v}$ élèves).` }; }
    return { enonce: `${Q.titre} : combien d'élèves ont répondu en tout ?`, figure: fig, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: Q.tot, erreurs: [{ valeur: Q.cats.length, message: "On additionne les hauteurs des barres, pas le nombre de barres." }, { valeur: Math.max(...Q.vals), message: "Il faut additionner toutes les barres." }], aides: ["Lis la valeur de chaque barre.", `$${Q.vals.join(" + ")}$.`, "Ajoute-les une par une."], solution: `$${Q.vals.join(" + ")} = ${Q.tot}$ élèves.` };
  };
  GEN["cp12-double"] = function () {
    const [titre, cats0] = pick(ENQUETES), cats = E.tirage(cats0, 3), V = [cats.map(() => rand(1, 9)), cats.map(() => rand(1, 9))];
    const tab = { lignes: [["", ...cats.map(TX)], [TX("Filles"), ...V[0].map(String)], [TX("Garçons"), ...V[1].map(String)]] };
    const t = rand(0, 1), g = rand(0, 1), j = rand(0, 2), qui = g ? "garçons" : "filles";
    if (t === 0) return { enonce: `${titre}. Combien de **${qui}** ont choisi « ${cats[j]} » ?`, tableau: tab, mode: "nombre", prefixe: "", suffixe: qui, attendu: V[g][j], erreurs: [{ valeur: V[1 - g][j], message: `Ça, c'est la case des ${g ? "filles" : "garçons"}.` }, { valeur: V[0][j] + V[1][j], message: `On demande seulement les ${qui}.` }].filter((e) => e.valeur !== V[g][j]), aides: [`Trouve la ligne des ${qui}.`, `Trouve la colonne « ${cats[j]} ».`, "Lis la case où elles se croisent."], solution: `Ligne « ${Maj2(qui)} », colonne « ${cats[j]} » : $${V[g][j]}$.` };
    return { enonce: `${titre}. Combien d'élèves (filles et garçons) ont choisi « ${cats[j]} » ?`, tableau: tab, mode: "nombre", prefixe: "", suffixe: "élèves", attendu: V[0][j] + V[1][j], erreurs: [{ valeur: V[0][j], message: "N'oublie pas les garçons." }, { valeur: V[1][j], message: "N'oublie pas les filles." }].filter((e) => e.valeur !== V[0][j] + V[1][j]), aides: [`Trouve la colonne « ${cats[j]} ».`, `Filles : $${V[0][j]}$. Garçons : $${V[1][j]}$.`, `$${V[0][j]} + ${V[1][j]}$.`], solution: `$${V[0][j]} + ${V[1][j]} = ${V[0][j] + V[1][j]}$ élèves.` };
  };

  // Erreurs de calcul fréquentes (une dizaine de trop ou de moins) dans les problèmes et le calcul mental
  ["cp6-parties", "cp6-deux-etapes", "cp5-dizaines", "cp5-procedures"].forEach((t) => {
    const g = GEN[t];
    GEN[t] = (i) => {
      const q = g(i);
      q.erreurs = [...(q.erreurs || []), ...[10, -10].map((k) => ({ valeur: q.attendu + k, message: "Erreur de calcul : vérifie le chiffre des dizaines (pense aux retenues)." })).filter((e) => e.valeur >= 0)];
      return q;
    };
  });

  elisions(/^cp\d+-/);
})();
