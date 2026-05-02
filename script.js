let lang = localStorage.getItem("lang") || "de";
let results = [];
let score = 0;
let index = 0;
let quizQuestions = [];

/* ================= UI TEXT ================= */

const texts = {
  de: {
    theory: "Theorie",
    quiz: "Quiz",
    home: "🏠",
    restart: "🔄",
    back: "Zurück",
    title: "Theorie",
    result: "Score: "
  },
  fr: {
    theory: "Théorie",
    quiz: "Quiz",
    home: "🏠",
    restart: "🔄",
    back: "Retour",
    title: "Théorie",
    result: "Score : "
  }
};

/* ================= QUIZ ================= */
const questions = [
  {
    de: { q: "Was nutzt Echographie?", options: ["Ultraschall", "Licht"] },
    fr: { q: "Que utilise l’échographie ?", options: ["Ultrasons", "Lumière"] },
    a: 0
  },
{
  de: { q: "Was entsteht?", options: ["Bilder", "Geräusche"] },
  fr: { q: "Qu’est-ce qui est créé ?", options: ["Images", "Sons"] },
  a: 0
},
{
  de: { q: "Welche Frequenz wird in der Echographie typischerweise verwendet?", options: ["20–200 Hz", "1–15 MHz"] },
  fr: { q: "Quelle fréquence est utilisée en échographie ?", options: ["20–200 Hz", "1–15 MHz"] },
  a: 1
},
{
  de: { q: "Warum wird Gel bei der Echographie verwendet?", options: ["Um das Gerät zu kühlen", "Um Luft zu entfernen"] },
  fr: { q: "Pourquoi utilise-t-on du gel ?", options: ["Pour refroidir l’appareil", "Pour éliminer l’air"] },
  a: 1
},
{
  de: { q: "Was passiert bei Reflexion?", options: ["Die Welle wird zurückgeworfen", "Die Welle verschwindet"] },
  fr: { q: "Que se passe-t-il lors de la réflexion ?", options: ["L’onde est renvoyée", "L’onde disparaît"] },
  a: 0
},
{
  de: { q: "Welche Struktur erscheint schwarz im Ultraschallbild?", options: ["Knochen", "Flüssigkeit"] },
  fr: { q: "Quelle structure apparaît noire ?", options: ["Os", "Liquide"] },
  a: 1
},
{
  de: { q: "Was bedeutet hyperechogen?", options: ["Sehr dunkel", "Sehr hell"] },
  fr: { q: "Que signifie hyperéchogène ?", options: ["Très sombre", "Très clair"] },
  a: 1
},
{
  de: { q: "Welche Sonde wird für das Herz verwendet?", options: ["Linearsonde", "Phased Array"] },
  fr: { q: "Quelle sonde pour le cœur ?", options: ["Linéaire", "Phased array"] },
  a: 1
},
{
  de: { q: "Warum nutzt man niedrige Frequenzen?", options: ["Für bessere Farbe", "Für tiefere Eindringtiefe"] },
  fr: { q: "Pourquoi utiliser des basses fréquences ?", options: ["Pour améliorer la couleur", "Pour pénétrer plus profondément"] },
  a: 1
},
{
  de: { q: "Was misst das Gerät?", options: ["Zeit des Echos", "Temperatur"] },
  fr: { q: "Que mesure l’appareil ?", options: ["Le temps de retour", "La température"] },
  a: 0
},
{
  de: { q: "Was ist eine longitudinale Welle?", options: ["Schwingung quer dazu", "Schwingung in Ausbreitungsrichtung"] },
  fr: { q: "Qu’est-ce qu’une onde longitudinale ?", options: ["Oscillation perpendiculaire", "Oscillation dans la direction"] },
  a: 1
},
{
  de: { q: "Was passiert bei Absorption?", options: ["Die Welle wird stärker", "Energie wird in Wärme umgewandelt"] },
  fr: { q: "Que se passe-t-il lors de l’absorption ?", options: ["L’onde devient plus forte", "Énergie transformée en chaleur"] },
  a: 1
}
];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function prepareQuiz() {
  quizQuestions = shuffle([...questions]);
  score = 0;
  index = 0;
  results = []; // RESET Fehlerliste
}

/* ================= THEORIE ================= */

