/* =========================
   STATE
========================= */

let lang = localStorage.getItem("lang") || "de";

let index = 0;
let score = 0;
let quiz = [];
let results = [];

let currentScreen = "home";
let screenHistory = [];

let startX = 0;
let startY = 0;

/* =========================
   SCREEN SYSTEM
========================= */

function setScreen(id, save = true) {
  const current = document.querySelector(".screen:not(.hidden)");

  if (current && save && current.id !== id) {
    screenHistory.push(current.id);
  }

  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));

  const target = document.getElementById(id);
  if (!target) {
    console.error("Screen not found:", id);
    return;
  }

  target.classList.remove("hidden");

  currentScreen = id;
  updateNav();
}

function goBack() {
  const last = screenHistory.pop();
  if (!last) return goHome();
  setScreen(last, false);
}

function goHome() {
  screenHistory = [];
  setScreen("home", false);
}

/* =========================
   NAV
========================= */

function updateNav() {
  const nav = document.getElementById("nav");
  if (!nav) return;

  const backBtn = document.getElementById("backBtn");
  const restartBtn = document.getElementById("restartBtn");

  nav.classList.toggle("hidden", currentScreen === "home");

  if (backBtn) backBtn.style.display = currentScreen === "home" ? "none" : "inline-block";
  if (restartBtn) restartBtn.style.display = currentScreen === "quiz" ? "inline-block" : "none";
}

/* =========================
   TEXT
========================= */

const T = {
  de: {
    your: "Deine Antwort:",
    correct: "Richtige Antwort:",
    qa: "🙋‍♀️ Fragen & Antworten",
    qaBtn: "🙋‍♀️ Fragen & Antworten"
  },
  fr: {
    your: "Ta réponse :",
    correct: "Bonne réponse :",
    qa: "🙋‍♀️ Questions & Réponses",
    qaBtn: "🙋‍♀️ Questions & Réponses"
  }
};
function updateLanguageUI() {
  document.getElementById("qaBtn").innerText = T[lang].qaBtn;
}
/* =========================
   THEORY
========================= */

const theory = [
  {
    de: {
      title: "Einführung",
      text: "Echographie ist eine sichere Echtzeit-Ultraschallmethode ohne Strahlung. Sie nutzt reflektierte Schallwellen, um Organe sichtbar zu machen."
    },
    fr: {
      title: "Introduction",
      text: "L’échographie est une méthode en temps réel sans radiation. Elle utilise la réflexion des ultrasons pour visualiser les organes."
    }
  },
  {
    de: {
      title: "Ultraschall",
      text: "Ultraschall sind mechanische Wellen über 20 kHz. In der Medizin nutzt man 1–15 MHz für hohe Auflösung."
    },
    fr: {
      title: "Ultrasons",
      text: "Les ultrasons sont des ondes mécaniques >20 kHz. En médecine : 1–15 MHz pour une bonne résolution."
    }
  },
  {
    de: {
      title: "Impedanz",
      text: "Die akustische Impedanz bestimmt, wie viel Schall reflektiert wird. Große Unterschiede erzeugen starke Echos."
    },
    fr: {
      title: "Impédance",
      text: "L’impédance acoustique détermine la réflexion du son. Une grande différence crée un fort écho."
    }
  },
  {
    de: {
      title: "Typen",
      text: "2D = Schnittbild, 3D = Volumen, 4D = Bewegung, Doppler = Blutfluss."
    },
    fr: {
      title: "Types",
      text: "2D = coupe, 3D = volume, 4D = mouvement, Doppler = flux sanguin."
    }
  }
];

/* =========================
   Q&A
========================= */

const qa = [
  {
    de: {
      q: "Was ist Impedanz?",
      a: "Produkt aus Dichte und Schallgeschwindigkeit. Bestimmt Reflexion."
    },
    fr: {
      q: "Qu’est-ce que l’impédance ?",
      a: "Produit densité × vitesse du son. Détermine la réflexion."
    }
  },
  {
    de: {
      q: "Warum Gel?",
      a: "Entfernt Luft → bessere Übertragung."
    },
    fr: {
      q: "Pourquoi gel ?",
      a: "Élimine l’air → meilleure transmission."
    }
  }
];

