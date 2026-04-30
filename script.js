let lang = localStorage.getItem("lang") || "de";

let score = 0;
let index = 0;

const texts = {
  de: {
    theory: "Theorie",
    quiz: "Quiz",
    home: "🏠",
    restart: "🔄",
    theoryTitle: "Theorie",
    result: "Score🧑‍🏫 : "
  },
  fr: {
    theory: "Théorie",
    quiz: "Quiz",
    home: "🏠",
    restart: "🔄",
    theoryTitle: "Théorie",
    result: "Score👨‍🏫 : "
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
const theoryContent = [
  {
    id: "intro",
    title: {
      de: "00 Einführung",
      fr: "00 Introduction"
    },
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
    title: {
      de: "01 Ultraschall",
      fr: "01 Ultrasons"
    },
    content: {
      de: "Definition von Ultraschall + Erklärung + Hörtest...",
      fr: "Définition des ultrasons + explication + test d’audibilité..."
    }
  },

  {
    id: "ondes",
    title: {
      de: "02 Kompression / Rarefaktion",
      fr: "02 Compression / Rarefaction"
    },
    content: {
      de: "Erklärung der Wellenphasen und Bildentstehung...",
      fr: "Explication des phases des ondes et formation de l’image..."
    }
  },

  {
    id: "impedance",
    title: {
      de: "03 Impedanz & Gewebe",
      fr: "03 Impédance & tissus"
    },
    content: {
      de: "Interaktion mit Gewebe und akustische Impedanz...",
      fr: "Interaction avec les tissus et impédance acoustique..."
    }
  },

  {
    id: "mesure",
    title: {
      de: "04 Messprinzip",
      fr: "04 Principe de mesure"
    },
    content: {
      de: "Messung der Echo-Zeit und Bildberechnung...",
      fr: "Mesure du temps des échos et calcul de l’image..."
    }
  },

  {
    id: "types",
    title: {
      de: "05 Arten der Echographie",
      fr: "05 Types d’échographie"
    },
    content: {
      de: "Echokardiographie, Schwangerschaft, Abdomen, 2D/3D/4D/Doppler...",
      fr: "Échocardiographie, grossesse, abdomen, 2D/3D/4D/Doppler..."
    }
  },

  {
    id: "conclusion",
    title: {
      de: "06 Fazit",
      fr: "06 Conclusion"
    },
    content: {
      de: "Zusammenfassung der wichtigsten Punkte...",
      fr: "Résumé des points essentiels..."
    }
  }
];
function showTheory() {
  resetScreens();
  document.getElementById("theoryScreen").style.display = "block";

  let menuHTML = "";

  theoryContent.forEach(item => {
    menuHTML += `
      <button onclick="openDetail('${item.id}')">
        ${item.title[lang]}
      </button><br>
    `;
  });

  document.getElementById("theoryMenu").innerHTML = menuHTML;
}

function openDetail(id) {
  resetScreens();
  document.getElementById("theoryDetailScreen").style.display = "block";

  let item = theoryContent.find(x => x.id === id);

  document.getElementById("detailTitle").innerText =
    item.title[lang];

document.getElementById("detailContent").innerHTML =
  item.content[lang];
}

function backToTheory() {
  showTheory();
}