const theoryContent = [
  {
    id: "intro",
    title: { de: "00 Einführung", fr: "00 Introduction" },
    content: {
      de: `
<b>Nicht-invasive Bildgebungsmethode</b><br><br>

Die Echographie ist eine nicht-invasive medizinische Methode. Das bedeutet, dass kein chirurgischer Eingriff notwendig ist und nichts in den Körper eingeführt wird. Sie ist daher schmerzfrei und sicher.<br><br>

Sie basiert auf Ultraschallwellen, also Schallwellen mit hoher Frequenz, die für den Menschen nicht hörbar sind. Diese werden in den Körper gesendet und reflektiert, wodurch ein Bild entsteht.<br><br>

Ein großer Vorteil ist die Echtzeit-Beobachtung von Gewebe. So kann man Bewegungen wie das schlagende Herz direkt sehen.<br><br>

Diese Technik wird in vielen medizinischen Bereichen genutzt, wie Kardiologie oder Schwangerschaft.
`,
      fr: `
<b>Méthode d’imagerie non invasive</b><br><br>

L’échographie est une méthode d’imagerie médicale non invasive, ce qui signifie qu’elle ne nécessite aucune intervention chirurgicale. Elle est donc sans douleur et sans danger.<br><br>

Elle utilise des ultrasons, c’est-à-dire des ondes sonores à haute fréquence, invisibles pour l’oreille humaine. Ces ondes traversent le corps et sont réfléchies pour former une image.<br><br>

Un avantage important est l’observation en temps réel des tissus. On peut voir des mouvements comme le cœur en direct.<br><br>

Elle est utilisée dans plusieurs domaines médicaux, comme la cardiologie ou la grossesse.
`
    }
  },

  {
    id: "ultrasons",
    title: { de: "01 Ultraschall", fr: "01 Ultrasons" },
    content: {
      de: `
<b>Définition der Ultraschallwellen</b><br><br>

„Ultraschall sind mechanische Druckwellen. Es sind Variationen des Drucks, die sich in einem Medium ausbreiten.“<br><br>

Ultraschall sind longitudinale Wellen.<br>
Sie brauchen Teilchen zur Übertragung → im Vakuum nicht möglich.<br><br>

<b>Frequenzen</b><br>
In der Echographie: ca. 1–15 MHz<br><br>

<b>Schallbereiche</b><br>
Infraschall: < 20 Hz<br>
Hörbar: 20 Hz – 20 kHz<br>
Ultraschall: > 20 kHz
`,
      fr: `
<b>Définition des ultrasons</b><br><br>

« Les ultrasons sont des ondes mécaniques de pression. Ce sont des variations de pression qui se propagent dans un milieu. »<br><br>

Les ultrasons sont des ondes longitudinales.<br>
Ils ont besoin d’un milieu matériel → pas de propagation dans le vide.<br><br>

<b>Fréquences</b><br>
Échographie : 1–15 MHz<br><br>

<b>Domaines</b><br>
Infrasons : < 20 Hz<br>
Audible : 20 Hz – 20 kHz<br>
Ultrasons : > 20 kHz
`
    }
  },

  {
    id: "ondes",
    title: { de: "02 Kompression / Rarefaktion", fr: "02 Compression / Raréfaction" },
    content: {
      de: `
<b>Variationen der Druckwellen</b><br><br>

Ultraschall besteht aus Druckänderungen im Medium.<br><br>

<b>Kompression</b><br>
Teilchen werden zusammengedrückt → hoher Druck<br><br>

<b>Rarefaktion</b><br>
Teilchen werden auseinandergezogen → niedriger Druck<br><br>

<b>Zusammenhang</b><br>
Diese Wechsel erzeugen die Welle und ermöglichen die Bildbildung.
`,
      fr: `
<b>Variations de pression</b><br><br>

Les ultrasons sont des variations de pression dans un milieu.<br><br>

<b>Compression</b><br>
Particules rapprochées → pression élevée<br><br>

<b>Raréfaction</b><br>
Particules éloignées → pression faible<br><br>

<b>Lien</b><br>
Ces alternances créent l’onde ultrasonore et l’image.
`
    }
  },

  {
    id: "impedance",
    title: { de: "03 Impedanz & Gewebe", fr: "03 Impédance & tissus" },
    content: {
      de: `
<b>Interaktion mit Gewebe</b><br><br>

• Reflexion → Rückwurf der Welle<br>
• Brechung → Richtungsänderung<br>
• Streuung → Verteilung der Welle<br>
• Absorption → Energieverlust (Wärme)<br><br>

<b>Bildtypen</b><br>
Hyperechogen = weiß (Knochen, Luft)<br>
Hypoechogen = grau (Muskel)<br>
Anechogen = schwarz (Flüssigkeit)<br><br>

<b>Warum Gel?</b><br>
Luft blockiert Ultraschall → Gel ersetzt Luft → bessere Bildqualität
`,
      fr: `
<b>Interactions avec les tissus</b><br><br>

• Réflexion<br>
• Réfraction<br>
• Diffusion<br>
• Absorption<br><br>

<b>Image</b><br>
Hyperéchogène = blanc<br>
Hypoéchogène = gris<br>
Anéchogène = noir<br><br>

<b>Gel</b><br>
Élimine l’air → meilleure transmission des ultrasons
`
    }
  },

  {
    id: "mesure",
    title: { de: "04 Messprinzip", fr: "04 Principe de mesure" },
    content: {
      de: `
<b>Prinzip</b><br>
Zeitmessung des Echos → Entfernung<br><br>

Formel: Entfernung = (v × t) / 2<br><br>

<b>Beispiel Herz</b><br>
Echtzeitbewegung des Herzens sichtbar (Klappen, Blutfluss)
`,
      fr: `
<b>Principe</b><br>
Mesure du temps de retour de l’écho<br><br>

Formule : Distance = (v × t) / 2<br><br>

<b>Cœur</b><br>
Visualisation en temps réel (valves, flux sanguin)
`
    }
  },

  {
    id: "types",
    title: { de: "05 Arten", fr: "05 Types" },
    content: {
      de: `
<b>Echokardiographie</b> → Phased Array (1–5 MHz)<br>
<b>Schwangerschaft</b> → Konvexsonde (2–6 MHz)<br>
<b>Abdomen</b> → Konvex / Linear<br><br>

Weitere: Doppler, Schilddrüse, Notfallsonographie
`,
      fr: `
<b>Échocardiographie</b> → phased array<br>
<b>Grossesse</b> → sonde convexe<br>
<b>Abdomen</b> → convexe / linéaire<br><br>

Autres : Doppler, urgence, thyroïde
`
    }
  },

  {
    id: "conclusion",
    title: { de: "06 Fazit", fr: "06 Conclusion" },
    content: {
      de: `
Echographie = sichere, schnelle Bildgebung ohne Eingriff.<br>
Sehr wichtig in der modernen Medizin.
`,
      fr: `
L’échographie est rapide, sûre et non invasive.<br>
Essentielle en médecine moderne.
`
    }
  }
];

