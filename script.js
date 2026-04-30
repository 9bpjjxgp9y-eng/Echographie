let lang = localStorage.getItem("lang") || "de";

let score = 0;
let index = 0;

const texts = {
  de: {
    start: "Quiz starten",
    theory: "Theorie",
    home: "Zur Startseite",
    back: "Zurück",
    result: "Score: ",
    quizDone: "Quiz fertig! Punkte: "
  },
  fr: {
    start: "Commencer le quiz",
    theory: "Théorie",
    home: "Accueil",
    back: "Retour",
    result: "Score : ",
    quizDone: "Quiz terminé ! Points : "
  }
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

const theory = {
  de: "Echographie nutzt Ultraschallwellen, um Bilder im Körper zu erzeugen.",
  fr: "L’échographie utilise des ultrasons pour créer des images du corps."
};

function setLanguage(l) {
  lang = l;
  localStorage.setItem("lang", l);
}

function startQuiz() {
  reset();
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
  reset();
  document.getElementById("resultScreen").style.display = "block";

  document.getElementById("resultText").innerText =
    texts[lang].result + score + "/" + questions.length;
}

function goHome() {
  reset();
  document.getElementById("startScreen").style.display = "block";
}

function showTheory() {
  reset();
  document.getElementById("theoryScreen").style.display = "block";
  document.getElementById("theoryText").innerText = theory[lang];
}

function reset() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "none";
  document.getElementById("theoryScreen").style.display = "none";
}
