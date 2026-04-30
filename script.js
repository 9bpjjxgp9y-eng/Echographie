let lang = localStorage.getItem("lang") || "de";

let score = 0;
let index = 0;

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
  }
];

/* ================= THEORIE ================= */

const theoryContent = [
  {
    id: "intro",
    title: { de: "00 Einführung", fr: "00 Introduction" },
    content: {
      de: "Nicht-invasive Bildgebungsmethode... (DE TEXT)",
      fr: "Méthode d’imagerie non invasive... (FR TEXT)"
    }
  },
  {
    id: "ultrasons",
    title: { de: "01 Ultraschall", fr: "01 Ultrasons" },
    content: {
      de: "Ultraschall = Druckwellen... (DE TEXT)",
      fr: "Ultrasons = ondes de pression... (FR TEXT)"
    }
  },
  {
    id: "ondes",
    title: { de: "02 Kompression / Rarefaktion", fr: "02 Compression / Raréfaction" },
    content: {
      de: "Kompression = Druck hoch... Rarefaktion... (DE TEXT)",
      fr: "Compression... Raréfaction... (FR TEXT)"
    }
  },
  {
    id: "impedance",
    title: { de: "03 Impedanz & Gewebe", fr: "03 Impédance & tissus" },
    content: {
      de: "Reflexion, Brechung, Streuung... Gel... (DE TEXT)",
      fr: "Réflexion, réfraction... gel... (FR TEXT)"
    }
  },
  {
    id: "mesure",
    title: { de: "04 Messprinzip", fr: "04 Principe de mesure" },
    content: {
      de: "Zeitmessung → Entfernung... Herz Beispiel...",
      fr: "Temps → distance... cœur..."
    }
  },
  {
    id: "types",
    title: { de: "05 Arten", fr: "05 Types" },
    content: {
      de: "Herz, Schwangerschaft, Abdomen...",
      fr: "Cœur, grossesse, abdomen..."
    }
  },
  {
    id: "conclusion",
    title: { de: "06 Fazit", fr: "06 Conclusion" },
    content: {
      de: "Echographie ist wichtig, sicher, schnell.",
      fr: "L’échographie est rapide et sûre."
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
  showQuestion();
}

function showQuestion() {
  if (index >= questions.length) return showResult();

  let q = questions[index][lang];

  document.getElementById("question").innerText = q.q;

  document.getElementById("answers").innerHTML = `
    <button onclick="answer(0)">${q.options[0]}</button>
    <button onclick="answer(1)">${q.options[1]}</button>
  `;
}

function answer(val) {
  if (val === questions[index].a) score++;
  index++;
  showQuestion();
}

function showResult() {
  reset();
  document.getElementById("resultScreen").style.display = "block";

  document.getElementById("resultText").innerText =
    texts[lang].result + score + "/" + questions.length;
}

function restartQuiz() {
  score = 0;
  index = 0;
  startQuiz();
}

/* INIT */
updateUI();
goHome();