/* ================= NAVIGATION ================= */

function setLanguage(l) {
  lang = l;
  localStorage.setItem("lang", l);
  updateUI();
  goHome();
}

function updateUI() {
  document.getElementById("btnTheory").innerText = texts[lang].theory;
  document.getElementById("btnQuiz").innerText = texts[lang].quiz;

  document.getElementById("btnHome1").innerText = texts[lang].home;
  document.getElementById("btnHome2").innerText = texts[lang].home;
  document.getElementById("btnHome3").innerText = texts[lang].home;

  document.getElementById("btnRestart").innerText = texts[lang].restart;
  document.getElementById("btnRestart2").innerText = texts[lang].restart;

  document.getElementById("theoryTitle").innerText = texts[lang].title;
}

function reset() {
  ["startScreen","theoryScreen","theoryDetailScreen","quizScreen","resultScreen"]
    .forEach(id => document.getElementById(id).style.display = "none");
}

function goHome() {
  reset();
  document.getElementById("startScreen").style.display = "block";
  document.getElementById("restartBtn").style.display = "none";
}

/* ================= THEORY ================= */

function showTheory() {
  reset();
  document.getElementById("theoryScreen").style.display = "block";

  let html = "";
  theoryContent.forEach(t => {
    html += `<button onclick="openTheory('${t.id}')">${t.title[lang]}</button><br>`;
  });

  document.getElementById("theoryMenu").innerHTML = html;
}

function openTheory(id) {
  reset();
  document.getElementById("theoryDetailScreen").style.display = "block";

  const item = theoryContent.find(x => x.id === id);

  document.getElementById("theoryDetailScreen").innerHTML = `
    <button onclick="showTheory()">${texts[lang].back}</button>
    <h2>${item.title[lang]}</h2>
    <div>${item.content[lang]}</div>
  `;
}

