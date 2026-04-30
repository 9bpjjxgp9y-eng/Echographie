let score = 0;
let questionIndex = 0;

const questions = [
  {
    q: "Was nutzt Echographie?",
    a: "ultraschall"
  },
  {
    q: "Was wird bei der Echographie erzeugt?",
    a: "bilder"
  },
  {
    q: "Welche Wellen werden gesendet?",
    a: "schallwellen"
  }
];

function showInfo() {
  document.getElementById("output").innerText =
    "Echographie nutzt Ultraschallwellen, die im Körper reflektiert werden.";
}

function quiz() {
  if (questionIndex >= questions.length) {
    alert("Quiz fertig! Punkte: " + score + "/" + questions.length);
    score = 0;
    questionIndex = 0;
    return;
  }

  let userAnswer = prompt(questions[questionIndex].q);

  if (userAnswer && userAnswer.toLowerCase() === questions[questionIndex].a) {
    score++;
    alert("Richtig!");
  } else {
    alert("Falsch! Richtige Antwort: " + questions[questionIndex].a);
  }

  questionIndex++;
}
