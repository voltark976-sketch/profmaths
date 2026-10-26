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
          solution: `$${10 * d} = ${Array(d).fill(10).join(" + ")}$ : il y a $${d}$ dizaines.` }
        : { enonce: `Combien font $${d}$ dizaines ?`, mode: "nombre", prefixe: "Cela fait", attendu: 10 * d,
          erreurs: [{ valeur: d, message: "Chaque dizaine vaut $10$." }, { valeur: d + 10, message: `Ce n'est pas $${d} + 10$ : c'est $${d}$ fois $10$.` }],
          aides: ["Une dizaine, c'est $10$.", "Compte de $10$ en $10$.", `$${Array.from({ length: d }, (_, k) => 10 * (k + 1)).join(", ")}$.`],
          solution: `$${d}$ dizaines, c'est $${Array(d).fill(10).join(" + ")} = ${10 * d}$.` };
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

  elisions(/^cp\d+-/);
})();
