/*
  CHAPITRE : Terminale maths expertes — Nombres complexes et trigonométrie
  -------------------------------------------------------------------------
  Mêmes règles d'écriture que data/seconde/fonctions.js (formules entre $...$, antislash doublé).
  Programme officiel de maths expertes (BO spécial n° 8 du 25 juillet 2019), « Nombres complexes et trigonométrie ».
  video : vidéos d'Yvan Monka. Générateurs : préfixe xt- dans assets/exercices-expertes.js ; figures "xt-cours-…".
*/
window.CHAPITRES = window.CHAPITRES || {};
window.CHAPITRES["expertes-complexes-trigonometrie"] = {
  niveau: "Terminale maths expertes",
  numero: 3,
  titre: "Nombres complexes et trigonométrie",
  accroche: "Formules d'addition, notation $e^{i\\theta}$, formules de Moivre et d'Euler : les complexes au service de la trigonométrie.",

  playlist: "",
  drive: "",
  pdfs: [
    { titre: "Cours d'Yvan Monka : nombres complexes, partie 3 (PDF)", url: "https://www.maths-et-tiques.fr/telech/20NC3.pdf" }
  ],

  /* ---------- 1. CAPSULE DE COURS ---------- */
  cours: [
    {
      titre: "Formules d'addition",
      figure: "xt-cours-addition",
      video: { titre: "Vidéo d'Yvan Monka : calculer des valeurs de cos et sin avec les formules d'addition", youtube: "https://youtu.be/WcTWAazcXds" },
      texte:
        "Pour tous réels $a$ et $b$ :\n\n" +
        "- $\\cos(a - b) = \\cos a\\cos b + \\sin a\\sin b$\n" +
        "- $\\cos(a + b) = \\cos a\\cos b - \\sin a\\sin b$\n" +
        "- $\\sin(a - b) = \\sin a\\cos b - \\cos a\\sin b$\n" +
        "- $\\sin(a + b) = \\sin a\\cos b + \\cos a\\sin b$\n\n" +
        "**Démonstration de la première, avec le produit scalaire.** Sur le cercle trigonométrique, on place $A(\\cos a\\,;\\sin a)$ et $B(\\cos b\\,;\\sin b)$. Les vecteurs $\\overrightarrow{OA}$ et $\\overrightarrow{OB}$ ont pour norme $1$ et forment un angle $a - b$. Donc $\\overrightarrow{OB} \\cdot \\overrightarrow{OA} = 1 \\times 1 \\times \\cos(a - b)$. Avec les coordonnées : $\\overrightarrow{OB} \\cdot \\overrightarrow{OA} = \\cos b\\cos a + \\sin b\\sin a$. D'où la formule.\n\n" +
        "Les trois autres s'en déduisent en remplaçant $b$ par $-b$, puis avec $\\sin x = \\cos\\left(\\dfrac{\\pi}{2} - x\\right)$.",
      exemple: {
        enonce: "Calcule la valeur exacte de $\\cos\\left(\\dfrac{\\pi}{12}\\right)$ en écrivant $\\dfrac{\\pi}{12} = \\dfrac{\\pi}{3} - \\dfrac{\\pi}{4}$.",
        solution: "$\\cos\\left(\\dfrac{\\pi}{3} - \\dfrac{\\pi}{4}\\right) = \\dfrac{1}{2} \\times \\dfrac{\\sqrt{2}}{2} + \\dfrac{\\sqrt{3}}{2} \\times \\dfrac{\\sqrt{2}}{2} = \\dfrac{\\sqrt{2} + \\sqrt{6}}{4}$."
      }
    },
    {
      titre: "Formules de duplication",
      video: { titre: "Vidéo d'Yvan Monka : calculer des valeurs de cos et sin avec les formules de duplication", youtube: "https://youtu.be/RPtAUl3oLco" },
      texte:
        "Avec $a = b$ dans les formules d'addition, pour tout réel $a$ :\n\n" +
        "- $\\sin(2a) = 2\\sin a\\cos a$\n" +
        "- $\\cos(2a) = \\cos^2 a - \\sin^2 a = 2\\cos^2 a - 1 = 1 - 2\\sin^2 a$\n\n" +
        "On en déduit :\n\n" +
        "$\\cos^2 a = \\dfrac{1 + \\cos(2a)}{2}$ et $\\sin^2 a = \\dfrac{1 - \\cos(2a)}{2}$\n\n" +
        "Ces deux formules **linéarisent** un carré : elles servent à calculer des valeurs exactes et des intégrales.",
      exemple: {
        enonce: "Sachant que $\\cos\\dfrac{\\pi}{4} = \\dfrac{\\sqrt{2}}{2}$, calcule $\\cos^2\\left(\\dfrac{\\pi}{8}\\right)$.",
        solution: "$\\cos^2\\left(\\dfrac{\\pi}{8}\\right) = \\dfrac{1 + \\cos\\frac{\\pi}{4}}{2} = \\dfrac{1 + \\frac{\\sqrt{2}}{2}}{2} = \\dfrac{2 + \\sqrt{2}}{4}$."
      }
    },
    {
      titre: "La notation $e^{i\\theta}$",
      video: { titre: "Vidéo d'Yvan Monka : écrire un nombre complexe sous forme exponentielle (1)", youtube: "https://youtu.be/WSW6DIbCS_0" },
      texte:
        "Pour tout réel $\\theta$, on note $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$. C'est le nombre de module $1$ et d'argument $\\theta$ : son image est sur le cercle trigonométrique.\n\n" +
        "**Relation fonctionnelle** : pour tous réels $\\theta$ et $\\theta'$, $e^{i\\theta} \\times e^{i\\theta'} = e^{i(\\theta + \\theta')}$.\n\n" +
        "**Démonstration.** $(\\cos\\theta + i\\sin\\theta)(\\cos\\theta' + i\\sin\\theta') = (\\cos\\theta\\cos\\theta' - \\sin\\theta\\sin\\theta') + i(\\sin\\theta\\cos\\theta' + \\cos\\theta\\sin\\theta')$, et on reconnaît $\\cos(\\theta + \\theta') + i\\sin(\\theta + \\theta')$.\n\n" +
        "Conséquences : $\\overline{e^{i\\theta}} = e^{-i\\theta} = \\dfrac{1}{e^{i\\theta}}$, $\\dfrac{e^{i\\theta}}{e^{i\\theta'}} = e^{i(\\theta - \\theta')}$ et $e^{i\\pi} = -1$, $e^{i\\frac{\\pi}{2}} = i$, $e^{2i\\pi} = 1$.\n\n" +
        "On retrouve les règles de la fonction exponentielle : c'est pour cela qu'on utilise cette notation.",
      exemple: {
        enonce: "Simplifie $e^{i\\frac{\\pi}{3}} \\times e^{i\\frac{\\pi}{6}}$ et écris le résultat sous forme algébrique.",
        solution: "$e^{i\\frac{\\pi}{3}} \\times e^{i\\frac{\\pi}{6}} = e^{i\\left(\\frac{\\pi}{3} + \\frac{\\pi}{6}\\right)} = e^{i\\frac{\\pi}{2}} = \\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2} = i$."
      }
    },
    {
      titre: "Forme exponentielle d'un nombre complexe",
      video: { titre: "Vidéo d'Yvan Monka : écrire un nombre complexe sous forme exponentielle (2)", youtube: "https://youtu.be/tEKJVKKQazA" },
      texte:
        "Tout complexe **non nul** $z$, de module $r$ et d'argument $\\theta$, s'écrit :\n\n" +
        "$z = re^{i\\theta}$\n\n" +
        "C'est une **forme exponentielle** de $z$ (avec $r > 0$).\n\n" +
        "- **Algébrique → exponentielle** : comme pour la forme trigonométrique, on calcule $r = |z|$ puis un argument $\\theta$.\n" +
        "- **Exponentielle → algébrique** : $re^{i\\theta} = r\\cos\\theta + ir\\sin\\theta$.",
      exemple: {
        enonce: "Écris $z = -1 + i$ sous forme exponentielle, puis $w = 6e^{-i\\frac{\\pi}{6}}$ sous forme algébrique.",
        solution: "$|z| = \\sqrt{2}$, $\\cos\\theta = -\\dfrac{\\sqrt{2}}{2}$, $\\sin\\theta = \\dfrac{\\sqrt{2}}{2}$, donc $z = \\sqrt{2}e^{i\\frac{3\\pi}{4}}$.\n\n$w = 6\\left(\\dfrac{\\sqrt{3}}{2} - \\dfrac{1}{2}i\\right) = 3\\sqrt{3} - 3i$."
      }
    },
    {
      titre: "Calculer avec la forme exponentielle",
      figure: "xt-cours-produit",
      video: { titre: "Vidéo d'Yvan Monka : utiliser la forme exponentielle", youtube: "https://youtu.be/8EVfyqyVBKc" },
      texte:
        "Avec $z = re^{i\\theta}$ et $z' = r'e^{i\\theta'}$ :\n\n" +
        "- $zz' = rr'e^{i(\\theta + \\theta')}$ : on **multiplie** les modules et on **additionne** les arguments. Donc $\\arg(zz') = \\arg(z) + \\arg(z')\\ [2\\pi]$.\n" +
        "- $\\dfrac{z}{z'} = \\dfrac{r}{r'}e^{i(\\theta - \\theta')}$ : on divise les modules et on soustrait les arguments.\n" +
        "- $\\overline{z} = re^{-i\\theta}$ et $\\dfrac{1}{z} = \\dfrac{1}{r}e^{-i\\theta}$.\n\n" +
        "La forme exponentielle est la plus pratique pour les **produits, quotients et puissances**. La forme algébrique reste la meilleure pour les **sommes**.",
      exemple: {
        enonce: "Avec $z = 2e^{i\\frac{\\pi}{3}}$ et $z' = 4e^{-i\\frac{3\\pi}{4}}$, donne la forme exponentielle de $zz'$ et de $\\dfrac{z}{z'}$.",
        solution: "$zz' = 8e^{i\\left(\\frac{\\pi}{3} - \\frac{3\\pi}{4}\\right)} = 8e^{-i\\frac{5\\pi}{12}}$.\n\n$\\dfrac{z}{z'} = \\dfrac{2}{4}e^{i\\left(\\frac{\\pi}{3} + \\frac{3\\pi}{4}\\right)} = \\dfrac{1}{2}e^{i\\frac{13\\pi}{12}} = \\dfrac{1}{2}e^{-i\\frac{11\\pi}{12}}$ (on retire $2\\pi$ pour revenir dans $]-\\pi\\,;\\pi]$)."
      }
    },
    {
      titre: "La formule de Moivre",
      video: { titre: "Vidéo d'Yvan Monka : appliquer la formule de Moivre", youtube: "https://youtu.be/RU2C4i3n5Ik" },
      texte:
        "Pour tout réel $\\theta$ et tout entier naturel $n$ :\n\n" +
        "$(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)$, c'est-à-dire $\\left(e^{i\\theta}\\right)^n = e^{in\\theta}$.\n\n" +
        "Elle se démontre par récurrence avec la relation fonctionnelle. Plus généralement, $\\left(re^{i\\theta}\\right)^n = r^n e^{in\\theta}$.\n\n" +
        "**Usage** : pour calculer une grande puissance, on passe en forme exponentielle, on applique Moivre, puis on revient en forme algébrique.\n\n" +
        "**Autre usage** : en développant $(\\cos\\theta + i\\sin\\theta)^n$ avec le binôme et en identifiant, on exprime $\\cos(n\\theta)$ et $\\sin(n\\theta)$ en fonction de $\\cos\\theta$ et $\\sin\\theta$.",
      exemple: {
        enonce: "Calcule $(1 + i)^{10}$.",
        solution: "$1 + i = \\sqrt{2}e^{i\\frac{\\pi}{4}}$, donc $(1 + i)^{10} = (\\sqrt{2})^{10}e^{i\\frac{10\\pi}{4}} = 32e^{i\\frac{5\\pi}{2}} = 32e^{i\\frac{\\pi}{2}} = 32i$."
      }
    },
    {
      titre: "Les formules d'Euler et la linéarisation",
      video: { titre: "Vidéo d'Yvan Monka : appliquer les formules d'Euler pour linéariser", youtube: "https://youtu.be/p6TncUjPKfQ" },
      texte:
        "En ajoutant puis en soustrayant $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$ et $e^{-i\\theta} = \\cos\\theta - i\\sin\\theta$ :\n\n" +
        "$\\cos\\theta = \\dfrac{e^{i\\theta} + e^{-i\\theta}}{2}$ et $\\sin\\theta = \\dfrac{e^{i\\theta} - e^{-i\\theta}}{2i}$\n\n" +
        "**Linéariser**, c'est écrire une puissance de $\\cos$ ou de $\\sin$ comme une somme de $\\cos(k\\theta)$ et $\\sin(k\\theta)$ :\n\n" +
        "- on remplace avec les formules d'Euler ;\n" +
        "- on développe avec la formule du binôme ;\n" +
        "- on regroupe $e^{ik\\theta}$ avec $e^{-ik\\theta}$ pour faire réapparaître des cosinus ou des sinus.\n\n" +
        "C'est très utile pour **intégrer** : on ne sait pas primitiver $\\cos^3 x$ directement, mais on sait primitiver $\\cos x$ et $\\cos(3x)$.",
      exemple: {
        enonce: "Linéarise $\\cos^3\\theta$, puis calcule $\\displaystyle\\int_0^{\\frac{\\pi}{2}} \\cos^3 x\\,dx$.",
        solution: "$\\cos^3\\theta = \\dfrac{(e^{i\\theta} + e^{-i\\theta})^3}{8} = \\dfrac{e^{3i\\theta} + 3e^{i\\theta} + 3e^{-i\\theta} + e^{-3i\\theta}}{8} = \\dfrac{1}{4}\\cos(3\\theta) + \\dfrac{3}{4}\\cos\\theta$.\n\n$\\displaystyle\\int_0^{\\frac{\\pi}{2}} \\cos^3 x\\,dx = \\left[\\dfrac{1}{12}\\sin(3x) + \\dfrac{3}{4}\\sin x\\right]_0^{\\frac{\\pi}{2}} = -\\dfrac{1}{12} + \\dfrac{3}{4} = \\dfrac{2}{3}$."
      }
    },
    {
      titre: "Un peu d'histoire",
      texte:
        "**Abraham de Moivre** (1667-1754), protestant français réfugié à Londres, énonce sa formule vers 1730. **Leonhard Euler** donne en 1748 la relation $e^{i\\theta} = \\cos\\theta + i\\sin\\theta$.\n\n" +
        "L'**identité d'Euler** $e^{i\\pi} + 1 = 0$ relie en une seule ligne cinq nombres fondamentaux : $0$, $1$, $e$, $i$ et $\\pi$.\n\n" +
        "Aujourd'hui, les ingénieurs en électricité écrivent les tensions alternatives sous la forme $Ue^{i\\omega t}$ : les calculs de circuits deviennent de simples produits."
    }
  ],

  videos: [
    { type: "Exercice", titre: "Résoudre une équation trigonométrique avec les formules d'addition", youtube: "https://youtu.be/sCUNjZ6yqac" },
    { type: "Exercice", titre: "Appliquer la formule de Moivre", youtube: "https://youtu.be/7z7s6NVSyj0" },
    { type: "Exercice", titre: "Appliquer les formules d'Euler", youtube: "https://youtu.be/rsrDqzMtu6M" }
  ],
  videosNote: "Exercices corrigés en vidéo par Yvan Monka.",

  /* ---------- 2. EXERCICES INTERACTIFS ---------- */
  exercices: [
    { type: "xt-addition", titre: "Formules d'addition", etape: "Trigonométrie", nb: 5 },
    { type: "xt-duplication", titre: "Formules de duplication", etape: "Trigonométrie", nb: 5 },
    { type: "xt-expo-alg", titre: "De la forme exponentielle à la forme algébrique", etape: "Forme exponentielle", nb: 5 },
    { type: "xt-alg-expo", titre: "De la forme algébrique à la forme exponentielle", etape: "Forme exponentielle", nb: 5 },
    { type: "xt-calcul", titre: "Produits, quotients, puissances", etape: "Forme exponentielle", nb: 5 },
    { type: "xt-moivre", titre: "Formule de Moivre", etape: "Moivre et Euler", nb: 5 },
    { type: "xt-euler", titre: "Linéariser avec Euler", etape: "Moivre et Euler", nb: 5 },
    { type: "xt-vrai-faux", titre: "Vrai ou faux ?", etape: "Défi", nb: 5 }
  ],

  /* ---------- 3. QCM DE RÉVISION ---------- */
  qcm: [
    { question: "Pour tous réels $a$ et $b$, $\\cos(a + b)$ est égal à :", choix: ["$\\cos a\\cos b - \\sin a\\sin b$", "$\\cos a\\cos b + \\sin a\\sin b$", "$\\cos a + \\cos b$", "$\\sin a\\cos b + \\cos a\\sin b$"], bonne: 0, explication: "C'est la formule d'addition du cosinus, avec un signe « $-$ »." },
    { question: "Pour tout réel $x$, $\\sin(2x)$ est égal à :", choix: ["$2\\sin x\\cos x$", "$2\\sin x$", "$\\sin^2 x - \\cos^2 x$", "$\\sin x\\cos x$"], bonne: 0, explication: "Formule de duplication : $\\sin(2x) = \\sin(x + x) = 2\\sin x\\cos x$." },
    { question: "Laquelle de ces égalités est **fausse** pour certains réels $x$ ?", choix: ["$\\cos(2x) = 2\\cos x$", "$\\cos(2x) = 1 - 2\\sin^2 x$", "$\\cos(2x) = 2\\cos^2 x - 1$", "$\\cos(2x) = \\cos^2 x - \\sin^2 x$"], bonne: 0, explication: "Avec $x = 0$ : $\\cos 0 = 1$ alors que $2\\cos 0 = 2$. Les trois autres sont les formules de duplication." },
    { question: "Que vaut $e^{i\\pi}$ ?", choix: ["$-1$", "$1$", "$i$", "$0$"], bonne: 0, explication: "$e^{i\\pi} = \\cos\\pi + i\\sin\\pi = -1$." },
    { question: "Que vaut $e^{i\\frac{\\pi}{2}}$ ?", choix: ["$i$", "$1$", "$-i$", "$\\dfrac{\\pi}{2}$"], bonne: 0, explication: "$\\cos\\dfrac{\\pi}{2} + i\\sin\\dfrac{\\pi}{2} = 0 + i = i$." },
    { question: "Quelle est une forme exponentielle de $z = 1 - i$ ?", choix: ["$\\sqrt{2}e^{-i\\frac{\\pi}{4}}$", "$\\sqrt{2}e^{i\\frac{\\pi}{4}}$", "$2e^{-i\\frac{\\pi}{4}}$", "$e^{-i\\frac{\\pi}{4}}$"], bonne: 0, explication: "$|z| = \\sqrt{2}$, $\\cos\\theta = \\dfrac{\\sqrt{2}}{2}$ et $\\sin\\theta = -\\dfrac{\\sqrt{2}}{2}$, donc $\\theta = -\\dfrac{\\pi}{4}$." },
    { question: "Quelle est la forme algébrique de $4e^{i\\frac{2\\pi}{3}}$ ?", choix: ["$-2 + 2i\\sqrt{3}$", "$2 + 2i\\sqrt{3}$", "$-2\\sqrt{3} + 2i$", "$-2 - 2i\\sqrt{3}$"], bonne: 0, explication: "$4\\left(\\cos\\dfrac{2\\pi}{3} + i\\sin\\dfrac{2\\pi}{3}\\right) = 4\\left(-\\dfrac{1}{2} + \\dfrac{\\sqrt{3}}{2}i\\right) = -2 + 2i\\sqrt{3}$." },
    { question: "Si $z = 3e^{i\\frac{\\pi}{5}}$ et $z' = 2e^{i\\frac{\\pi}{10}}$, alors $zz'$ est égal à :", choix: ["$6e^{i\\frac{3\\pi}{10}}$", "$5e^{i\\frac{3\\pi}{10}}$", "$6e^{i\\frac{\\pi}{50}}$", "$6e^{i\\frac{\\pi}{10}}$"], bonne: 0, explication: "On multiplie les modules ($3 \\times 2 = 6$) et on additionne les arguments ($\\dfrac{\\pi}{5} + \\dfrac{\\pi}{10} = \\dfrac{3\\pi}{10}$)." },
    { question: "Si $z = 2e^{i\\frac{\\pi}{3}}$, alors $z^3$ est égal à :", choix: ["$-8$", "$8$", "$6e^{i\\pi}$", "$8i$"], bonne: 0, explication: "Formule de Moivre : $z^3 = 2^3e^{i\\pi} = 8 \\times (-1) = -8$." },
    { question: "Quel est le conjugué de $5e^{i\\frac{\\pi}{7}}$ ?", choix: ["$5e^{-i\\frac{\\pi}{7}}$", "$-5e^{i\\frac{\\pi}{7}}$", "$\\dfrac{1}{5}e^{-i\\frac{\\pi}{7}}$", "$5e^{i\\frac{6\\pi}{7}}$"], bonne: 0, explication: "Même module, argument opposé : $\\overline{re^{i\\theta}} = re^{-i\\theta}$." },
    { question: "Quelle est une forme exponentielle de $\\dfrac{1}{2e^{i\\frac{\\pi}{4}}}$ ?", choix: ["$\\dfrac{1}{2}e^{-i\\frac{\\pi}{4}}$", "$2e^{-i\\frac{\\pi}{4}}$", "$\\dfrac{1}{2}e^{i\\frac{\\pi}{4}}$", "$-2e^{i\\frac{\\pi}{4}}$"], bonne: 0, explication: "L'inverse a pour module l'inverse du module et pour argument l'opposé de l'argument." },
    { question: "Que vaut $(1 + i)^8$ ?", choix: ["$16$", "$-16$", "$16i$", "$256$"], bonne: 0, explication: "$1 + i = \\sqrt{2}e^{i\\frac{\\pi}{4}}$, donc $(1 + i)^8 = (\\sqrt{2})^8e^{2i\\pi} = 16$." },
    { question: "La formule d'Euler pour le sinus est :", choix: ["$\\sin\\theta = \\dfrac{e^{i\\theta} - e^{-i\\theta}}{2i}$", "$\\sin\\theta = \\dfrac{e^{i\\theta} - e^{-i\\theta}}{2}$", "$\\sin\\theta = \\dfrac{e^{i\\theta} + e^{-i\\theta}}{2i}$", "$\\sin\\theta = \\dfrac{e^{i\\theta} + e^{-i\\theta}}{2}$"], bonne: 0, explication: "$e^{i\\theta} - e^{-i\\theta} = 2i\\sin\\theta$ : il faut diviser par $2i$." },
    { question: "La forme linéarisée de $\\cos^2 x$ est :", choix: ["$\\dfrac{1 + \\cos(2x)}{2}$", "$\\dfrac{1 - \\cos(2x)}{2}$", "$\\cos(2x)$", "$\\dfrac{\\cos(2x)}{2}$"], bonne: 0, explication: "$\\cos(2x) = 2\\cos^2 x - 1$, donc $\\cos^2 x = \\dfrac{1 + \\cos(2x)}{2}$." },
    { question: "La forme linéarisée de $\\sin^2 x$ est :", choix: ["$\\dfrac{1 - \\cos(2x)}{2}$", "$\\dfrac{1 + \\cos(2x)}{2}$", "$\\sin(2x)$", "$\\dfrac{1 - \\sin(2x)}{2}$"], bonne: 0, explication: "$\\cos(2x) = 1 - 2\\sin^2 x$, donc $\\sin^2 x = \\dfrac{1 - \\cos(2x)}{2}$." },
    { question: "Sachant que $\\cos x = \\dfrac{3}{5}$, que vaut $\\cos(2x)$ ?", choix: ["$-\\dfrac{7}{25}$", "$\\dfrac{6}{5}$", "$\\dfrac{7}{25}$", "$-\\dfrac{16}{25}$"], bonne: 0, explication: "$\\cos(2x) = 2\\cos^2 x - 1 = 2 \\times \\dfrac{9}{25} - 1 = -\\dfrac{7}{25}$." },
    { question: "Quelle est la valeur exacte de $\\sin\\left(\\dfrac{5\\pi}{12}\\right)$ ?", choix: ["$\\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$", "$\\dfrac{\\sqrt{6} - \\sqrt{2}}{4}$", "$\\dfrac{\\sqrt{3} + 1}{2}$", "$\\dfrac{5}{12}$"], bonne: 0, explication: "$\\sin\\left(\\dfrac{\\pi}{4} + \\dfrac{\\pi}{6}\\right) = \\dfrac{\\sqrt{2}}{2} \\times \\dfrac{\\sqrt{3}}{2} + \\dfrac{\\sqrt{2}}{2} \\times \\dfrac{1}{2} = \\dfrac{\\sqrt{6} + \\sqrt{2}}{4}$." },
    { question: "Pour quels entiers naturels $n$ le nombre $\\left(e^{i\\frac{\\pi}{3}}\\right)^n$ est-il égal à $1$ ?", choix: ["Les multiples de $6$", "Les multiples de $3$", "Les multiples de $2$", "Seulement $n = 0$"], bonne: 0, explication: "$e^{i\\frac{n\\pi}{3}} = 1$ quand $\\dfrac{n\\pi}{3}$ est un multiple de $2\\pi$, c'est-à-dire quand $n$ est un multiple de $6$." },
    { question: "Si $\\arg(z) = \\dfrac{\\pi}{3}$ et $\\arg(z') = \\dfrac{\\pi}{6}$, alors un argument de $\\dfrac{z}{z'}$ est :", choix: ["$\\dfrac{\\pi}{6}$", "$\\dfrac{\\pi}{2}$", "$2$", "$\\dfrac{\\pi}{18}$"], bonne: 0, explication: "L'argument d'un quotient est la différence des arguments : $\\dfrac{\\pi}{3} - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{6}$." },
    { question: "Un argument de $\\left(\\sqrt{3} + i\\right)^6$ est :", choix: ["$\\pi$", "$\\dfrac{\\pi}{6}$", "$0$", "$\\dfrac{\\pi}{2}$"], bonne: 0, explication: "$\\sqrt{3} + i = 2e^{i\\frac{\\pi}{6}}$, donc la puissance $6$ a pour argument $6 \\times \\dfrac{\\pi}{6} = \\pi$ : elle vaut $64e^{i\\pi} = -64$." },
    { question: "Quelle est la valeur de $\\displaystyle\\int_0^{\\pi} \\sin^2 x\\,dx$ ?", choix: ["$\\dfrac{\\pi}{2}$", "$\\pi$", "$0$", "$1$"], bonne: 0, explication: "$\\sin^2 x = \\dfrac{1}{2} - \\dfrac{1}{2}\\cos(2x)$, de primitive $\\dfrac{x}{2} - \\dfrac{\\sin(2x)}{4}$ : l'intégrale vaut $\\dfrac{\\pi}{2}$." }
  ],

  /* ---------- 4. FICHE MÉTHODE ---------- */
  methode: [
    {
      titre: "Calculer une valeur exacte avec les formules d'addition",
      figure: "xt-cours-addition",
      etapes: [
        "Écrire l'angle comme une somme ou une différence d'angles remarquables ($\\dfrac{\\pi}{6}$, $\\dfrac{\\pi}{4}$, $\\dfrac{\\pi}{3}$…).",
        "Choisir la bonne formule et faire attention aux signes : $\\cos(a + b)$ a un « $-$ », $\\cos(a - b)$ un « $+$ ».",
        "Remplacer par les valeurs exactes et simplifier les produits de racines."
      ],
      exemple: "$\\sin\\dfrac{\\pi}{12} = \\sin\\left(\\dfrac{\\pi}{4} - \\dfrac{\\pi}{6}\\right) = \\dfrac{\\sqrt{2}}{2} \\times \\dfrac{\\sqrt{3}}{2} - \\dfrac{\\sqrt{2}}{2} \\times \\dfrac{1}{2} = \\dfrac{\\sqrt{6} - \\sqrt{2}}{4}$."
    },
    {
      titre: "Choisir la bonne forme pour calculer",
      figure: "xt-cours-produit",
      etapes: [
        "Pour une **somme** : forme algébrique.",
        "Pour un **produit**, un **quotient** ou une **puissance** : forme exponentielle $re^{i\\theta}$.",
        "Multiplier les modules, additionner les arguments (soustraire pour un quotient, multiplier par $n$ pour une puissance).",
        "Ramener l'argument dans $]-\\pi\\,;\\pi]$, puis revenir en forme algébrique si on le demande."
      ],
      exemple: "$(1 - i)^6 = (\\sqrt{2})^6e^{-i\\frac{6\\pi}{4}} = 8e^{-i\\frac{3\\pi}{2}} = 8e^{i\\frac{\\pi}{2}} = 8i$."
    },
    {
      titre: "Linéariser avec les formules d'Euler",
      etapes: [
        "Remplacer $\\cos\\theta$ par $\\dfrac{e^{i\\theta} + e^{-i\\theta}}{2}$ (ou $\\sin\\theta$ par $\\dfrac{e^{i\\theta} - e^{-i\\theta}}{2i}$).",
        "Développer la puissance avec la formule du binôme.",
        "Regrouper $e^{ik\\theta} + e^{-ik\\theta} = 2\\cos(k\\theta)$ et $e^{ik\\theta} - e^{-ik\\theta} = 2i\\sin(k\\theta)$.",
        "Simplifier les coefficients."
      ],
      exemple: "$\\sin^2\\theta = \\dfrac{(e^{i\\theta} - e^{-i\\theta})^2}{-4} = \\dfrac{2 - 2\\cos(2\\theta)}{4} = \\dfrac{1}{2} - \\dfrac{1}{2}\\cos(2\\theta)$."
    },
    {
      titre: "Calculer une grande puissance",
      etapes: [
        "Écrire le nombre sous forme exponentielle $re^{i\\theta}$.",
        "Appliquer Moivre : $(re^{i\\theta})^n = r^ne^{in\\theta}$.",
        "Retirer des multiples de $2\\pi$ à $n\\theta$, puis revenir en forme algébrique."
      ],
      exemple: "$\\left(\\sqrt{3} + i\\right)^{6} = \\left(2e^{i\\frac{\\pi}{6}}\\right)^6 = 64e^{i\\pi} = -64$."
    }
  ],
  erreurs: [
    "Écrire $\\cos(a + b) = \\cos a + \\cos b$ : il faut les formules d'addition.",
    "Se tromper de signe : $\\cos(a + b) = \\cos a\\cos b$ **moins** $\\sin a\\sin b$.",
    "Écrire $\\sin(2x) = 2\\sin x$ : c'est $2\\sin x\\cos x$.",
    "Additionner les modules d'un produit : ils se **multiplient**, ce sont les arguments qui s'additionnent.",
    "Écrire $-2e^{i\\theta}$ comme forme exponentielle : le module doit être positif ($-2e^{i\\theta} = 2e^{i(\\theta + \\pi)}$).",
    "Oublier le $i$ au dénominateur de la formule d'Euler du sinus.",
    "Laisser un argument comme $\\dfrac{9\\pi}{4}$ sans le simplifier en $\\dfrac{\\pi}{4}$."
  ]
};
