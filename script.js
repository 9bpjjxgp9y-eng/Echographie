let lang = localStorage.getItem("lang") || "de";

function setLanguage(l) {
  lang = l;
  localStorage.setItem("lang", l);
  renderUI();
}

let score = 0;
let questionIndex = 0;

const texts = {
  de: {
    title: "Meine Echographie App",
    btnInfo: "Was ist Echographie?",
    btnQuiz: "Quiz starten",
    info: "Echographie nutzt Ultraschallwellen, um Bilder im Körper zu erzeugen.",
    quizDone: "Quiz fertig! Punkte: "
  },
  fr: {
    title: "Mon application d’échographie",
    btnInfo: "Qu’est-ce que l’échographie ?",
    btnQuiz: "Commencer le quiz",
    info: "L’échographie utilise des ultrasons pour créer des images du corps.",
    quizDone: "Quiz terminé ! Points : "
  }
};

const questions = [
  {
    de: "Was nutzt Echographie?",
    fr: "Que utilise l’échographie ?",
    a: "ultraschall"
  },
  {
    de: "Was wird erzeugt?",
    fr: "Qu’est-ce qui est créé ?",
    a: "bilder"
  }
];

function setLanguage(l) {
  lang = l;
  document.getElementById("title").innerText = texts[lang].title;
  document.getElementById("btnInfo").innerText = texts[lang].btnInfo;
  document.getElementById("btnQuiz").innerText = texts[lang].btnQuiz;
}

function showInfo() {
  document.getElementById("output").innerText = texts[lang].info;
}

function quiz() {
  if (questionIndex >= questions.length) {
    alert(texts[lang].quizDone + score + "/" + questions.length);
    score = 0;
    questionIndex = 0;
    return;
  }

  let q = questions[questionIndex];

  let questionText = lang === "de" ? q.de : q.fr;

  document.getElementById("output").innerHTML = `
    <h3>${questionText}</h3>
    <button onclick="answer('ultraschall')">Ultraschall</button>
    <button onclick="answer('licht')">Licht</button>
  `;
}

  let q = lang === "de" ? questions[questionIndex].de : questions[questionIndex].fr;

  let answer = prompt(q);

  if (answer && answer.toLowerCase() === questions[questionIndex].a) {
    score++;
    alert("✔");
  } else {
    alert("✘");
  }

  questionIndex++;
}
function renderUI() {
  document.getElementById("title").innerText = texts[lang].title;
  document.getElementById("btnInfo").innerText = texts[lang].btnInfo;
  document.getElementById("btnQuiz").innerText = texts[lang].btnQuiz;
  document.getElementById("output").innerText = "";
}

renderUI();
function answer(val) {
  if (val === questions[questionIndex].a) {
    score++;
  }

  questionIndex++;
  quiz();
}
