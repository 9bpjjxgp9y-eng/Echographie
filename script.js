/* ================= STATE ================= */

let lang = localStorage.getItem("lang") || "de";
let score = 0;
let index = 0;
let quizQuestions = [];
let results = [];

/* ================= DATA ================= */

const texts = {
  de: {
  theory: "Theorie",
  quiz: "Quiz",
  home: "🏠",
  restart: "🔄",
  back: "Zurück",
  title: "Theorie",
  result: "Score: ",
  yourAnswer: "Deine Antwort:",
  correctAnswer: "Richtige Antwort:"
},
fr: {
  theory: "Théorie",
  quiz: "Quiz",
  home: "🏠",
  restart: "🔄",
  back: "Retour",
  title: "Théorie",
  result: "Score : ",
  yourAnswer: "Ta réponse :",
  correctAnswer: "Bonne réponse :"
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
    de: { q: "Welche Frequenz wird verwendet?", options: ["20–200 Hz", "1–15 MHz"] },
    fr: { q: "Quelle fréquence est utilisée ?", options: ["20–200 Hz", "1–15 MHz"] },
    a: 1
  },
  {
    de: { q: "Warum wird Gel verwendet?", options: ["Kühlen", "Luft entfernen"] },
    fr: { q: "Pourquoi du gel ?", options: ["Refroidir", "Enlever l’air"] },
    a: 1
  },
  {
    de: { q: "Was passiert bei Reflexion?", options: ["Zurückgeworfen", "Verschwindet"] },
    fr: { q: "Réflexion ?", options: ["Renvoi", "Disparition"] },
    a: 0
  },
  {
    de: { q: "Welche Struktur ist schwarz?", options: ["Knochen", "Flüssigkeit"] },
    fr: { q: "Structure noire ?", options: ["Os", "Liquide"] },
    a: 1
  },
  {
    de: { q: "Was bedeutet hyperechogen?", options: ["Dunkel", "Hell"] },
    fr: { q: "Hyperéchogène ?", options: ["Sombre", "Clair"] },
    a: 1
  },
  {
    de: { q: "Sonde für Herz?", options: ["Linear", "Phased Array"] },
    fr: { q: "Sonde cœur ?", options: ["Linéaire", "Phased array"] },
    a: 1
  },
  {
    de: { q: "Warum niedrige Frequenz?", options: ["Farbe", "Tiefe"] },
    fr: { q: "Basses fréquences ?", options: ["Couleur", "Profondeur"] },
    a: 1
  },
  {
    de: { q: "Was misst das Gerät?", options: ["Zeit", "Temperatur"] },
    fr: { q: "Que mesure-t-il ?", options: ["Temps", "Température"] },
    a: 0
  },
  {
    de: { q: "Longitudinale Welle?", options: ["Quer", "In Richtung"] },
    fr: { q: "Onde longitudinale ?", options: ["Transversale", "Longitudinale"] },
    a: 1
  },
  {
    de: { q: "Absorption?", options: ["Stärker", "Wärme"] },
    fr: { q: "Absorption ?", options: ["Plus fort", "Chaleur"] },
    a: 1
  }
];

/* ================= THEORY ================= */

