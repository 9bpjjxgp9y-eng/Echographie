let lang = localStorage.getItem("lang") || "de";

let score = 0;
let index = 0;

const texts = {
  de: {
    theory: "Theorie",
    quiz: "Quiz starten",
    home: "🏠",
    restart: "🔄",
    theoryTitle: "Theorie",
    result: "Score🧑‍🏫 : "
  },
  fr: {
    theory: "Théorie",
    quiz: "Commencer le quiz",
    home: "🏠",
    restart: "🔄",
    theoryTitle: "Théorie",
    result: "Score👨‍🏫 : "
  }
};

const theory = {
  de: "Echographie nutzt Ultraschallwellen, um Bilder im Körper zu erzeugen.",
  fr: "L’échographie utilise des ultrasons pour créer des images du corps."
};

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

function setLanguage(l) {
  lang = l;
  localStorage.setItem("lang", l);
  updateUI();
}

function updateUI() {
  document.getElementById("btnTheory").innerText = texts[lang].theory;
  document.getElementById("btnQuiz").innerText = texts[lang].quiz;

  document.getElementById("btnHome1").innerText = texts[lang].home;
  document.getElementById("btnHome2").innerText = texts[lang].home;
  document.getElementById("btnHome3").innerText = texts[lang].home;

  document.getElementById("btnRestart").innerText = texts[lang].restart;
  document.getElementById("btnRestart2").innerText = texts[lang].restart;

  document.getElementById("theoryTitle").innerText = texts[lang].theoryTitle;
}

function resetScreens() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("theoryScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "none";
}

function goHome() {
  resetScreens();
  document.getElementById("startScreen").style.display = "block";
}

function showTheory() {
  resetScreens();
  document.getElementById("theoryScreen").style.display = "block";
  document.getElementById("theoryText").innerText = theory[lang];
}

function startQuiz() {
  resetScreens();
  document.getElementById("quizScreen").style.display = "block";
  showQuestion();
}

function showQuestion() {
  if (index >= questions.length) {
    showResult();
    return;
  }

  let q = questions[index][lang];

  document.getElementById("question").innerText = q.q;

  document.getElementById("answers").innerHTML = `
    <button onclick="answer(0)">${q.options[0]}</button>
    <button onclick="answer(1)">${q.options[1]}</button>
  `;
}

function answer(val) {
  if (val === questions[index].a) {
    score++;
  }

  index++;
  showQuestion();
}

function showResult() {
  resetScreens();
  document.getElementById("resultScreen").style.display = "block";

  document.getElementById("resultText").innerText =
    texts[lang].result + score + "/" + questions.length;
}

function restartQuiz() {
  score = 0;
  index = 0;
  startQuiz();
}

updateUI();
goHome();
