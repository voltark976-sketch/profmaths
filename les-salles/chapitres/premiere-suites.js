// =====================================================================
//  LES SALLES · Première spécialité · Chapitre 1 : Suites numériques
// =====================================================================
//  Chargé par chapitre.html?c=premiere-suites (voir js/chapitre.js).
//  Même format que niveaux/niveaux.js (lire son en-tête), avec trois ajouts :
//   - capsule  : la leçon d'une stèle { titre, texte, exemple }, affichée
//                seule à la première ouverture, avant le combat ;
//   - les exercices sont TIRÉS AU SORT à chaque entrée dans une salle :
//                dans « steles » et « bonus », chaque manche donne le nom
//                d'un générateur (liste GEN ci-dessous), par exemple
//                manches: ["explicite-affine", "explicite-carre", ...] ;
//   - les formules s'écrivent entre $…$ (KaTeX), le code entre `…`,
//                **gras**, \n pour aller à la ligne, « - » pour une puce.
//  Les plans des salles sont ceux de la version Seconde : seuls les
//  textes, les exercices et les couleurs changent.
//  Règles : chaque générateur donne au moins 29 questions différentes
//  (vérifié par outils/salles-verifier.js) ; aucune réponse en fraction
//  non décimale ; aucune question à deux choix.
// =====================================================================

// Les couleurs du chapitre (elles remplacent celles de style.css) :
// un temple au bord du lagon, turquoise au lieu de l'or.
var COULEURS_CHAPITRE = {
  "--fond": "#0d1716",
  "--panneau": "#132422",
  "--bordure": "#2f5550",
  "--texte": "#e6f1ec",
  "--texte-doux": "#9fbdb4",
  "--or": "#5fd0bd",
  "--or-sombre": "#2a8a7b",
  "--parchemin": "#f2ecd8"
};
(function () {
  for (var k in COULEURS_CHAPITRE) document.documentElement.style.setProperty(k, COULEURS_CHAPITRE[k]);
  var acc = document.getElementById("titre-accroche");
  if (acc) acc.textContent = "Première spécialité · Suites numériques. Chaque stèle t'apprend un morceau du chapitre, puis te met à l'épreuve : résous ses exercices pour ouvrir les portes du temple.";
})();

