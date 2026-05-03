/* =====================
   STATE
===================== */

let lang = localStorage.getItem("lang") || "de";
let index = 0;
let score = 0;
let quiz = [];
let results = [];
let history = [];
let current = "home";
let startX = 0;
let startY = 0;

/* =========================
   SCREEN SYSTEM
========================= */

let currentScreen = "home";
let screenHistory = [];

function setScreen(id) {
  if (currentScreen !== id) {
    screenHistory.push(currentScreen);
  }

  document.querySelectorAll(".screen").forEach(s => {
    s.style.display = "none";
  });

  const target = document.getElementById(id);
  if (!target) return;

  target.style.display = "block";

  currentScreen = id;
}

function goBack() {
  const last = screenHistory.pop();
  if (!last) return goHome();
  setScreen(last);
}

function goHome() {
  screenHistory = [];
  setScreen("home");
}

/* =====================

   HOME

===================== */

function goHome() {

  history = [];

  setScreen("home");

}

/* =========================
   NAV
========================= */

function setScreen(id) {

  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));

  document.getElementById(id).classList.add("active");

  current = id;

}



/* =========================
   TEXT
========================= */

const T = {
  de: {
    your: "Deine Antwort:",
    correct: "Richtige Antwort:",
    qa: "🙋‍♀️ Fragen & Antworten",
  },
  fr: {
    your: "Ta réponse :",
    correct: "Bonne réponse :",
    qa: "🙋‍♀️ Questions & Réponses",
  }
};
/* =========================
   THEORY
========================= */

const theory = [
  {
    de: {
      title: "Einführung",
      text: "Echographie ist eine sichere Echtzeit-Ultraschallmethode zur medizinischen Bildgebung. Sie arbeitet ohne ionisierende Strahlung und nutzt Reflexionen von Schallwellen, um innere Strukturen sichtbar zu machen. Besonders wichtig ist sie, weil sie nicht invasiv ist, keine Schmerzen verursacht und sofort Ergebnisse liefert. Ärzte können damit Organe in Bewegung beobachten, etwa das Herz oder ein ungeborenes Kind. Dadurch ist sie ein zentrales Werkzeug in der modernen Diagnostik."
    },
    fr: {
      title: "Introduction",
      text: "L’échographie est une méthode d’imagerie en temps réel utilisant les ultrasons. Elle est non invasive, sans radiation ionisante et permet d’observer les structures internes du corps. Elle est essentielle en médecine moderne car elle fournit des résultats immédiats et permet d’analyser le mouvement des organes comme le cœur ou le fœtus."
    }
  },
  {
    de: {
      title: "Ultraschall",
      text: "Ultraschall sind mechanische Schallwellen mit Frequenzen über 20 kHz. In der Medizin werden meist 1–15 MHz verwendet, um eine hohe Bildauflösung zu erreichen. Die Wellen breiten sich longitudinal aus und werden unterschiedlich stark an Gewebegrenzen reflektiert. Dadurch entstehen die Bilder in der Echographie."
    },
    fr: {
      title: "Ultrasons",
      text: "Les ultrasons sont des ondes mécaniques de fréquence supérieure à 20 kHz. En médecine, on utilise souvent 1 à 15 MHz pour obtenir une bonne résolution. Ils se propagent de manière longitudinale et sont réfléchis différemment selon les tissus, ce qui permet de créer les images."
    }
  },
  {
    de: {
      title: "Compression & Rarefaktion",
      text: "Eine Ultraschallwelle besteht aus abwechselnden Zonen von Kompression und Rarefaktion. Bei der Kompression werden Teilchen zusammengedrückt, bei der Rarefaktion wieder auseinandergezogen. Dieser Wechsel erzeugt die Druckschwankungen, die vom Gerät gemessen werden und die Bildinformation liefern."
    },
    fr: {
      title: "Compression & raréfaction",
      text: "Une onde ultrasonore est composée d’alternances de compression et de raréfaction. Les particules sont comprimées puis relâchées. Ces variations de pression sont détectées par la sonde et permettent de créer l’image."
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
      title: "Typen der Echographie",
      text: "2D zeigt Schnittbilder, 3D erzeugt räumliche Rekonstruktionen und 4D zeigt Bewegungen in Echtzeit. Der Doppler misst zusätzlich den Blutfluss durch den Doppler-Effekt. In der Kardiologie analysiert man Herzklappen, in der Abdominaldiagnostik Organe und in der Schwangerschaft die Entwicklung des Fötus."
    },
    fr: {
      title: "Types d’échographie",
      text: "La 2D montre des coupes, la 3D reconstruit des volumes et la 4D montre le mouvement en temps réel. Le Doppler mesure le flux sanguin grâce à l’effet Doppler. Il est utilisé en cardiologie, en imagerie abdominale et en obstétrique."
    }
  },
        {
    de: {
      title: "Fazit",
      text: "Die Echographie ist eine der wichtigsten Methoden der modernen Medizin. Sie ist sicher, schnell und vielseitig einsetzbar. Trotz ihrer Abhängigkeit vom Bediener bleibt sie unverzichtbar für Diagnose und Überwachung."
    },
    fr: {
      title: "Conclusion",
      text: "L’échographie est une technique essentielle en médecine moderne. Elle est rapide, sûre et très polyvalente, malgré une dépendance à l’opérateur."
    }
  }
];

