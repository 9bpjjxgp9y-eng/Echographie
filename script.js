let lang = localStorage.getItem("lang") || "de";

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
    de: {
      q: "Was nutzt Echographie?",
      options: ["Ultraschall", "Licht"]
    },
    fr: {
      q: "Que utilise l’échographie ?",
      options: ["Ultrasons", "Lumière"]
    },
    a: 0
  },
  {
    de: {
      q: "Was wird erzeugt?",
      options: ["Bilder", "Geräusche"]
    },
    fr: {
      q: "Qu’est-ce qui est créé ?",
      options: ["Images", "Sons"]
    },
    a: 0
  }
];

function setLanguage(l) {
  lang = l;
  localStorage.setItem("lang", l);
  renderUI();
}

function renderUI() {
  document.getElementById("title").innerText = texts[lang].title;
  document.getElementById("btnInfo").innerText = texts[lang].btnInfo;
  document.getElementById("btnQuiz").innerText = texts[lang].btnQuiz;
  document.getElementById("output").innerText = "";
}

function showInfo() {
  document.getElementById("output").innerText = texts[lang].info;
}

function quiz() {
  if (questionIndex >= questions.length) {
    alert(texts[lang].quizDone + score + "/" + questions.length);
    score = 0;
    questionIndex = 0;
    renderUI();
    return;
  }

  let q = questions[questionIndex][lang];

  document.getElementById("output").innerHTML = `
    <h3>${q.q}</h3>
    <button onclick="answer(0)">${q.options[0]}</button>
    <button onclick="answer(1)">${q.options[1]}</button>
  `;
}

function answer(val) {
  if (val === questions[questionIndex].a) {
    score++;
  }

  questionIndex++;
  quiz();
}

// Start
renderUI();