var CHAPITRES = (function () {

  // ---------------------------------------------------------------
  //  Petits outils
  // ---------------------------------------------------------------
  function ent(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function pioche(t) { return t[Math.floor(Math.random() * t.length)]; }
  function nonNul(a, b) { var x; do { x = ent(a, b); } while (x === 0); return x; }
  function arr(x) { return Math.round(x * 1e6) / 1e6; }
  // Un nombre écrit pour KaTeX : virgule décimale {,} et espace des milliers
  function f(x) {
    x = arr(x);
    var neg = x < 0, t = String(Math.abs(x)).split(".");
    var e = t[0].length > 4 ? t[0].replace(/\B(?=(\d{3})+(?!\d))/g, "\\,") : t[0];
    return (neg ? "-" : "") + e + (t[1] ? "{,}" + t[1] : "");
  }
  function p(x) { return x < 0 ? "(" + f(x) + ")" : f(x); }   // entre parenthèses s'il est négatif
  function M(s) { return "$" + s + "$"; }
  // Un polynôme en n : pol([[3, "n^2"], [-2, "n"], [1, ""]]) donne « 3n^2 - 2n + 1 »
  function pol(termes, v) {
    var s = "";
    termes.forEach(function (t) {
      var c = t[0], x = t[1].replace(/n/g, v || "n");
      if (c === 0) return;
      var a = Math.abs(c), part = (a === 1 && x ? "" : f(a)) + x;
      s += s === "" ? (c < 0 ? "-" : "") + part : (c < 0 ? " - " : " + ") + part;
    });
    return s || "0";
  }
  // Le même polynôme où n est remplacé par k : « 3 \times 4^2 - 2 \times 4 + 1 »
  function subs(termes, k) {
    var s = "";
    termes.forEach(function (t) {
      var c = t[0], x = t[1];
      if (c === 0) return;
      var a = Math.abs(c);
      var val = x === "" ? f(a) : (x === "n^2" ? (a === 1 ? "" : f(a) + " \\times ") + k + "^2" : (a === 1 ? "" : f(a) + " \\times ") + k);
      s += s === "" ? (c < 0 ? "-" : "") + val : (c < 0 ? " - " : " + ") + val;
    });
    return s;
  }
  function val(termes, k) {
    return termes.reduce(function (s, t) { return s + t[0] * (t[1] === "n^2" ? k * k : t[1] === "n" ? k : 1); }, 0);
  }
  function plus(c) { return c < 0 ? " - " + f(-c) : " + " + f(c); }   // « + 3 » ou « - 3 »
  function fois(b, x) { return b === -1 ? "-" + p(x) : b + " \\times " + p(x); }   // b × x, et « -x » si b = -1
  function pct(t) { return f(t) + "\\,\\%"; }
  function q(titre, enonce, reponse, indice, explication, autres) {
    var e = { titre: titre, enonce: enonce, reponse: arr(reponse), indice: indice, explication: explication };
    for (var k in autres || {}) e[k] = autres[k];
    return e;
  }
  // Une liste Python écrite en code
  function lst(t) { return "[" + t.join(", ") + "]"; }

  // ---------------------------------------------------------------
  //  LES GÉNÉRATEURS : un nom → une question tirée au sort
  // ---------------------------------------------------------------
  var GEN = {

    // ----- Formule explicite -----
    "explicite-affine": function () {
      var a = nonNul(-9, 9), b = ent(-20, 20), k = ent(4, 25), T = [[a, "n"], [b, ""]];
      return q("Formule explicite",
        "La suite $(u_n)$ est définie pour tout entier naturel $n$ par " + M("u_n = " + pol(T)) + ". Calcule " + M("u_{" + k + "}") + ".",
        val(T, k), "Remplace $n$ par " + M(k) + " dans la formule.",
        M("u_{" + k + "} = " + subs(T, k) + " = " + f(val(T, k))) + ".");
    },
    "explicite-carre": function () {
      var a = pioche([1, 2, 3, -1, -2]), b = ent(-6, 6), c = ent(-9, 9), k = ent(2, 9);
      var T = [[a, "n^2"], [b, "n"], [c, ""]];
      return q("Formule explicite",
        "Pour tout entier naturel $n$, " + M("u_n = " + pol(T)) + ". Calcule " + M("u_{" + k + "}") + ".",
        val(T, k), "Remplace chaque $n$ par " + M(k) + ". Calcule le carré en premier : " + M(k + "^2 = " + k * k) + ".",
        M("u_{" + k + "} = " + subs(T, k) + " = " + f(val(T, k))) + ".");
    },
    "explicite-puissance": function () {
      var base = pioche([2, 3]), a = pioche([1, 2, 3, 5]), b = nonNul(-10, 10);
      var k = base === 2 ? ent(3, 9) : ent(2, 6), r = a * Math.pow(base, k) + b;
      var form = (a === 1 ? "" : a + " \\times ") + base + "^n" + plus(b);
      return q("Formule explicite",
        "Pour tout entier naturel $n$, " + M("u_n = " + form) + ". Calcule " + M("u_{" + k + "}") + ".",
        r, "Attention : " + M(base + "^{" + k + "}") + " n'est pas " + M(base + " \\times " + k) + ". Ici " + M(base + "^{" + k + "} = " + f(Math.pow(base, k))) + ".",
        M("u_{" + k + "} = " + (a === 1 ? "" : a + " \\times ") + base + "^{" + k + "}" + plus(b) + " = " + (a === 1 ? "" : a + " \\times ") + f(Math.pow(base, k)) + plus(b) + " = " + f(r)) + ".");
    },
    "u-n-plus-1": function () {
      var a = nonNul(-9, 9), b = nonNul(-12, 12);
      if (a === 1 || a === -1) a = 4;
      return q("Le terme suivant",
        "Pour tout $n$, " + M("u_n = " + pol([[a, "n"], [b, ""]])) + ". On peut écrire " + M("u_{n+1} = " + pol([[a, "n"]]) + " + c") + ". Quelle est la valeur de $c$ ?",
        a + b, "Remplace $n$ par $n + 1$ : " + M("u_{n+1} = " + a + "(n + 1)" + plus(b)) + ", puis développe.",
        M("u_{n+1} = " + a + "(n + 1)" + plus(b) + " = " + pol([[a, "n"], [a + b, ""]])) + ", donc " + M("c = " + f(a + b)) + ". Ne confonds pas avec " + M("u_n + 1 = " + pol([[a, "n"], [b + 1, ""]])) + ".");
    },
    "u-n-plus-1-carre": function () {
      var b = nonNul(-15, 15), a = pioche([1, 2, 3]);
      // u_n = a n^2 + b ; u_{n+1} = a n^2 + 2a n + (a + b)
      return q("Le terme suivant",
        "Pour tout $n$, " + M("u_n = " + pol([[a, "n^2"], [b, ""]])) + ". En développant, " + M("u_{n+1} = " + pol([[a, "n^2"], [2 * a, "n"]]) + " + c") + ". Quelle est la valeur de $c$ ?",
        a + b, "Remplace $n$ par $n + 1$, puis utilise " + M("(n + 1)^2 = n^2 + 2n + 1") + ".",
        M("u_{n+1} = " + (a === 1 ? "" : a) + "(n + 1)^2" + plus(b) + " = " + pol([[a, "n^2"], [2 * a, "n"], [a, ""]]) + plus(b)) + ", donc " + M("c = " + f(a + b)) + ".");
    },
    "rang-explicite": function () {
      var a = nonNul(-9, 9), b = ent(-30, 30), n = ent(5, 30);
      if (a === 1 || a === -1) a = 3;
      var v = a * n + b;
      return q("Trouver un rang",
        "Pour tout $n$, " + M("u_n = " + pol([[a, "n"], [b, ""]])) + ". Pour quel entier $n$ a-t-on " + M("u_n = " + f(v)) + " ?",
        n, "Résous l'équation " + M(pol([[a, "n"], [b, ""]]) + " = " + f(v)) + ".",
        M(pol([[a, "n"], [b, ""]]) + " = " + f(v)) + " donne " + M(f(a) + "n = " + f(v - b)) + ", donc " + M("n = " + n) + " : c'est " + M("u_{" + n + "}") + ".");
    },

    // ----- Relation de récurrence -----
    "rec-affine": function () {
      var u0 = ent(-5, 10), b = pioche([2, 3, -2, -1]), c = nonNul(-6, 6);
      var u1 = b * u0 + c, u2 = b * u1 + c;
      var rel = "u_{n+1} = " + (b === -1 ? "-" : b) + "u_n" + plus(c);
      return q("De proche en proche",
        "On donne " + M("u_0 = " + f(u0)) + " et, pour tout $n$, " + M(rel) + ". Calcule " + M("u_2") + ".",
        u2, "Calcule d'abord " + M("u_1") + " avec $n = 0$, puis " + M("u_2") + " avec $n = 1$.",
        M("u_1 = " + fois(b, u0) + plus(c) + " = " + f(u1)) + ", puis " + M("u_2 = " + fois(b, u1) + plus(c) + " = " + f(u2)) + ".");
    },
    "rec-affine3": function () {
      var u0 = ent(1, 9), b = pioche([2, -1]), c = nonNul(-5, 5);
      var u = [u0];
      for (var i = 0; i < 3; i++) u.push(b * u[i] + c);
      var rel = "u_{n+1} = " + (b === -1 ? "-" : b) + "u_n" + plus(c);
      return q("De proche en proche",
        "On donne " + M("u_0 = " + u0) + " et, pour tout $n$, " + M(rel) + ". Calcule " + M("u_3") + ".",
        u[3], "Trois étapes : " + M("u_0 \\to u_1 \\to u_2 \\to u_3") + ".",
        M("u_1 = " + f(u[1])) + ", " + M("u_2 = " + f(u[2])) + ", " + M("u_3 = " + fois(b, u[2]) + plus(c) + " = " + f(u[3])) + ".");
    },
    "rec-avec-n": function () {
      var u0 = ent(-4, 8), a = pioche([1, 2, 3]), c = ent(-3, 5), k = pioche([3, 4]);
      var u = [u0];
      for (var i = 0; i < k; i++) u.push(u[i] + a * i + c);
      var rel = "u_{n+1} = u_n + " + pol([[a, "n"], [c, ""]]);
      var etapes = [];
      for (var j = 1; j <= k; j++) etapes.push(M("u_{" + j + "} = " + f(u[j - 1]) + (a * (j - 1) + c < 0 ? " - " + f(-(a * (j - 1) + c)) : " + " + f(a * (j - 1) + c)) + " = " + f(u[j])));
      return q("Récurrence avec n",
        "On donne " + M("u_0 = " + f(u0)) + " et, pour tout $n$, " + M(rel) + ". Calcule " + M("u_{" + k + "}") + ".",
        u[k], "Pour calculer " + M("u_1") + ", prends $n = 0$ : on ajoute " + M(f(c)) + ". Pour " + M("u_2") + ", prends $n = 1$…",
        etapes.join(" ; ") + ".");
    },
    "rec-fib": function () {
      var a = ent(1, 9), b = ent(1, 9), k = pioche([5, 6]);
      var u = [a, b];
      for (var i = 2; i <= k; i++) u.push(u[i - 1] + u[i - 2]);
      return q("Les lapins de Fibonacci",
        "On donne " + M("u_0 = " + a) + ", " + M("u_1 = " + b) + " et, pour tout $n$, " + M("u_{n+2} = u_{n+1} + u_n") + ". Calcule " + M("u_{" + k + "}") + ".",
        u[k], "Chaque terme est la somme des deux précédents : " + M("u_2 = " + b + " + " + a + " = " + u[2]) + ".",
        "Les termes : " + M(u.slice(0, k + 1).join(" \\,;\\, ")) + ". Donc " + M("u_{" + k + "} = " + u[k]) + ".");
    },
    "rec-inverse": function () {
      var b = pioche([2, 3, 4]), c = nonNul(-9, 9), w = ent(-8, 15), k = ent(2, 9), v = b * w + c;
      return q("Remonter le temps",
        "Pour tout $n$, " + M("u_{n+1} = " + b + "u_n" + plus(c)) + ". On sait que " + M("u_{" + (k + 1) + "} = " + f(v)) + ". Calcule " + M("u_{" + k + "}") + ".",
        w, "Écris " + M("u_{" + (k + 1) + "} = " + b + "u_{" + k + "}" + plus(c)) + " et résous l'équation d'inconnue " + M("u_{" + k + "}") + ".",
        M(b + "u_{" + k + "}" + plus(c) + " = " + f(v)) + " donne " + M(b + "u_{" + k + "} = " + f(v - c)) + ", donc " + M("u_{" + k + "} = " + f(w)) + ".");
    },
    // La passerelle de la salle de Fibonacci mesure 6 cases : la réponse est toujours 6.
    "rec-rang-6": function () {
      var u0 = ent(-10, 20), r = ent(2, 9), v = u0 + 6 * r;
      return q("La passerelle",
        "On donne " + M("u_0 = " + f(u0)) + " et, pour tout $n$, " + M("u_{n+1} = u_n + " + r) + ". À quel rang $n$ a-t-on " + M("u_n = " + f(v)) + " ? (La passerelle mesurera $n$ cases.)",
        6, "On ajoute " + M(r) + " à chaque étape. Combien d'étapes pour passer de " + M(f(u0)) + " à " + M(f(v)) + " ?",
        "De " + M(f(u0)) + " à " + M(f(v)) + ", on a ajouté " + M(f(v - u0) + " = 6 \\times " + r) + " : il a fallu 6 étapes, donc " + M("u_6 = " + f(v)) + ".",
        { effet: "passerelle" });
    },

    // ----- Motifs et modélisation -----
    "motif-allumettes": function () {
      var P = pioche([[3, "triangles"], [4, "carrés"], [5, "pentagones"], [6, "hexagones"]]), k = ent(8, 40);
      var c = P[0] - 1, u = function (n) { return c * n + 1; };
      return q("Un motif d'allumettes",
        "On aligne des " + P[1] + " faits d'allumettes ; deux voisins partagent une allumette. Il faut " + M(u(1)) + ", " + M(u(2)) + " puis " + M(u(3)) + " allumettes pour " + M(1) + ", " + M(2) + " puis " + M(3) + " " + P[1] + ". On note " + M("u_n") + " le nombre d'allumettes pour $n$ " + P[1] + ". Calcule " + M("u_{" + k + "}") + ".",
        u(k), "À chaque " + P[1].replace(/s$/, "") + " ajouté, combien d'allumettes en plus ? Cherche une formule " + M("u_n = an + b") + ".",
        "On ajoute " + M(c) + " allumettes à chaque fois et " + M("u_1 = " + u(1)) + " : " + M("u_n = " + c + "n + 1") + ", donc " + M("u_{" + k + "} = " + c + " \\times " + k + " + 1 = " + u(k)) + ".");
    },
    "motif-figures": function () {
      var F = pioche([
        ["galets en triangle", function (n) { return n * (n + 1) / 2; }, "\\dfrac{n(n + 1)}{2}"],
        ["galets en carré", function (n) { return n * n; }, "n^2"],
        ["galets en rectangle ($n$ rangées de $n + 1$)", function (n) { return n * (n + 1); }, "n(n + 1)"]
      ]), k = ent(6, 30);
      return q("Nombres figurés",
        "Un motif de " + F[0] + " compte " + M(F[1](1)) + ", " + M(F[1](2)) + ", " + M(F[1](3)) + ", " + M(F[1](4)) + "… galets aux étapes " + M("1, 2, 3, 4") + ". Avec " + M("u_n = " + F[2]) + ", combien de galets à l'étape " + M(k) + " ?",
        F[1](k), "Vérifie la formule sur les premières étapes, puis remplace $n$ par " + M(k) + ".",
        M("u_{" + k + "} = " + F[2].replace(/n/g, String(k)).replace("\\dfrac{" + k, "\\dfrac{" + k) + " = " + F[1](k)) + ".");
    },
    "motif-ajout": function () {
      var F = pioche([
        ["en triangle", function (n) { return n * (n + 1) / 2; }, "n + 1", function (n) { return n + 1; }],
        ["en carré", function (n) { return n * n; }, "2n + 1", function (n) { return 2 * n + 1; }],
        ["en rectangle", function (n) { return n * (n + 1); }, "2n + 2", function (n) { return 2 * n + 2; }]
      ]), k = ent(5, 30);
      return q("D'une étape à la suivante",
        "Dans le motif de galets " + F[0] + " (" + M(F[1](1)) + ", " + M(F[1](2)) + ", " + M(F[1](3)) + ", " + M(F[1](4)) + "…), on passe de l'étape $n$ à l'étape $n + 1$ en ajoutant " + M(F[2]) + " galets : " + M("u_{n+1} = u_n + " + F[2]) + ". On sait que " + M("u_{" + k + "} = " + F[1](k)) + ". Calcule " + M("u_{" + (k + 1) + "}") + ".",
        F[1](k + 1), "Prends $n = " + k + "$ dans la relation de récurrence.",
        M("u_{" + (k + 1) + "} = u_{" + k + "} + " + F[2].replace("n", "\\times " + k).replace(/^\\times /, "").replace(/^(\d) \\times/, "$1 \\times") + " = " + F[1](k) + " + " + F[3](k) + " = " + F[1](k + 1)) + ".");
    },
    "modele-coef": function () {
      var C = pioche([["Le stock de vanille d'une coopérative", "kg", "on en récolte"], ["Une population de makis", "makis", "il en naît"],
        ["Le nombre d'abonnés d'un club de plongée", "abonnés", "il en arrive"], ["Le stock d'eau d'une citerne", "litres", "la pluie en apporte"]]);
      var hausse = Math.random() < 0.5, t = pioche([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40]), c = ent(2, 30) * 5;
      var a = hausse ? 1 + t / 100 : 1 - t / 100;
      return q("Traduire l'énoncé",
        C[0] + " " + (hausse ? "augmente" : "baisse") + " de " + M(pct(t)) + " chaque mois, puis " + C[2] + " " + M(c) + ". On note " + M("u_n") + " cette quantité, en " + C[1] + ", au bout de $n$ mois : " + M("u_{n+1} = a\\,u_n + b") + ". Quelle est la valeur de $a$ ? (réponse en écriture décimale)",
        a, (hausse ? "Augmenter" : "Baisser") + " de " + M(pct(t)) + ", c'est multiplier par " + M("1 " + (hausse ? "+" : "-") + " \\dfrac{" + t + "}{100}") + ".",
        M("u_{n+1} = " + f(a) + "\\,u_n + " + c) + " : " + M("a = " + f(a)) + " et " + M("b = " + c) + ".");
    },
    "modele-u1": function () {
      var C = pioche([["Un club de plongée", "membres"], ["Une réserve", "tortues"], ["Une association", "bénévoles"], ["Une coopérative", "producteurs"]]);
      var u0 = ent(2, 20) * 100, t = pioche([10, 20, 50]), c = ent(1, 9) * 10, perte = Math.random() < 0.5;
      var u1 = u0 * (1 + t / 100) + (perte ? -c : c);
      return q("Traduire l'énoncé",
        C[0] + " compte " + M("u_0 = " + f(u0)) + " " + C[1] + ". Chaque année, ce nombre augmente de " + M(pct(t)) + ", puis " + M(c) + " " + C[1] + (perte ? " partent" : " arrivent en plus") + ". Calcule " + M("u_1") + ".",
        u1, "D'abord la hausse de " + M(pct(t)) + " (multiplier par " + M(f(1 + t / 100)) + "), ensuite " + (perte ? "on retire " : "on ajoute ") + M(c) + ".",
        M("u_1 = " + f(1 + t / 100) + " \\times " + f(u0) + (perte ? " - " : " + ") + c + " = " + f(u1)) + ".");
    },
    "modele-u2": function () {
      var C = pioche([["Un club de plongée", "membres"], ["Une réserve", "tortues"], ["Une association", "bénévoles"], ["Une coopérative", "producteurs"]]);
      var u0 = ent(2, 20) * 100, t = pioche([10, 20, 50]), c = ent(1, 9) * 10, perte = Math.random() < 0.5;
      var k = 1 + t / 100, d = perte ? -c : c, u1 = u0 * k + d, u2 = u1 * k + d;
      return q("Traduire l'énoncé",
        C[0] + " compte " + M("u_0 = " + f(u0)) + " " + C[1] + ". Chaque année, ce nombre augmente de " + M(pct(t)) + ", puis " + M(c) + " " + C[1] + (perte ? " partent" : " arrivent en plus") + ". Calcule " + M("u_2") + ".",
        u2, "La relation : " + M("u_{n+1} = " + f(k) + "\\,u_n" + plus(d)) + ". Calcule " + M("u_1") + ", puis " + M("u_2") + ".",
        M("u_1 = " + f(k) + " \\times " + f(u0) + plus(d) + " = " + f(u1)) + ", puis " + M("u_2 = " + f(k) + " \\times " + f(u1) + plus(d) + " = " + f(u2)) + ".");
    },

    // ----- Sens de variation -----
    "diff-valeur": function () {
      var a = pioche([1, 2, 3, -1, -2]), b = ent(-9, 9), k = ent(2, 12), T = [[a, "n^2"], [b, "n"]];
      var d = val(T, k + 1) - val(T, k);
      return q("Comparer deux termes",
        "Pour tout $n$, " + M("u_n = " + pol(T)) + ". Calcule " + M("u_{" + (k + 1) + "} - u_{" + k + "}") + ".",
        d, "Calcule séparément " + M("u_{" + (k + 1) + "}") + " et " + M("u_{" + k + "}") + ", puis fais la différence.",
        M("u_{" + (k + 1) + "} = " + f(val(T, k + 1))) + " et " + M("u_{" + k + "} = " + f(val(T, k))) + ", donc la différence vaut " + M(f(d)) + (d > 0 ? " : la suite monte entre ces deux rangs." : d < 0 ? " : la suite descend entre ces deux rangs." : "."));
    },
    "diff-quadra": function () {
      var a = nonNul(-9, 9), b = ent(-9, 9), T = [[1, "n^2"], [a, "n"], [b, ""]];
      return q("Le signe de la différence",
        "Pour tout $n$, " + M("u_n = " + pol(T)) + ". On peut écrire " + M("u_{n+1} - u_n = 2n + c") + ". Quelle est la valeur de $c$ ?",
        1 + a, "Développe " + M("u_{n+1} = (n + 1)^2" + (a < 0 ? " - " + f(-a) : " + " + f(a)) + "(n + 1)" + plus(b)) + " puis retire " + M("u_n") + ".",
        M("u_{n+1} - u_n = (n + 1)^2 - n^2" + (a < 0 ? " - " + f(-a) : " + " + f(a)) + " = 2n + 1" + plus(a) + " = " + pol([[2, "n"], [1 + a, ""]])) + ", donc " + M("c = " + f(1 + a)) + ".");
    },
    "rang-croissante": function () {
      var a = ent(4, 30), b = ent(-9, 9), T = [[1, "n^2"], [-a, "n"], [b, ""]], N = Math.ceil((a - 1) / 2);
      return q("À partir de quel rang ?",
        "Pour tout $n$, " + M("u_n = " + pol(T)) + ", et " + M("u_{n+1} - u_n = 2n + 1 - " + a) + ". Quel est le plus petit entier $N$ tel que " + M("u_{n+1} \\geqslant u_n") + " pour tout " + M("n \\geqslant N") + " ?",
        N, "Résous " + M("2n + 1 - " + a + " \\geqslant 0") + " : $n$ doit être un entier.",
        M("2n + 1 - " + a + " \\geqslant 0 \\iff 2n \\geqslant " + (a - 1) + " \\iff n \\geqslant " + f((a - 1) / 2)) + ". Le plus petit entier qui convient est " + M(N) + " : la suite est croissante à partir du rang " + M(N) + ".");
    },
    "variation-compte": function () {
      var a = ent(4, 30), b = ent(-9, 9), T = [[1, "n^2"], [-a, "n"], [b, ""]], nb = Math.ceil((a - 1) / 2);
      return q("Combien de descentes ?",
        "Pour tout $n$, " + M("u_n = " + pol(T)) + ". Pour combien d'entiers naturels $n$ a-t-on " + M("u_{n+1} < u_n") + " ?",
        nb, "Calcule " + M("u_{n+1} - u_n") + " : tu dois trouver " + M("2n + 1 - " + a) + ". Quand est-ce strictement négatif ?",
        M("u_{n+1} - u_n = 2n + 1 - " + a + " < 0 \\iff n < " + f((a - 1) / 2)) + ". Les entiers qui conviennent vont de " + M(0) + " à " + M(nb - 1) + " : il y en a " + M(nb) + ".");
    },
    "contre-exemple": function () {
      var u = [ent(-5, 10)], j = ent(1, 5);
      for (var i = 1; i <= 6; i++) u.push(i === j + 1 ? u[i - 1] - ent(1, 6) : u[i - 1] + ent(1, 7));
      var premier = -1;
      for (var n = 0; n < 6; n++) if (premier < 0 && u[n + 1] < u[n]) premier = n;
      return q("Un contre-exemple",
        "Les premiers termes d'une suite sont, de " + M("u_0") + " à " + M("u_6") + " : " + M(u.map(f).join(" \\,;\\, ")) + ". La suite n'est pas croissante. Quel est le plus petit $n$ tel que " + M("u_{n+1} < u_n") + " ?",
        premier, "Compare chaque terme au suivant, en partant de " + M("u_0") + ".",
        M("u_{" + (premier + 1) + "} = " + f(u[premier + 1]) + " < u_{" + premier + "} = " + f(u[premier])) + " : c'est le contre-exemple, donc $n = " + premier + "$. Un seul contre-exemple suffit pour prouver que la suite n'est pas croissante.");
    },

    // ----- Limites -----
    "limite-inverse": function () {
      var c = ent(-9, 12), d = nonNul(-9, 9), forme = pioche(["n + 1", "n^2 + 1", "2n + 1"]);
      return q("Conjecturer une limite",
        "Pour tout $n$, " + M("u_n = " + f(c) + (d < 0 ? " - " : " + ") + "\\dfrac{" + Math.abs(d) + "}{" + forme + "}") + ". Quand $n$ devient très grand, les termes se rapprochent d'un nombre $\\ell$. Lequel ?",
        c, "Que devient " + M("\\dfrac{" + Math.abs(d) + "}{" + forme + "}") + " quand le dénominateur devient énorme ?",
        M("\\dfrac{" + Math.abs(d) + "}{" + forme + "}") + " se rapproche de " + M(0) + ", donc " + M("u_n") + " se rapproche de " + M("\\ell = " + f(c)) + ".");
    },
    "limite-geom": function () {
      var c = ent(-8, 15), k = nonNul(-9, 9), r = pioche(["0{,}5", "0{,}8", "0{,}9", "0{,}2"]);
      return q("Conjecturer une limite",
        "Pour tout $n$, " + M("u_n = " + f(c) + (k < 0 ? " - " : " + ") + (Math.abs(k) === 1 ? "" : Math.abs(k) + " \\times ") + r + "^n") + ". Vers quel nombre $\\ell$ les termes semblent-ils se rapprocher ?",
        c, "Calcule " + M(r + "^{10}") + " ou " + M(r + "^{50}") + " à la calculatrice : que remarques-tu ?",
        "Comme " + M("0 < " + r + " < 1") + ", " + M(r + "^n") + " se rapproche de " + M(0) + " : on conjecture " + M("\\ell = " + f(c)) + ".");
    },
    "terme-loin": function () {
      var c = ent(1, 9), d = ent(1, 9);
      return q("Un terme très loin",
        "Pour tout $n$, " + M("u_n = " + c + " - \\dfrac{" + d + "}{n + 1}") + ". Calcule " + M("u_{99}") + " (réponse en écriture décimale).",
        c - d / 100, "Pour $n = 99$, le dénominateur vaut " + M(100) + ".",
        M("u_{99} = " + c + " - \\dfrac{" + d + "}{100} = " + f(c - d / 100)) + " : on est déjà tout près de " + M(c) + ", la limite.");
    },
    "limite-quotient": function () {
      var a = nonNul(-9, 9), b = ent(-9, 9), c = ent(1, 9);
      return q("Limite d'un quotient",
        "Pour tout $n$, " + M("u_n = \\dfrac{" + pol([[a, "n"], [b, ""]]) + "}{n + " + c + "}") + ". Vers quel nombre $\\ell$ les termes semblent-ils se rapprocher ?",
        a, "Pour $n$ très grand, les nombres " + M(f(b)) + " et " + M(c) + " comptent peu : " + M("u_n") + " ressemble à " + M("\\dfrac{" + pol([[a, "n"]]) + "}{n}") + ".",
        "Pour $n$ très grand, " + M("u_n \\approx \\dfrac{" + pol([[a, "n"]]) + "}{n} = " + f(a)) + ". On conjecture " + M("\\ell = " + f(a)) + " (essaie " + M("u_{1000}") + " à la calculatrice).");
    },
    "limite-quotient-k": function () {
      var k = pioche([2, 4, 5]), a = nonNul(-12, 12), b = ent(1, 9), c = ent(1, 9);
      if (a % k === 0) a += 1;
      return q("Limite d'un quotient",
        "Pour tout $n$, " + M("u_n = \\dfrac{" + pol([[a, "n"], [b, ""]]) + "}{" + k + "n + " + c + "}") + ". Vers quel nombre $\\ell$ les termes semblent-ils se rapprocher ? (réponse en écriture décimale)",
        a / k, "Pour $n$ très grand, " + M("u_n") + " ressemble à " + M("\\dfrac{" + pol([[a, "n"]]) + "}{" + k + "n}") + ".",
        M("u_n \\approx \\dfrac{" + pol([[a, "n"]]) + "}{" + k + "n} = \\dfrac{" + a + "}{" + k + "} = " + f(a / k)) + ". On conjecture " + M("\\ell = " + f(a / k)) + ".");
    },
    "seuil-limite": function () {
      var c = ent(-5, 9), d = ent(1, 9), E = pioche([[0.5, 2], [0.2, 5], [0.1, 10], [0.05, 20], [0.01, 100]]), N = d * E[1];
      return q("Assez près de la limite",
        "Pour tout $n$, " + M("u_n = " + f(c) + " + \\dfrac{" + d + "}{n + 1}") + ". Quel est le plus petit entier $n$ tel que " + M("u_n < " + f(c + E[0])) + " ?",
        N, "Il faut " + M("\\dfrac{" + d + "}{n + 1} < " + f(E[0])) + ", c'est-à-dire " + M("n + 1 > " + f(d / E[0])) + ".",
        M("\\dfrac{" + d + "}{n + 1} < " + f(E[0]) + " \\iff n + 1 > " + f(d / E[0]) + " \\iff n > " + f(d / E[0] - 1)) + ". Le plus petit entier est " + M(N) + ".");
    },
    // La stèle d'Hermès de la salle de Zénon
    "zenon": function () {
      var D; do { D = ent(20, 1500); } while ((D & (D - 1)) === 0);
      var n = Math.floor(Math.log(D) / Math.LN2) + 1;
      return q("Le paradoxe de Zénon",
        "Achille est à " + M(f(D)) + " m de l'arbre. À chaque étape, il parcourt la moitié de la distance qui lui reste : après $n$ étapes, il reste " + M("u_n = \\dfrac{" + f(D) + "}{2^n}") + " m. Au bout de combien d'étapes reste-t-il, pour la première fois, moins de " + M(1) + " m ?",
        n, "Il faut " + M("2^n > " + f(D)) + ". Liste les puissances de $2$ : " + M("2, 4, 8, 16, 32, 64, 128\\dots") + ".",
        M("2^{" + (n - 1) + "} = " + f(Math.pow(2, n - 1)) + " \\leqslant " + f(D)) + " mais " + M("2^{" + n + "} = " + f(Math.pow(2, n)) + " > " + f(D)) + " : il faut " + M(n) + " étapes. La distance se rapproche de $0$ sans jamais l'atteindre.",
        { figure: "double" });
    },

    // ----- Python -----
    "py-indice": function () {
      var L = [], k = pioche([0, 1, 2, 3, 4, 5, -1, -2]);
      for (var i = 0; i < 6; i++) L.push(ent(-20, 60));
      var rep = L[k < 0 ? 6 + k : k];
      return q("Lire une liste",
        "En Python : `L = " + lst(L) + "`. Que vaut `L[" + k + "]` ?",
        rep, k < 0 ? "Les indices négatifs comptent depuis la fin : `L[-1]` est le dernier élément." : "Les indices commencent à $0$ : `L[0]` est le premier élément.",
        "`L[" + k + "]` est " + (k < 0 ? "le " + (k === -1 ? "dernier" : "avant-dernier") + " élément" : "l'élément d'indice " + k + ", le " + (k + 1) + (k === 0 ? "er" : "e")) + " de la liste : " + M(f(rep)) + ".");
    },
    "py-comprehension": function () {
      var a = nonNul(-5, 9), b = ent(-9, 9), m = ent(4, 12), j = pioche(["-1", "2", "3"]);
      var idx = j === "-1" ? m - 1 : Number(j), rep = a * idx + b;
      var expr = (a === 1 ? "" : a + " * ") + "k" + (b < 0 ? " - " + (-b) : b > 0 ? " + " + b : "");
      return q("Liste en compréhension",
        "En Python : `L = [" + expr + " for k in range(" + m + ")]`. Que vaut `L[" + j + "]` ?",
        rep, "`range(" + m + ")` donne $k$ de $0$ à " + M(m - 1) + ". " + (j === "-1" ? "Le dernier élément correspond à " + M("k = " + (m - 1)) + "." : "`L[" + j + "]` correspond à " + M("k = " + j) + "."),
        "Pour " + M("k = " + idx) + " : " + M((a === 1 ? "" : a + " \\times ") + idx + (b < 0 ? " - " + (-b) : b > 0 ? " + " + b : "") + " = " + f(rep)) + ".");
    },
    "py-filtre": function () {
      var N = ent(15, 60), d = ent(2, 9), n = Math.ceil(N / d);
      return q("Filtrer une liste",
        "En Python : `M = [k for k in range(" + N + ") if k % " + d + " == 0]`. Combien d'éléments contient `M` ?",
        n, "`M` garde les multiples de " + M(d) + " compris entre $0$ et " + M(N - 1) + ". N'oublie pas $0$.",
        "Les multiples de " + M(d) + " de $0$ à " + M(N - 1) + " sont " + M("0, " + d + ", " + 2 * d + ", \\dots, " + d * (n - 1)) + " : il y en a " + M(n) + ".");
    },
    "py-append": function () {
      var u0 = ent(1, 9), a = pioche([2, 3, -1]), c = nonNul(-5, 5), m = pioche([3, 4]);
      var L = [u0];
      for (var i = 0; i < m; i++) L.push(a * L[L.length - 1] + c);
      var expr = (a === -1 ? "-L[-1]" : a + " * L[-1]") + (c < 0 ? " - " + (-c) : " + " + c);
      return q("Une suite en Python",
        "On exécute :\n`L = [" + u0 + "]`\n`for i in range(" + m + "):`\n`    L.append(" + expr + ")`\nQue vaut `L[-1]` à la fin ?",
        L[m], "La boucle tourne " + M(m) + " fois et ajoute à chaque tour le terme suivant : c'est " + M("u_{n+1} = " + (a === -1 ? "-" : a) + "u_n" + plus(c)) + ".",
        "`L` vaut `" + lst(L) + "` : le dernier élément est " + M(f(L[m])) + ".");
    },
    "py-fibo": function () {
      var a = ent(1, 6), b = ent(1, 6), m = ent(3, 6), F = [a, b];
      for (var i = 0; i < m; i++) F.push(F[F.length - 1] + F[F.length - 2]);
      return q("Fibonacci en Python",
        "On exécute :\n`F = [" + a + ", " + b + "]`\n`for i in range(" + m + "):`\n`    F.append(F[-1] + F[-2])`\nQue vaut `F[-1]` à la fin ?",
        F[F.length - 1], "Chaque tour ajoute la somme des deux derniers éléments. La boucle tourne " + M(m) + " fois.",
        "`F` vaut `" + lst(F) + "` : le dernier élément est " + M(F[F.length - 1]) + ".");
    },
    "py-seuil": function () {
      var u0 = ent(-10, 20), r = ent(2, 9), S = u0 + ent(15, 80), n = Math.ceil((S - u0) / r);
      return q("Une boucle « tant que »",
        "On exécute :\n`u = " + u0 + "`\n`n = 0`\n`while u < " + S + ":`\n`    u = u + " + r + "`\n`    n = n + 1`\nQue vaut `n` à la fin ?",
        n, "La boucle s'arrête dès que " + M("u \\geqslant " + S) + ". Cherche le plus petit $n$ tel que " + M(u0 + " + " + r + "n \\geqslant " + S) + ".",
        "Après $n$ tours, " + M("u = " + f(u0) + " + " + r + "n") + ". " + M(f(u0) + " + " + r + " \\times " + (n - 1) + " = " + f(u0 + r * (n - 1)) + " < " + S) + " mais " + M(f(u0) + " + " + r + " \\times " + n + " = " + f(u0 + r * n) + " \\geqslant " + S) + " : $n = " + n + "$.");
    },

    // ----- Automatismes (stèles d'or) -----
    "auto-coef": function () {
      var hausse = Math.random() < 0.5, t = ent(1, 60);
      return q("Coefficient multiplicateur",
        (hausse ? "Augmenter" : "Baisser") + " une quantité de " + M(pct(t)) + " revient à la multiplier par quel nombre ?",
        hausse ? 1 + t / 100 : 1 - t / 100, M("1 " + (hausse ? "+" : "-") + " \\dfrac{" + t + "}{100}") + ".",
        M("1 " + (hausse ? "+" : "-") + " " + f(t / 100) + " = " + f(hausse ? 1 + t / 100 : 1 - t / 100)) + ".");
    },
    "auto-pourcent": function () {
      var t = pioche([5, 10, 15, 20, 25, 30, 40, 50, 75]), N = ent(1, 20) * 20;
      return q("Pourcentage",
        "Calcule " + M(pct(t)) + " de " + M(N) + ".",
        N * t / 100, M(pct(t) + " = \\dfrac{" + t + "}{100}") + " : multiplie " + M(N) + " par " + M(f(t / 100)) + ".",
        M(f(t / 100) + " \\times " + N + " = " + f(N * t / 100)) + ".");
    },
    "auto-puissance": function () {
      var c = pioche([[2, 3, 10], [3, 2, 6], [4, 2, 5], [5, 2, 4], [10, 3, 6], [-2, 3, 9], [-3, 2, 5]]), a = c[0], k = ent(c[1], c[2]);
      return q("Puissance",
        "Calcule " + M(p(a) + "^{" + k + "}") + ".",
        Math.pow(a, k), "C'est le produit de " + M(k) + " facteurs égaux à " + M(p(a)) + "." + (a < 0 ? " Le signe dépend de la parité de l'exposant." : ""),
        M(p(a) + "^{" + k + "} = " + f(Math.pow(a, k))) + ".");
    },
    "auto-evolution": function () {
      var hausse = Math.random() < 0.5, t = pioche([5, 10, 20, 25, 30, 40, 50]), P = ent(2, 40) * 10;
      var r = P * (hausse ? 1 + t / 100 : 1 - t / 100);
      return q("Évolution",
        "Un prix de " + M(P) + " € " + (hausse ? "augmente" : "baisse") + " de " + M(pct(t)) + ". Quel est le nouveau prix, en euros ?",
        r, "Multiplie par " + M(f(hausse ? 1 + t / 100 : 1 - t / 100)) + ".",
        M(P + " \\times " + f(hausse ? 1 + t / 100 : 1 - t / 100) + " = " + f(r)) + " €.");
    },
    "auto-equation": function () {
      var a = nonNul(-9, 9), x = ent(-12, 12), b = nonNul(-20, 20);
      if (a === 1) a = 2;
      return q("Équation",
        "Résous l'équation " + M(pol([[a, "x"], [b, ""]], "x") + " = " + f(a * x + b)) + ". Donne $x$.",
        x, "Isole " + M(f(a) + "x") + ", puis divise par " + M(f(a)) + ".",
        M(f(a) + "x = " + f(a * x)) + ", donc " + M("x = " + f(x)) + ".");
    }
  };

  // ---------------------------------------------------------------
  //  Le problème du boss : un contexte et cinq questions liées
  // ---------------------------------------------------------------
  function problemeBoss() {
    var C = pioche([["Une réserve naturelle", "makis"], ["Un îlot du lagon", "tortues"], ["Une mangrove", "palétuviers"], ["Une plage protégée", "nids de tortues"]]);
    var q0 = pioche([0.5, 0.8, 0.9]), L = pioche([200, 300, 400, 500, 600, 800, 1000]);
    var c = arr(L * (1 - q0)), u0;
    do { u0 = ent(2, 15) * 100; } while (u0 === L);
    var u = [u0];
    for (var i = 0; i < 3; i++) u.push(arr(q0 * u[i] + c));
    var perte = arr((1 - q0) * 100);
    var rel = "u_{n+1} = " + f(q0) + "\\,u_n + " + f(c);
    return {
      boss: "Le Sphinx de Thèbes",
      monstre: "sphinx",
      contexte: C[0] + " compte " + M("u_0 = " + f(u0)) + " " + C[1] + " en 2026. Chaque année, " + M(pct(perte)) + " disparaissent et " + M(f(c)) + " autres s'y ajoutent : " + M(rel) + ".",
      exercices: [
        q("Question 1 : un terme", "Calcule " + M("u_1") + ".", u[1],
          "Prends $n = 0$ : " + M("u_1 = " + f(q0) + " \\times u_0 + " + f(c)) + ".",
          M("u_1 = " + f(q0) + " \\times " + f(u0) + " + " + f(c) + " = " + f(u[1])) + "."),
        q("Question 2 : le terme suivant", "Calcule " + M("u_2") + ".", u[2],
          "Prends $n = 1$, avec la valeur de " + M("u_1") + ".",
          M("u_2 = " + f(q0) + " \\times " + f(u[1]) + " + " + f(c) + " = " + f(u[2])) + "."),
        q("Question 3 : l'évolution", "Calcule " + M("u_1 - u_0") + ". (Un résultat négatif veut dire que la population baisse.)", arr(u[1] - u0),
          "Soustrais " + M("u_0") + " à " + M("u_1") + ".",
          M("u_1 - u_0 = " + f(u[1]) + " - " + f(u0) + " = " + f(u[1] - u0)) + (u[1] > u0 ? " : la population augmente." : " : la population baisse.")),
        q("Question 4 : en Python", "On exécute :\n`L = [" + u0 + "]`\n`for i in range(3):`\n`    L.append(" + q0 + " * L[-1] + " + c + ")`\nQue vaut `L[-1]` ?", u[3],
          "La boucle ajoute " + M("u_1") + ", " + M("u_2") + " puis " + M("u_3") + ".",
          "`L[-1]` est " + M("u_3 = " + f(q0) + " \\times " + f(u[2]) + " + " + f(c) + " = " + f(u[3])) + "."),
        q("Question 5 : la limite", "Les termes semblent se rapprocher d'un nombre $\\ell$ qui ne bouge plus d'une année à l'autre : " + M("\\ell = " + f(q0) + "\\,\\ell + " + f(c)) + ". Quel est ce nombre $\\ell$ ?", L,
          "Résous l'équation : " + M(f(arr(1 - q0)) + "\\,\\ell = " + f(c)) + ".",
          M(f(arr(1 - q0)) + "\\,\\ell = " + f(c)) + ", donc " + M("\\ell = " + f(L)) + ". Les termes " + M(u.map(f).join(" \\,;\\, ") + " \\dots") + " s'en approchent : c'est la limite que l'on conjecture.")
      ]
    };
  }

  // ---------------------------------------------------------------
  //  Les leçons des stèles
  // ---------------------------------------------------------------
  var LECONS = {
    explicite: {
      titre: "la formule explicite",
      texte: "Une **suite** $(u_n)$ associe à chaque entier naturel $n$ un nombre $u_n$, le **terme de rang $n$**.\n" +
        "- Avec une **formule explicite** $u_n = f(n)$, on calcule n'importe quel terme d'un coup : on remplace $n$ par le rang voulu.\n" +
        "- Attention aux priorités : le carré ou la puissance d'abord, puis les produits, puis les sommes.",
      exemple: "$u_n = 3n^2 - 1$ donne $u_{10} = 3 \\times 10^2 - 1 = 299$."
    },
    suivant: {
      titre: "le terme suivant",
      texte: "$u_{n+1}$ est le terme **qui suit** $u_n$ : on l'obtient en remplaçant $n$ par $n + 1$ dans la formule.\n" +
        "- Ne confonds pas $u_{n+1}$ (le terme suivant) et $u_n + 1$ (le terme plus un).\n" +
        "- Pour trouver un **rang**, on résout une équation d'inconnue $n$ ; la réponse doit être un entier naturel.",
      exemple: "$u_n = 3n + 2$ donne $u_{n+1} = 3(n + 1) + 2 = 3n + 5$, alors que $u_n + 1 = 3n + 3$."
    },
    recurrence: {
      titre: "la relation de récurrence",
      texte: "On donne le **premier terme** et le moyen de passer d'un terme au **suivant** : $u_{n+1} = f(u_n)$.\n" +
        "- On calcule **de proche en proche** : $u_0 \\to u_1 \\to u_2 \\to \\dots$\n" +
        "- Pour $u_1$, on prend $n = 0$ ; pour $u_2$, $n = 1$, et ainsi de suite.\n" +
        "- Une récurrence peut utiliser deux termes, comme Fibonacci : $u_{n+2} = u_{n+1} + u_n$.\n" +
        "- Si l'on ajoute toujours le même nombre $r$, on passe de $u_0$ à $u_n$ en ajoutant $n$ fois $r$.",
      exemple: "$u_0 = 5$ et $u_{n+1} = 2u_n - 3$ : $u_1 = 7$, $u_2 = 11$, $u_3 = 19$."
    },
    remonter: {
      titre: "remonter une récurrence",
      texte: "Si l'on connaît un terme, la relation de récurrence est une **équation** qui permet de retrouver le terme d'avant.\n" +
        "- On remplace $u_{n+1}$ par la valeur connue, puis on résout.\n" +
        "- Une relation peut aussi dépendre de $n$ : pour $u_{n+1} = u_n + 2n$, on ajoute $0$, puis $2$, puis $4$…",
      exemple: "$u_{n+1} = 2u_n + 1$ et $u_4 = 23$ : $2u_3 + 1 = 23$, donc $u_3 = 11$."
    },
    motifs: {
      titre: "les motifs",
      texte: "Pour un motif qui grandit d'étape en étape, on note $u_n$ le nombre d'objets à l'étape $n$.\n" +
        "- On **compte** les premiers termes.\n" +
        "- On cherche ce qu'on **ajoute** d'une étape à la suivante : c'est une relation de récurrence.\n" +
        "- On cherche une **formule explicite**, puis on la vérifie sur les premiers termes.",
      exemple: "Des carrés d'allumettes alignés : $4$, $7$, $10$… On ajoute $3$ à chaque fois et $u_1 = 4$, donc $u_n = 3n + 1$."
    },
    modele: {
      titre: "traduire un énoncé",
      texte: "Pour modéliser une situation qui évolue chaque année (ou chaque mois) :\n" +
        "- augmenter de $t\\,\\%$, c'est multiplier par $1 + \\dfrac{t}{100}$ ; baisser de $t\\,\\%$, multiplier par $1 - \\dfrac{t}{100}$ ;\n" +
        "- ajouter ou retirer une quantité fixe, c'est ajouter ou soustraire ce nombre ;\n" +
        "- l'**ordre** de l'énoncé compte : d'abord le pourcentage, ensuite l'ajout, ou l'inverse.",
      exemple: "Hausse de $2\\,\\%$ puis vente de $100$ kg chaque mois : $u_{n+1} = 1{,}02\\,u_n - 100$."
    },
    variation: {
      titre: "le sens de variation",
      texte: "- $(u_n)$ est **croissante** si $u_{n+1} \\geqslant u_n$ pour tout $n$ ; **décroissante** si $u_{n+1} \\leqslant u_n$ pour tout $n$.\n" +
        "- Méthode : on étudie le **signe de $u_{n+1} - u_n$**.\n" +
        "- Pour une formule avec $n^2$, on développe $(n + 1)^2 = n^2 + 2n + 1$ : les $n^2$ s'en vont.",
      exemple: "$u_n = n^2 - 4n$ : $u_{n+1} - u_n = 2n - 3$, positif dès que $n \\geqslant 2$. La suite est croissante à partir du rang $2$."
    },
    contre: {
      titre: "le contre-exemple",
      texte: "« La suite est croissante » veut dire « **pour tout** $n$, $u_{n+1} \\geqslant u_n$ ».\n" +
        "- Sa **négation** : il **existe** un rang $n$ tel que $u_{n+1} < u_n$.\n" +
        "- Un seul contre-exemple suffit pour prouver qu'une suite n'est pas croissante.\n" +
        "- Une suite peut n'être ni croissante ni décroissante.",
      exemple: "$u_0 = 3$, $u_1 = 5$, $u_2 = 4$ : $u_2 < u_1$, donc la suite n'est pas croissante."
    },
    limite: {
      titre: "l'idée de limite",
      texte: "On regarde ce que deviennent les termes quand $n$ devient très grand :\n" +
        "- ils se rapprochent d'un nombre $\\ell$ : **limite finie** ($3 + \\dfrac{1}{n}$ se rapproche de $3$) ;\n" +
        "- ils dépassent tout nombre : **limite infinie** ($n^2$) ;\n" +
        "- ils ne se stabilisent pas : **pas de limite** ($(-1)^n$).\n" +
        "Un quotient $\\dfrac{a}{n + 1}$ et une puissance $0{,}5^n$ se rapprochent de $0$. En Première, on **conjecture** la limite.",
      exemple: "$u_n = 2 - \\dfrac{3}{n + 1}$ : $u_{99} = 1{,}97$, $u_{999} = 1{,}997$… On conjecture $\\ell = 2$."
    },
    quotient: {
      titre: "limite d'un quotient, seuil",
      texte: "- Pour $\\dfrac{an + b}{cn + d}$ avec $n$ très grand, les nombres $b$ et $d$ comptent peu : les termes se rapprochent de $\\dfrac{a}{c}$.\n" +
        "- « **Assez près** de la limite » : on cherche le plus petit rang $n$ à partir duquel l'écart est plus petit qu'un nombre donné. On résout une inéquation, puis on prend le premier entier qui convient.",
      exemple: "$u_n = \\dfrac{6n + 1}{2n + 5}$ : pour $n$ très grand, $u_n \\approx \\dfrac{6n}{2n} = 3$."
    },
    listes: {
      titre: "les listes Python",
      texte: "Une **liste** range plusieurs valeurs : `L[0]` est la première, `L[-1]` la dernière, `len(L)` le nombre d'éléments.\n" +
        "- `range(5)` donne $0, 1, 2, 3, 4$ : cinq valeurs, en commençant à $0$.\n" +
        "- En compréhension : `[3 * k + 1 for k in range(5)]` vaut `[1, 4, 7, 10, 13]`.\n" +
        "- Avec une condition : `[k for k in range(10) if k % 3 == 0]` vaut `[0, 3, 6, 9]`.",
      exemple: "`L = [5, 8, 13, 21]` : `L[1]` vaut $8$ et `L[-2]` vaut $13$."
    },
    suitePython: {
      titre: "une suite en Python",
      texte: "Pour calculer les termes d'une suite récurrente, on part d'une liste qui contient le premier terme, et chaque tour de boucle ajoute le suivant avec `append`.\n" +
        "- `L[-1]` est toujours le dernier terme calculé.\n" +
        "- Une boucle `while` répète tant que la condition est vraie : elle sert à trouver un **seuil**.",
      exemple: "`L = [2]` puis trois fois `L.append(2 * L[-1] + 1)` : `L` vaut `[2, 5, 11, 23]`."
    },
    automatismes: {
      titre: "les automatismes",
      texte: "Les stèles d'or entraînent les automatismes du programme : pourcentages, coefficients multiplicateurs, puissances, équations simples. Calcule de tête, ou au brouillon.",
      exemple: "Baisser de $15\\,\\%$, c'est multiplier par $0{,}85$."
    }
  };

  // Une stèle : sa leçon, et un générateur par manche (tirés à chaque entrée dans la salle)
  function stele(lecon, manches, autres) {
    var d = { lecon: lecon, manches: manches };
    for (var k in autres || {}) d[k] = autres[k];
    return d;
  }
  function tirer(d) {
    var s = { capsule: d.lecon ? LECONS[d.lecon] : null, exercices: d.manches.map(function (g) { return GEN[g](); }) };
    if (d.monstre) s.monstre = d.monstre;
    return s;
  }
  // Prépare une salle : de nouveaux exercices à chaque entrée
  function salle(def) {
    def.preparer = function () {
      def.steles = (def.tirage.steles || []).map(function (d) { return d.boss ? problemeBoss() : tirer(d); });
      def.bonus = (def.tirage.bonus || []).map(tirer);
      def.acrobaties = (def.tirage.acrobaties || []).map(function (g) { return GEN[g](); });
    };
    def.preparer();
    return def;
  }

  // Pour la page de vérification (outils/salles-verifier.js)
  if (typeof window !== "undefined") window.SALLES_GEN = { GEN: GEN, problemeBoss: problemeBoss, LECONS: LECONS };

  // ---------------------------------------------------------------
  //  LE CHAPITRE ET SES SALLES
  // ---------------------------------------------------------------
  return [
    {
      niveau: "Première spécialité",
      titre: "Suites numériques",
      introduction: "Bienvenue dans la galerie des suites. Chaque stèle t'enseigne d'abord une leçon, puis son gardien te met à l'épreuve, du plus simple au plus difficile. Au bout de la galerie, le Sphinx t'attend avec son énigme.",
      conclusion: "Le Sphinx est vaincu : tu sais calculer des termes, étudier les variations d'une suite et conjecturer sa limite. Les suites arithmétiques et géométriques t'attendent dans les prochains chapitres.",
      salles: [

        salle({
          nom: "Le registre de Nicomaque",
          notion: "Formule explicite, terme suivant",
          fond: "temple",
          athena: "Deux stèles gardent la porte : l'une près de toi, l'autre au-delà du précipice. Chacune t'apprend d'abord sa leçon.",
          plan: [
            "############################",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#........................A.#",
            "#.......................####",
            "#..........................#",
            "#....................###...#",
            "#................T.........#",
            "#..............####........#",
            "#..........................S",
            "#J.G..T......##............S",
            "##########...###############"
          ],
          guides: [{
            nom: "Nicomaque de Gérase (vers 60 – vers 120)",
            portrait: "grec",
            texte: "Dans mon « Introduction arithmétique », j'ai rangé les nombres en figures : triangles, carrés, pentagones de petits cailloux. Chaque figure grandit d'étape en étape : une suite de nombres, dont on cherche la formule."
          }],
          tirage: {
            steles: [
              // la 1re stèle de la liste est la plus haute du plan (ordre de lecture) : ici, la plus lointaine
              stele("suivant", ["u-n-plus-1", "rang-explicite", "u-n-plus-1-carre"]),
              stele("explicite", ["explicite-affine", "explicite-carre", "explicite-puissance"])
            ],
            bonus: [stele("automatismes", ["auto-puissance", "auto-pourcent", "auto-coef"])]
          }
        }),

        salle({
          nom: "Les lapins de Fibonacci",
          notion: "Relation de récurrence",
          fond: "mer",
          athena: "Le gouffre est trop large pour sauter. La seconde stèle construira une passerelle : elle aura exactement la longueur que tu calculeras.",
          plan: [
            "############################",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#.......................A..#",
            "#......................###.#",
            "#..........................#",
            "#..................###.....S",
            "#J.G..T..........T.........S",
            "#########PPPPPP#############"
          ],
          guides: [{
            nom: "Leonardo Fibonacci (vers 1170 – vers 1250)",
            portrait: "renaissance",
            texte: "Dans mon « Liber abaci » (1202), je pose un problème : un couple de lapins donne naissance à un nouveau couple chaque mois, à partir de son deuxième mois. Combien de couples au bout d'un an ? Chaque mois, le nombre de couples est la somme des deux mois précédents : 1, 1, 2, 3, 5, 8, 13…"
          }],
          tirage: {
            steles: [
              // la 1re stèle (la plus proche) construit la passerelle avec sa dernière manche
              stele("recurrence", ["rec-affine", "rec-fib", "rec-rang-6"]),
              stele("remonter", ["rec-inverse", "rec-avec-n", "rec-affine3"])
            ],
            bonus: [stele("automatismes", ["auto-equation", "auto-evolution", "auto-puissance"])]
          }
        }),

        salle({
          nom: "Les motifs d'al-Karaji",
          notion: "Motifs, traduire un énoncé par une suite",
          fond: "orient",
          athena: "Grimpe de bloc en bloc jusqu'à la seconde stèle.",
          plan: [
            "############################",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#...................A......#",
            "#..................##......#",
            "#...............T..........#",
            "#..............##..........#",
            "#..........................#",
            "#...........##.............#",
            "#..........................#",
            "#........##................S",
            "#JG...T....................S",
            "############################"
          ],
          guides: [{
            nom: "Al-Karaji (953 – vers 1029)",
            portrait: "turban",
            texte: "À Bagdad, j'ai étudié les sommes 1 + 2 + 3 + … et les sommes de cubes. Pour les justifier, je passais d'une étape à la suivante, comme sur une échelle : on y voit aujourd'hui l'une des premières traces du raisonnement par récurrence."
          }],
          tirage: {
            steles: [
              // la 1re stèle de la liste est la plus haute du plan (ordre de lecture) : ici, la plus lointaine
              stele("modele", ["modele-coef", "modele-u1", "modele-u2"]),
              stele("motifs", ["motif-allumettes", "motif-figures", "motif-ajout"])
            ],
            bonus: [stele("automatismes", ["auto-coef", "auto-pourcent", "auto-equation"])]
          }
        }),

        salle({
          nom: "Les leçons d'Agnesi",
          notion: "Sens de variation, contre-exemple",
          fond: "jardin",
          athena: "Une dalle, deux stèles, et un précipice entre les deux.",
          plan: [
            "############################",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#.........................A#",
            "#........................###",
            "#...........D..............#",
            "#.........####........###..S",
            "#J.G...T............T......S",
            "###############...##########"
          ],
          guides: [{
            nom: "Maria Gaetana Agnesi (1718 – 1799)",
            portrait: "chignon",
            texte: "À Milan, j'ai écrit en 1748 les « Institutions analytiques », l'un des premiers livres à expliquer clairement aux élèves comment étudier la croissance d'une quantité. On m'a ensuite proposé une chaire à l'université de Bologne, chose rare pour une femme à mon époque."
          }],
          tirage: {
            steles: [
              stele("variation", ["diff-valeur", "diff-quadra", "rang-croissante"]),
              stele("contre", ["contre-exemple", "diff-valeur", "variation-compte"])
            ],
            bonus: [stele("automatismes", ["auto-equation", "auto-coef", "auto-evolution"])]
          }
        }),

        salle({
          nom: "La course de Zénon",
          notion: "Conjecturer une limite, seuil",
          fond: "crepuscule",
          athena: "La seconde stèle est perchée en haut des marches. Une corniche cachée garde la stèle d'or : seule la stèle d'Hermès y mène.",
          plan: [
            "############################",
            "#..........................#",
            "#.A...R....................#",
            "#######....................#",
            "#..........................#",
            "#..........................#",
            "#......................T...#",
            "#....................####..#",
            "#..........................#",
            "#................###.......#",
            "#..........................#",
            "#.............###..........S",
            "#JG.T...H..................S",
            "##########...###############"
          ],
          guides: [{
            nom: "Zénon d'Élée (vers 490 – vers 430 av. J.-C.)",
            portrait: "grec",
            texte: "Pour atteindre l'arbre, Achille doit d'abord parcourir la moitié du chemin, puis la moitié de ce qui reste, et ainsi de suite, sans fin. Comment peut-il arriver ? Mes paradoxes ont tourmenté les savants pendant deux mille ans, jusqu'à ce qu'on comprenne la notion de limite."
          }],
          tirage: {
            steles: [
              // la 1re stèle de la liste est la plus haute du plan (ordre de lecture) : ici, la plus lointaine
              stele("quotient", ["limite-quotient", "limite-quotient-k", "seuil-limite"]),
              stele("limite", ["limite-inverse", "limite-geom", "terme-loin"])
            ],
            bonus: [stele("automatismes", ["auto-pourcent", "auto-puissance", "auto-evolution"])],
            acrobaties: ["zenon"]
          }
        }),

        salle({
          nom: "Le métier d'Ada",
          notion: "Python : listes, suites, boucle « tant que »",
          fond: "nuit",
          athena: "Dernière salle avant l'antre du Sphinx. La seconde stèle est tout en haut.",
          plan: [
            "############################",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#............T........A....#",
            "#...........###......###...#",
            "#..........................#",
            "#...............###........#",
            "#..........................#",
            "#...........###............#",
            "#..........................#",
            "#.......###................S",
            "#J.G..T....................S",
            "############################"
          ],
          guides: [{
            nom: "Ada Lovelace (1815 – 1852)",
            portrait: "femme19",
            texte: "En 1843, j'ai décrit pas à pas comment la machine analytique de Charles Babbage pourrait calculer une suite de nombres compliqués, les nombres de Bernoulli. Cette note est souvent considérée comme le premier programme informatique."
          }],
          tirage: {
            steles: [
              // la 1re stèle de la liste est la plus haute du plan (ordre de lecture) : ici, la plus lointaine
              stele("suitePython", ["py-append", "py-fibo", "py-seuil"]),
              stele("listes", ["py-indice", "py-comprehension", "py-filtre"])
            ],
            bonus: [stele("automatismes", ["auto-puissance", "auto-equation", "auto-coef"])]
          }
        }),

        salle({
          nom: "L'énigme du Sphinx",
          notion: "Boss du chapitre : un modèle de population",
          fond: "brumes",
          athena: "Le Sphinx garde la sortie de la galerie. Pour le vaincre, résous son énigme en cinq questions : tu as trois minutes par question.",
          plan: [
            "############################",
            "#..........................#",
            "#..........................#",
            "#..........................#",
            "#..A.......................#",
            "#.###......................#",
            "#..........................#",
            "#....###...................#",
            "#..........................#",
            "#........###...............#",
            "#..........................#",
            "#.....###..................S",
            "#J.G................T......S",
            "############################"
          ],
          guides: [{
            nom: "Pierre-François Verhulst (1804 – 1849)",
            portrait: "xixe",
            texte: "Une population ne peut pas grandir sans fin : la nourriture et la place finissent par manquer. En 1838, j'ai proposé un modèle où la population se stabilise près d'un niveau d'équilibre. Le Sphinx va te poser une énigme de ce genre."
          }],
          tirage: {
            steles: [{ boss: true }],
            bonus: [stele("automatismes", ["auto-evolution", "auto-coef", "auto-pourcent"])]
          }
        })
      ]
    }
  ];
})();