/* =========================
   Q&A
========================= */

const qa = [
  {
    de: {
      q: "Was ist die akustische Impedanz? 🥸",
      a: "Die akustische Impedanz ist das Produkt aus Dichte des Mediums und Schallgeschwindigkeit. Sie bestimmt, wie Ultraschall an Grenzflächen reagiert. Unterschiedliche Impedanzen führen zu Reflexion, Brechung sowie Absorption und Streuung der Welle."
    },
    fr: {
      q: "Qu’est-ce que l’impédance acoustique ? 🥸",
      a: "L’impédance acoustique est définie comme le produit de la densité du milieu et de la vitesse du son. Elle détermine le comportement des ultrasons à une interface et entraîne réflexion, réfraction, absorption et diffusion."
    }
  },
  {
    de: {
      q: "Warum gibt es verschiedene Ultraschallmodi (2D, 3D, 4D, Doppler)? 🤷‍♀️",
      a: "Es gibt verschiedene Modi, weil sie unterschiedliche Informationen liefern. 2D zeigt Schnittbilder der Organe, 3D rekonstruiert Volumenstrukturen und 4D zeigt diese in Echtzeit mit Bewegung. Der Doppler-Modus analysiert dagegen den Blutfluss mithilfe des Doppler-Effekts, wobei Farben nur die Geschwindigkeit darstellen."
    },
    fr: {
      q: "Pourquoi existe-t-il différents modes (2D, 3D, 4D, Doppler) ? 🤷‍♀️",
      a: "Les différents modes permettent d’obtenir des informations différentes : le 2D montre des coupes, le 3D reconstruit des volumes et le 4D montre le mouvement en temps réel. Le mode Doppler analyse le flux sanguin grâce à l’effet Doppler, les couleurs représentant la vitesse."
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

/* =====================

   QUIZ

===================== */

function startQuiz() {
  index = 0;
  score = 0;
  results = [];

  quiz = questions.map(q => {
    return {
      q: q[lang].q,
      o: [...q[lang].o],
      a: q.a
    };
  });

  setScreen("quiz");
  showQuestion();
}

function showQuestion() {

  if (index >= quiz.length) return showResult();

  const q = quiz[index];

  document.getElementById("question").innerText = q.q;

  document.getElementById("fill").style.width =
  ((index + 1) / quiz.length * 100) + "%";

  document.getElementById("answers").innerHTML =

    q.o.map((o, i) =>

      `<button onclick="answer(${i})">${o}</button>`

    ).join("");

}

function answer(i) {
  const q = quiz[index];

  const correct = (i === q.a);

  if (correct) score++;

  results.push({
    q: q.q,
    correct: q.o[q.a],
    chosen: q.o[i]
  });

  index++;
  showQuestion();
}

  results.push({
    q: q.q,
    correct: q.o[q.a],
    chosen: q.o[i]
  });

  index++;
  showQuestion();
}

/* =====================

   RESULT

===================== */

function showResult() {
  setScreen("result");

  document.getElementById("score").innerText =
    `Score: ${score}/${quiz.length}`;

  document.getElementById("results").innerHTML =
    results.map(r => `
      <div class="card">
        <b>${r.q}</b><br>
        ✔ ${r.correct}<br>
        ❌ ${r.chosen}
      </div>
    `).join("");
}



/* =====================

   THEORY

===================== */

function showTheory() {

  setScreen("theory");

  document.getElementById("theoryMenu").innerHTML =

    theory.map((t, i) => `

      <div class="card">

        <button onclick="openTheory(${i})">${t[lang].title}</button>

      </div>

    `).join("");

}

function openTheory(i) {

  setScreen("theoryDetail");

  const t = theory[i][lang];

  document.getElementById("theoryDetail").innerHTML = `

    <div class="card">

      <h2>${t.title}</h2>

      <p>${t.text}</p>

      <button onclick="showTheory()">Back</button>

    </div>

  `;

}
/* =====================

   QA UI (FIXED TRANSLATION)

===================== */

function showQA() {

  setScreen("qa");

  document.getElementById("qaMenu").innerHTML =

    qa.map((q, i) => `

      <div class="card">

        <button onclick="openQA(${i})">${q[lang].q}</button>

      </div>

    `).join("");

}

function openQA(i) {

  setScreen("qaDetail");

  const item = qa[i][lang];

  document.getElementById("qaDetail").innerHTML = `

    <div class="card">

      <h2>${item.q}</h2>

      <p>${item.a}</p>

      <button onclick="showQA()">Back</button>

    </div>

  `;

}
/* =====================

   LANGUAGE

===================== */

function setLang(l) {

  lang = l;

  localStorage.setItem("lang", l);

  goHome();

}

/* =====================

   SWIPE BACK

===================== */

document.addEventListener("touchstart", e => {

  startX = e.touches[0].clientX;

  startY = e.touches[0].clientY;

});

document.addEventListener("touchend", e => {

  let dx = e.changedTouches[0].clientX - startX;

  let dy = e.changedTouches[0].clientY - startY;

  if (dx > 80 && Math.abs(dy) < 50) goHome();

});

/* =====================

   INIT

===================== */

goHome();