/* ================= QUIZ ================= */

function startQuiz() {
  reset();
  document.getElementById("quizScreen").style.display = "block";
  document.getElementById("restartBtn").style.display = "block";
  prepareQuiz(); // MUSS drin sein
  showQuestion();
}

let lang = localStorage.getItem("lang") || "de";
let results = [];
let score = 0;
let index = 0;
let quizQuestions = [];

/* ================= UI TEXT ================= */

const texts = {
  de: {
    theory: "Theorie",
    quiz: "Quiz",
    home: "🏠",
    restart: "🔄",
    back: "Zurück",
    title: "Theorie",
    result: "Score: "
  },
  fr: {
    theory: "Théorie",
    quiz: "Quiz",
    home: "🏠",
    restart: "🔄",
    back: "Retour",
    title: "Théorie",
    result: "Score : "
  }
};

/* ================= QUIZ ================= */
const questions = [
  {
    de: { q: "Was nutzt Echographie?", options: ["Ultraschall", "Licht"] },
    fr: { q: "Que utilise l’échographie ?", options: ["Ultrasons", "Lumière"] },
    a: 0
  },
{
  de: { q: "Was entsteht?", options: ["Bilder", "Geräusche"] },
  fr: { q: "Qu’est-ce qui est créé ?", options: ["Images", "Sons"] },
  a: 0
},
{
  de: { q: "Welche Frequenz wird in der Echographie typischerweise verwendet?", options: ["20–200 Hz", "1–15 MHz"] },
  fr: { q: "Quelle fréquence est utilisée en échographie ?", options: ["20–200 Hz", "1–15 MHz"] },
  a: 1
},
{
  de: { q: "Warum wird Gel bei der Echographie verwendet?", options: ["Um das Gerät zu kühlen", "Um Luft zu entfernen"] },
  fr: { q: "Pourquoi utilise-t-on du gel ?", options: ["Pour refroidir l’appareil", "Pour éliminer l’air"] },
  a: 1
},
{
  de: { q: "Was passiert bei Reflexion?", options: ["Die Welle wird zurückgeworfen", "Die Welle verschwindet"] },
  fr: { q: "Que se passe-t-il lors de la réflexion ?", options: ["L’onde est renvoyée", "L’onde disparaît"] },
  a: 0
},
{
  de: { q: "Welche Struktur erscheint schwarz im Ultraschallbild?", options: ["Knochen", "Flüssigkeit"] },
  fr: { q: "Quelle structure apparaît noire ?", options: ["Os", "Liquide"] },
  a: 1
},
{
  de: { q: "Was bedeutet hyperechogen?", options: ["Sehr dunkel", "Sehr hell"] },
  fr: { q: "Que signifie hyperéchogène ?", options: ["Très sombre", "Très clair"] },
  a: 1
},
{
  de: { q: "Welche Sonde wird für das Herz verwendet?", options: ["Linearsonde", "Phased Array"] },
  fr: { q: "Quelle sonde pour le cœur ?", options: ["Linéaire", "Phased array"] },
  a: 1
},
{
  de: { q: "Warum nutzt man niedrige Frequenzen?", options: ["Für bessere Farbe", "Für tiefere Eindringtiefe"] },
  fr: { q: "Pourquoi utiliser des basses fréquences ?", options: ["Pour améliorer la couleur", "Pour pénétrer plus profondément"] },
  a: 1
},
{
  de: { q: "Was misst das Gerät?", options: ["Zeit des Echos", "Temperatur"] },
  fr: { q: "Que mesure l’appareil ?", options: ["Le temps de retour", "La température"] },
  a: 0
},
{
  de: { q: "Was ist eine longitudinale Welle?", options: ["Schwingung quer dazu", "Schwingung in Ausbreitungsrichtung"] },
  fr: { q: "Qu’est-ce qu’une onde longitudinale ?", options: ["Oscillation perpendiculaire", "Oscillation dans la direction"] },
  a: 1
},
{
  de: { q: "Was passiert bei Absorption?", options: ["Die Welle wird stärker", "Energie wird in Wärme umgewandelt"] },
  fr: { q: "Que se passe-t-il lors de l’absorption ?", options: ["L’onde devient plus forte", "Énergie transformée en chaleur"] },
  a: 1
}
];
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function prepareQuiz() {
  quizQuestions = shuffle([...questions]);
  score = 0;
  index = 0;
  results = []; // RESET Fehlerliste
}

