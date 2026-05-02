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

/* ================= UI ================= */

function setLanguage(l) {
  lang = l;
  localStorage.setItem("lang", l);
  updateUI();
  goHome();
}

function updateUI() {
  const t = texts[lang];

  const set = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  };

  set("btnTheory", t.theory);
  set("btnQuiz", t.quiz);
  set("btnHome1", t.home);
  set("btnHome2", t.home);
  set("btnHome3", t.home);
  set("btnRestart", t.restart);
  set("theoryTitle", t.title);
}

/* ================= NAV ================= */

function resetScreens() {
  const screens = [
    "startScreen",
    "theoryScreen",
    "theoryDetailScreen",
    "quizScreen",
    "resultScreen"
  ];

  screens.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });
}

function goHome() {
  resetScreens();
  document.getElementById("startScreen").style.display = "block";
}

/* ================= THEORY ================= */

function showTheory() {
  resetScreens();
  document.getElementById("theoryScreen").style.display = "block";

  document.getElementById("theoryMenu").innerHTML =
    theoryContent
      .map(t => `<button onclick="openTheory('${t.id}')">${t.title[lang]}</button>`)
      .join("<br>");
}

function openTheory(id) {
  const item = theoryContent.find(t => t.id === id);
  if (!item) return;

  resetScreens();
  document.getElementById("theoryDetailScreen").style.display = "block";

  document.getElementById("theoryDetailScreen").innerHTML = `
    <button onclick="showTheory()">${texts[lang].back}</button>
    <h2>${item.title[lang]}</h2>
    <p>${item.content[lang]}</p>
  `;
}

/* ================= QUIZ ================= */

function startQuiz() {
  resetScreens();
  document.getElementById("quizScreen").style.display = "block";

  score = 0;
  index = 0;
  results = [];

  quizQuestions = shuffle([...questions]);
  showQuestion();
}

function showQuestion() {
  if (index >= quizQuestions.length) return showResult();

  const q = quizQuestions[index][lang];

  document.getElementById("question").innerText = q.q;

  document.getElementById("answers").innerHTML =
    q.options
      .map((o, i) => `<button onclick="answer(${i})">${o}</button>`)
      .join("");
}

function answer(selected) {
  const current = quizQuestions[index];

  const correct = current.a;
  const isCorrect = selected === correct;

  if (isCorrect) score++;

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
  document.getElementById("resultScreen").style.display = "block";

  document.getElementById("scoreText").innerText =
    `${texts[lang].result} ${score}/${quizQuestions.length}`;

  document.getElementById("resultList").innerHTML =
  results.map(r => {
    const isWrong = r.user !== r.correct;

    return `
      <div style="
        margin:10px;
        padding:10px;
        border-radius:10px;
        background:${isWrong ? '#ffe5e5' : '#e6ffe6'};
      ">
        <b>${r.question}</b><br><br>
        ${texts[lang].yourAnswer} ${r.options[r.user]}<br>
        ${texts[lang].correctAnswer} ${r.options[r.correct]}
      </div>
    `;
  }).join("");
}
function restartQuiz() {
  score = 0;
  index = 0;
  results = [];
  quizQuestions = shuffle([...questions]);

  resetScreens();
  document.getElementById("quizScreen").style.display = "block";

  showQuestion();
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

updateUI();
goHome();