const theoryContent = [
  {
    id: "intro",
    title: { de: "Einführung", fr: "Introduction" },
    content: {
      de: "Echographie ist eine nicht-invasive Bildgebung mit Ultraschall.",
      fr: "L’échographie est une imagerie non invasive par ultrasons."
    }
  },
  {
    id: "ultraschall",
    title: { de: "Ultraschall", fr: "Ultrasons" },
    content: {
      de: "Ultraschall sind mechanische longitudinale Wellen.",
      fr: "Les ultrasons sont des ondes mécaniques longitudinales."
    }
  },
  {
    id: "kompression",
    title: { de: "Kompression", fr: "Compression" },
    content: {
      de: "Kompression + Rarefaktion erzeugen die Welle.",
      fr: "Compression + raréfaction créent l’onde."
    }
  },
  {
    id: "impedanz",
    title: { de: "Impedanz", fr: "Impédance" },
    content: {
      de: "Reflexion, Brechung, Streuung und Absorption formen das Bild.",
      fr: "Réflexion, réfraction, diffusion et absorption forment l’image."
    }
  },
  {
    id: "messung",
    title: { de: "Messprinzip", fr: "Mesure" },
    content: {
      de: "Entfernung = (v × t) / 2",
      fr: "Distance = (v × t) / 2"
    }
  },
  {
    id: "arten",
    title: { de: "Arten", fr: "Types" },
    content: {
      de: "Phased Array für Herz, Konvex für Schwangerschaft.",
      fr: "Phased array pour le cœur, convexe pour grossesse."
    }
  }
];

/* ================= UI HELPERS ================= */

function $(id) {

  return document.getElementById(id);

}

function setText(id, value) {

  const el = $(id);

  if (el) el.innerText = value;

}

/* ================= NAV ================= */

function resetScreens() {

  ["startScreen", "theoryScreen", "theoryDetailScreen", "quizScreen", "resultScreen"]

    .forEach(id => {

      const el = $(id);

      if (el) el.style.display = "none";

    });

}

/* ================= HOME ================= */

function goHome() {

  resetScreens();

  $("startScreen").style.display = "flex";

  hideNav();

}

/* ================= THEORY ================= */

function showTheory() {

  resetScreens();

  $("theoryScreen").style.display = "block";

  showNav();

}

/* ================= QUIZ ================= */

function startQuiz() {

  score = 0;

  index = 0;

  results = [];

  quizQuestions = shuffle([...questions]);

  resetScreens();

  $("quizScreen").style.display = "block";

  showNav();

  showQuestion();

}

function showQuestion() {

  if (index >= quizQuestions.length) return showResult();

  const q = quizQuestions[index][lang];

  $("question").innerText = q.q;

  $("answers").innerHTML = q.options.map((o, i) =>

    `<button onclick="answer(${i})">${o}</button>`

  ).join("");

}

function answer(selected) {

  const current = quizQuestions[index];

  const correct = current.a;

  if (selected === correct) score++;

  results.push({

    question: current[lang].q,

    options: current[lang].options,

    user: selected,

    correct: correct

  });

  index++;

  showQuestion();

}

/* ================= RESULT ================= */

function showResult() {

  resetScreens();

  $("resultScreen").style.display = "block";

  $("scoreText").innerText =

    `${texts[lang].result} ${score}/${quizQuestions.length}`;

  $("resultList").innerHTML = results.map(r => {

    const wrong = r.user !== r.correct;

    return `

      <div style="margin:10px;padding:10px;border-radius:10px;

      background:${wrong ? "#ffe5e5" : "#e6ffe6"}">

        <b>${r.question}</b><br><br>

        ${texts[lang].yourAnswer} ${r.options[r.user]}<br>

        ${texts[lang].correctAnswer} ${r.options[r.correct]}

      </div>

    `;

  }).join("");

  showNav();

}

/* ================= RESTART ================= */

function restartQuiz() {

  startQuiz();

}

/* ================= LANGUAGE ================= */

function setLanguage(l) {

  lang = l;

  localStorage.setItem("lang", l);

  goHome();

}

/* ================= UI NAV CONTROL ================= */

function showNav() {

  const nav = document.querySelector(".nav");

  if (nav) nav.style.display = "flex";

}

function hideNav() {

  const nav = document.querySelector(".nav");

  if (nav) nav.style.display = "none";

}

/* ================= UTIL ================= */

function shuffle(arr) {

  const a = [...arr];

  for (let i = a.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [a[i], a[j]] = [a[j], a[i]];

  }

  return a;

}

/* ================= INIT ================= */

goHome();