/* ================= THEORIE ================= */

const theoryContent = [
  {
    id: "intro",
    title: { de: "00 Einführung", fr: "00 Introduction" },
    content: {
      de: `
<b>Nicht-invasive Bildgebungsmethode</b><br><br>

Die Echographie ist eine nicht-invasive medizinische Methode. Das bedeutet, dass kein chirurgischer Eingriff notwendig ist und nichts in den Körper eingeführt wird. Sie ist daher schmerzfrei und sicher.<br><br>

Sie basiert auf Ultraschallwellen, also Schallwellen mit hoher Frequenz, die für den Menschen nicht hörbar sind. Diese werden in den Körper gesendet und reflektiert, wodurch ein Bild entsteht.<br><br>

Ein großer Vorteil ist die Echtzeit-Beobachtung von Gewebe. So kann man Bewegungen wie das schlagende Herz direkt sehen.<br><br>

Diese Technik wird in vielen medizinischen Bereichen genutzt, wie Kardiologie oder Schwangerschaft.
`,
      fr: `
<b>Méthode d’imagerie non invasive</b><br><br>

L’échographie est une méthode d’imagerie médicale non invasive, ce qui signifie qu’elle ne nécessite aucune intervention chirurgicale. Elle est donc sans douleur et sans danger.<br><br>

Elle utilise des ultrasons, c’est-à-dire des ondes sonores à haute fréquence, invisibles pour l’oreille humaine. Ces ondes traversent le corps et sont réfléchies pour former une image.<br><br>

Un avantage important est l’observation en temps réel des tissus. On peut voir des mouvements comme le cœur en direct.<br><br>

Elle est utilisée dans plusieurs domaines médicaux, comme la cardiologie ou la grossesse.
`
    }
  },

  {
    id: "ultrasons",
    title: { de: "01 Ultraschall", fr: "01 Ultrasons" },
    content: {
      de: `
<b>Définition der Ultraschallwellen</b><br><br>

„Ultraschall sind mechanische Druckwellen. Es sind Variationen des Drucks, die sich in einem Medium ausbreiten.“<br><br>

Ultraschall sind longitudinale Wellen.<br>
Sie brauchen Teilchen zur Übertragung → im Vakuum nicht möglich.<br><br>

<b>Frequenzen</b><br>
In der Echographie: ca. 1–15 MHz<br><br>

<b>Schallbereiche</b><br>
Infraschall: < 20 Hz<br>
Hörbar: 20 Hz – 20 kHz<br>
Ultraschall: > 20 kHz
`,
      fr: `
<b>Définition des ultrasons</b><br><br>

« Les ultrasons sont des ondes mécaniques de pression. Ce sont des variations de pression qui se propagent dans un milieu. »<br><br>

Les ultrasons sont des ondes longitudinales.<br>
Ils ont besoin d’un milieu matériel → pas de propagation dans le vide.<br><br>

<b>Fréquences</b><br>
Échographie : 1–15 MHz<br><br>

<b>Domaines</b><br>
Infrasons : < 20 Hz<br>
Audible : 20 Hz – 20 kHz<br>
Ultrasons : > 20 kHz
`
    }
  },

  {
    id: "ondes",
    title: { de: "02 Kompression / Rarefaktion", fr: "02 Compression / Raréfaction" },
    content: {
      de: `
<b>Variationen der Druckwellen</b><br><br>

Ultraschall besteht aus Druckänderungen im Medium.<br><br>

<b>Kompression</b><br>
Teilchen werden zusammengedrückt → hoher Druck<br><br>

<b>Rarefaktion</b><br>
Teilchen werden auseinandergezogen → niedriger Druck<br><br>

<b>Zusammenhang</b><br>
Diese Wechsel erzeugen die Welle und ermöglichen die Bildbildung.
`,
      fr: `
<b>Variations de pression</b><br><br>

Les ultrasons sont des variations de pression dans un milieu.<br><br>

<b>Compression</b><br>
Particules rapprochées → pression élevée<br><br>

<b>Raréfaction</b><br>
Particules éloignées → pression faible<br><br>

<b>Lien</b><br>
Ces alternances créent l’onde ultrasonore et l’image.
`
    }
  },

  {
    id: "impedance",
    title: { de: "03 Impedanz & Gewebe", fr: "03 Impédance & tissus" },
    content: {
      de: `
<b>Interaktion mit Gewebe</b><br><br>

• Reflexion → Rückwurf der Welle<br>
• Brechung → Richtungsänderung<br>
• Streuung → Verteilung der Welle<br>
• Absorption → Energieverlust (Wärme)<br><br>

<b>Bildtypen</b><br>
Hyperechogen = weiß (Knochen, Luft)<br>
Hypoechogen = grau (Muskel)<br>
Anechogen = schwarz (Flüssigkeit)<br><br>

<b>Warum Gel?</b><br>
Luft blockiert Ultraschall → Gel ersetzt Luft → bessere Bildqualität
`,
      fr: `
<b>Interactions avec les tissus</b><br><br>

• Réflexion<br>
• Réfraction<br>
• Diffusion<br>
• Absorption<br><br>

<b>Image</b><br>
Hyperéchogène = blanc<br>
Hypoéchogène = gris<br>
Anéchogène = noir<br><br>

<b>Gel</b><br>
Élimine l’air → meilleure transmission des ultrasons
`
    }
  },

  {
    id: "mesure",
    title: { de: "04 Messprinzip", fr: "04 Principe de mesure" },
    content: {
      de: `
<b>Prinzip</b><br>
Zeitmessung des Echos → Entfernung<br><br>

Formel: Entfernung = (v × t) / 2<br><br>

<b>Beispiel Herz</b><br>
Echtzeitbewegung des Herzens sichtbar (Klappen, Blutfluss)
`,
      fr: `
<b>Principe</b><br>
Mesure du temps de retour de l’écho<br><br>

Formule : Distance = (v × t) / 2<br><br>

<b>Cœur</b><br>
Visualisation en temps réel (valves, flux sanguin)
`
    }
  },

  {
    id: "types",
    title: { de: "05 Arten", fr: "05 Types" },
    content: {
      de: `
<b>Echokardiographie</b> → Phased Array (1–5 MHz)<br>
<b>Schwangerschaft</b> → Konvexsonde (2–6 MHz)<br>
<b>Abdomen</b> → Konvex / Linear<br><br>

Weitere: Doppler, Schilddrüse, Notfallsonographie
`,
      fr: `
<b>Échocardiographie</b> → phased array<br>
<b>Grossesse</b> → sonde convexe<br>
<b>Abdomen</b> → convexe / linéaire<br><br>

Autres : Doppler, urgence, thyroïde
`
    }
  },

  {
    id: "conclusion",
    title: { de: "06 Fazit", fr: "06 Conclusion" },
    content: {
      de: `
Echographie = sichere, schnelle Bildgebung ohne Eingriff.<br>
Sehr wichtig in der modernen Medizin.
`,
      fr: `
L’échographie est rapide, sûre et non invasive.<br>
Essentielle en médecine moderne.
`
    }
  }
];