/* =========================
   QUIZ
========================= */

const questions = [
  {
    de: { q: "Was nutzt Echographie?", o: ["Ultraschall", "Licht", "Magnet"] },
    fr: { q: "Que utilise l’échographie ?", o: ["Ultrasons", "Lumière", "Champ"] },
    a: 0
  },
  {
    de: { q: "Schwarz im Bild?", o: ["Flüssigkeit", "Knochen", "Metall"] },
    fr: { q: "Noir sur l’image ?", o: ["Liquide", "Os", "Métal"] },
    a: 0
  },
  {
    de: { q: "Doppler misst?", o: ["Blutfluss", "Licht", "Zeit"] },
    fr: { q: "Doppler mesure ?", o: ["Flux sanguin", "Lumière", "Temps"] },
    a: 0
  }
];

/* =========================
   QUIZ LOGIC
========================= */

function startQuiz() {
  index = 0;
  score = 0;
  results = [];

  quiz = questions.map(q => ({
    q: q[lang].q,
    o: q[lang].o,
    a: q.a
  }));

  setScreen("quiz");
  showQuestion();
}

function showQuestion() {
  if (index >= quiz.length) return showResult();

  const q = quiz[index];

  document.getElementById("question").innerText = q.q;
document.getElementById("fill").style.width =
  (index / quiz.length * 100) + "%";
  document.getElementById("answers").innerHTML =
    q.o.map((t, i) =>
      `<button onclick="answer(${i})">${t}</button>`
    ).join("");
}

function answer(i) {
  const q = quiz[index];

  if (i === q.a) score++;

  results.push({
    q: q.q,
    o: q.o,
    u: i,
    c: q.a
  });

  index++;
  showQuestion();
}

/* =========================
   RESULT
========================= */

function showResult() {
  setScreen("result");

  document.getElementById("score").innerText =
    `Score: ${score}/${quiz.length}`;

  document.getElementById("results").innerHTML =
    results.map(r => `
      <div>
        <b>${r.q}</b><br>
        ${T[lang].your} ${r.o[r.u]}<br>
        ${T[lang].correct} ${r.o[r.c]}
      </div>
    `).join("");
}

/* =========================
   THEORY UI
========================= */

function showTheory() {
  setScreen("theory");

  document.getElementById("theoryMenu").innerHTML =
    theory.map((t, i) => `
      <button onclick="openTheory(${i})">${t[lang].title}</button>
    `).join("");
}

function openTheory(i) {
  setScreen("theoryDetail");

  const t = theory[i][lang];

  document.getElementById("theoryDetail").innerHTML = `
    <h2>${t.title}</h2>
    <p>${t.text}</p>
    <button onclick="showTheory()">Back</button>
  `;
}

/* =========================
   QA UI
========================= */

function showQA() {
  setScreen("qa");

  document.getElementById("qaMenu").innerHTML =
    qa.map((item, i) => `
      <button onclick="openQA(${i})">${item[lang].q}</button>
    `).join("");
}

function openQA(i) {
  setScreen("qaDetail");

  const item = qa[i][lang];

  document.getElementById("qaDetail").innerHTML = `
    <h2>${item.q}</h2>
    <p>${item.a}</p>
    <button onclick="showQA()">Back</button>
  `;
}

/* =========================
   LANG
========================= */

function setLang(l) {
  lang = l;
  localStorage.setItem("lang", l);

  updateLanguageUI(); 

  goHome();
}

/* =========================
   SWIPE BACK
========================= */

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
  startY = e.touches[0].clientY;
});

document.addEventListener("touchend", e => {
  let dx = e.changedTouches[0].clientX - startX;
  let dy = e.changedTouches[0].clientY - startY;

  if (dx > 80 && Math.abs(dy) < 50) {
    goBack();
  }
});

/* =========================
   INIT
========================= */
updateLanguageUI();
goHome();
updateNav();