/* ================= NAVIGATION ================= */

function setLanguage(l) {
  lang = l;
  localStorage.setItem("lang", l);
  updateUI();
  goHome();
}

function updateUI() {
  document.getElementById("btnTheory").innerText = texts[lang].theory;
  document.getElementById("btnQuiz").innerText = texts[lang].quiz;

  document.getElementById("btnHome1").innerText = texts[lang].home;
  document.getElementById("btnHome2").innerText = texts[lang].home;
  document.getElementById("btnHome3").innerText = texts[lang].home;

  document.getElementById("btnRestart").innerText = texts[lang].restart;
  document.getElementById("btnRestart2").innerText = texts[lang].restart;

  document.getElementById("theoryTitle").innerText = texts[lang].title;
}

function reset() {
  ["startScreen","theoryScreen","theoryDetailScreen","quizScreen","resultScreen"]
    .forEach(id => document.getElementById(id).style.display = "none");
}

function goHome() {
  reset();
  document.getElementById("startScreen").style.display = "block";
  document.getElementById("restartBtn").style.display = "none";
}

/* ================= THEORY ================= */

function showTheory() {
  reset();
  document.getElementById("theoryScreen").style.display = "block";

  let html = "";
  theoryContent.forEach(t => {
    html += `<button onclick="openTheory('${t.id}')">${t.title[lang]}</button><br>`;
  });

  document.getElementById("theoryMenu").innerHTML = html;
}

function openTheory(id) {
  reset();
  document.getElementById("theoryDetailScreen").style.display = "block";

  const item = theoryContent.find(x => x.id === id);

  document.getElementById("theoryDetailScreen").innerHTML = `
    <button onclick="showTheory()">${texts[lang].back}</button>
    <h2>${item.title[lang]}</h2>
    <div>${item.content[lang]}</div>
  `;
}

/* ================= QUIZ ================= */

function startQuiz() {
  reset();
  document.getElementById("quizScreen").style.display = "block";
  document.getElementById("restartBtn").style.display = "block";
  prepareQuiz(); // MUSS drin sein
  showQuestion();
}

function showQuestion() {
  if (index >= quizQuestions.length) return showResult();

  let q = quizQuestions[index][lang];
let progress = ((index) / quizQuestions.length) * 100;
document.getElementById("progressBar").style.width = progress + "%";
  document.getElementById("question").innerText = q.q;

let options = [...q.options];
let correctIndex = quizQuestions[index].a;

let shuffled = options
  .map((val, i) => ({ val, i }))
  .sort(() => Math.random() - 0.5);

quizQuestions[index].shuffled = shuffled;
quizQuestions[index].currentCorrect = shuffled.findIndex(o => o.i === correctIndex);

document.getElementById("answers").innerHTML = shuffled
  .map((o, i) => `<button onclick="answer(${i})">${o.val}</button>`)
  .join("");

  // WICHTIG: speichere korrekt temporär
  quizQuestions[index].currentCorrect = newCorrectIndex;
}

function answer(val) {
  let current = quizQuestions[index];

  let isCorrect = val === current.currentCorrect;

  if (isCorrect) {
    score++;
  }

  results.push({
    question: current[lang].q,
    options: current.shuffled.map(o => o.val),
    userAnswer: val,
    correctAnswer: current.currentCorrect
  });

  index++;
  showQuestion();
}

function showResult() {
  reset();
  document.getElementById("resultScreen").style.display = "block";

  let html = `
    <h2>${texts[lang].result} ${score}/${quizQuestions.length}</h2>
    <h3>Fehleranalyse</h3>
  `;

  results.forEach(r => {
  let userText = r.options[r.userAnswer];
  let correctText = r.options[r.correctAnswer];

  let isWrong = r.userAnswer !== r.correctAnswer;

  html += `
    <div style="
      background:${isWrong ? '#ffe5e5' : '#e6ffe6'};
      padding:10px;
      margin:10px 0;
      border-radius:10px;
    ">
      <b>${r.question}</b><br><br>
      Deine Antwort: ${userText}<br>
      Richtige Antwort: ${correctText}
    </div>
  `;
});

  document.getElementById("resultText").innerHTML = html;
}

function restartQuiz() {
  score = 0;
  index = 0;
  startQuiz();
}

/* INIT */
updateUI();
goHome();

function answer(val) {
  let current = quizQuestions[index];

  let isCorrect = val === current.currentCorrect;

  if (isCorrect) score++;

  results.push({
    question: current[lang].q,
    shuffledOptions: current.shuffled.map(o => o.val),
    userAnswer: val,
    correctAnswer: current.currentCorrect
  });

  index++;
  showQuestion();
}

  results.push({
    question: current[lang].q,
    options: current[lang].options,
    userAnswer: val,
    correctAnswer: current.a
  });

  index++;
  showQuestion();
}

function showResult() {
  reset();
  document.getElementById("resultScreen").style.display = "block";

  let html = `
    <h2>${texts[lang].result} ${score}/${quizQuestions.length}</h2>
    <h3>Fehleranalyse</h3>
  `;

  results.forEach(r => {
    let userText = r.shuffledOptions[r.userAnswer];
let correctText = r.shuffledOptions[r.correctAnswer];

    let isWrong = r.userAnswer !== r.correctAnswer;

    html += `
      <div style="
        background:${isWrong ? '#ffe5e5' : '#e6ffe6'};
        padding:10px;
        margin:10px 0;
        border-radius:10px;
      ">
        <b>${r.question}</b><br><br>
        Deine Antwort: ${userText}<br>
        Richtige Antwort: ${correctText}
      </div>
    `;
  });

  document.getElementById("resultText").innerHTML = html;
}

function restartQuiz() {
  score = 0;
  index = 0;
  startQuiz();
}

/* INIT */
updateUI();
goHome();
