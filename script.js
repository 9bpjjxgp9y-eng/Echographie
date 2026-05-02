let lang = localStorage.getItem("lang") || "de";
let index = 0;
let score = 0;
let quiz = [];
let results = [];

/* TEXT */
const T = {
  de: { your: "Deine Antwort:", correct: "Richtige Antwort:" },
  fr: { your: "Ta réponse :", correct: "Bonne réponse :" }
};

/* THEORY */
const theory = [
  {
    de: ["Einführung",
      "Echographie ist eine sichere Echtzeit-Ultraschallmethode zur medizinischen Bildgebung. Sie arbeitet ohne ionisierende Strahlung und nutzt Reflexionen von Schallwellen, um innere Strukturen sichtbar zu machen. Besonders wichtig ist sie, weil sie nicht invasiv ist, keine Schmerzen verursacht und sofort Ergebnisse liefert. Ärzte können damit Organe in Bewegung beobachten, etwa das Herz oder ein ungeborenes Kind. Dadurch ist sie ein zentrales Werkzeug in der modernen Diagnostik."
    ],
    fr: ["Introduction",
      "L’échographie est une méthode d’imagerie en temps réel utilisant les ultrasons. Elle est non invasive, sans radiation ionisante et permet d’observer les structures internes du corps. Elle est essentielle en médecine moderne car elle fournit des résultats immédiats et permet d’analyser le mouvement des organes comme le cœur ou le fœtus."
    ]
  },
  {
    de: ["Ultraschall",
      "Ultraschall sind mechanische Schallwellen mit Frequenzen über 20 kHz. In der Medizin werden meist 1–15 MHz verwendet, um eine hohe Bildauflösung zu erreichen. Die Wellen breiten sich longitudinal aus und werden unterschiedlich stark an Gewebegrenzen reflektiert. Dadurch entstehen die Bilder in der Echographie."
    ],
    fr: ["Ultrasons",
      "Les ultrasons sont des ondes mécaniques de fréquence supérieure à 20 kHz. En médecine, on utilise souvent 1 à 15 MHz pour obtenir une bonne résolution. Ils se propagent de manière longitudinale et sont réfléchis différemment selon les tissus, ce qui permet de créer les images."
    ]
  },
  {
    de: ["Compression & Rarefaktion",
      "Eine Ultraschallwelle besteht aus abwechselnden Zonen von Kompression und Rarefaktion. Bei der Kompression werden Teilchen zusammengedrückt, bei der Rarefaktion wieder auseinandergezogen. Dieser Wechsel erzeugt die Druckschwankungen, die vom Gerät gemessen werden und die Bildinformation liefern."
    ],
    fr: ["Compression & raréfaction",
      "Une onde ultrasonore est composée d’alternances de compression et de raréfaction. Les particules sont comprimées puis relâchées. Ces variations de pression sont détectées par la sonde et permettent de créer l’image."
    ]
  },
  {
    de: ["Typen der Echographie",
      "2D zeigt Schnittbilder, 3D erzeugt räumliche Rekonstruktionen und 4D zeigt Bewegungen in Echtzeit. Der Doppler misst zusätzlich den Blutfluss durch den Doppler-Effekt. In der Kardiologie analysiert man Herzklappen, in der Abdominaldiagnostik Organe und in der Schwangerschaft die Entwicklung des Fötus."
    ],
    fr: ["Types d’échographie",
      "La 2D montre des coupes, la 3D reconstruit des volumes et la 4D montre le mouvement en temps réel. Le Doppler mesure le flux sanguin grâce à l’effet Doppler. Il est utilisé en cardiologie, en imagerie abdominale et en obstétrique."
    ]
  },
  {
    de: ["Fazit",
      "Die Echographie ist eine der wichtigsten Methoden der modernen Medizin. Sie ist sicher, schnell und vielseitig einsetzbar. Trotz ihrer Abhängigkeit vom Bediener bleibt sie unverzichtbar für Diagnose und Überwachung."
    ],
    fr: ["Conclusion",
      "L’échographie est une technique essentielle en médecine moderne. Elle est rapide, sûre et très polyvalente, malgré une dépendance à l’opérateur."
    ]
  }
];

/* 15 QUESTIONS FIXED */
const questions = [
  {
    de: { q: "Was nutzt Echographie?", o: ["Ultraschall", "Röntgen", "Licht", "Magnetfeld"] },
    fr: { q: "Que utilise l’échographie ?", o: ["Ultrasons", "Rayons X", "Lumière", "Champ magnétique"] },
    a: 0
  },
  {
    de: { q: "Welche Frequenz?", o: ["1–15 MHz", "20 Hz", "1 kHz", "100 Hz"] },
    fr: { q: "Quelle fréquence ?", o: ["1–15 MHz", "20 Hz", "1 kHz", "100 Hz"] },
    a: 0
  },
  {
    de: { q: "Warum Gel?", o: ["Luft entfernen", "Kühlen", "Farbe", "Schutz"] },
    fr: { q: "Pourquoi gel ?", o: ["Enlever l’air", "Refroidir", "Couleur", "Protection"] },
    a: 0
  },
  {
    de: { q: "Was ist Reflexion?", o: ["Zurück", "Verschwindet", "Wird zerstört", "Bleibt"] },
    fr: { q: "Réflexion ?", o: ["Retour", "Disparaît", "Détruit", "Reste"] },
    a: 0
  },
  {
    de: { q: "Welche Struktur ist schwarz?", o: ["Flüssigkeit", "Knochen", "Luft", "Metall"] },
    fr: { q: "Structure noire ?", o: ["Liquide", "Os", "Air", "Métal"] },
    a: 0
  },
  {
    de: { q: "Hyperechogen?", o: ["Hell", "Dunkel", "Unsichtbar", "Rot"] },
    fr: { q: "Hyperéchogène ?", o: ["Clair", "Sombre", "Invisible", "Rouge"] },
    a: 0
  },
  {
    de: { q: "Sonde Herz?", o: ["Phased Array", "Linear", "Konvex", "Mini"] },
    fr: { q: "Sonde cœur ?", o: ["Phased array", "Linéaire", "Convexe", "Mini"] },
    a: 0
  },
  {
    de: { q: "Ultraschall ist?", o: ["Longitudinal", "Quer", "Statisch", "Optisch"] },
    fr: { q: "Ultrasons ?", o: ["Longitudinal", "Transversal", "Statique", "Optique"] },
    a: 0
  },
  {
    de: { q: "Absorption?", o: ["Wärme", "Licht", "Ton", "Druck"] },
    fr: { q: "Absorption ?", o: ["Chaleur", "Lumière", "Son", "Pression"] },
    a: 0
  },
  {
    de: { q: "Impedanz?", o: ["Materialunterschied", "Farbe", "Zeit", "Größe"] },
    fr: { q: "Impédance ?", o: ["Différence matière", "Couleur", "Temps", "Taille"] },
    a: 0
  },
  {
    de: { q: "Echo?", o: ["Reflexion", "Absorption", "Brechung", "Stop"] },
    fr: { q: "Écho ?", o: ["Réflexion", "Absorption", "Réfraction", "Stop"] },
    a: 0
  },
  {
    de: { q: "Tiefe messen?", o: ["Zeit", "Farbe", "Licht", "Masse"] },
    fr: { q: "Profondeur ?", o: ["Temps", "Couleur", "Lumière", "Masse"] },
    a: 0
  },
  {
    de: { q: "3D Ultraschall?", o: ["Raum", "Ton", "Licht", "Hitze"] },
    fr: { q: "3D ?", o: ["Volume", "Son", "Lumière", "Chaleur"] },
    a: 0
  },
  {
    de: { q: "Doppler misst?", o: ["Blutfluss", "Temperatur", "Licht", "Druck"] },
    fr: { q: "Doppler mesure ?", o: ["Flux sanguin", "Température", "Lumière", "Pression"] },
    a: 0
  },
  {
    de: { q: "Ultraschall Vorteil?", o: ["Sicher", "Gefährlich", "Langsam", "Teuer"] },
    fr: { q: "Avantage ?", o: ["Sûr", "Dangereux", "Lent", "Cher"] },
    a: 0
  }
];

/* NAV */
function showNav(mode) {
  const nav = document.getElementById("nav");
  const restart = document.getElementById("restartBtn");

  nav.style.display = (mode === "home") ? "none" : "flex";
  restart.style.display = (mode === "quiz") ? "inline-block" : "none";
}

/* RESET */
function reset() {
  ["home", "theory", "theoryDetail", "quiz", "result"]
    .forEach(id => document.getElementById(id).style.display = "none");
}

/* HOME */
function goHome() {
  reset();
  document.getElementById("home").style.display = "block";
  showNav("home");
}

/* LANG */
function setLang(l) {
  lang = l;
  localStorage.setItem("lang", l);
  goHome();
}

/* THEORY */
function showTheory() {
  reset();
  document.getElementById("theory").style.display = "block";

  document.getElementById("theoryMenu").innerHTML =
    theory.map((t, i) =>
      `<div class="card"><button onclick="openTheory(${i})">${t[lang][0]}</button></div>`
    ).join("");

  showNav("theory");
}

function openTheory(i) {
  reset();
  document.getElementById("theoryDetail").style.display = "block";

  const t = theory[i][lang];

  document.getElementById("theoryDetail").innerHTML = `
    <div class="card">
      <h2>${t[0]}</h2>
      <p>${t[1]}</p>
      <button onclick="showTheory()">Zurück</button>
    </div>
  `;
}

/* QUIZ */
function startQuiz() {
  reset();

  score = 0;
  index = 0;
  results = [];
  quiz = [...questions].sort(() => Math.random() - 0.5);

  document.getElementById("quiz").style.display = "block";
  showNav("quiz");

  showQ();
}

function shuffle(arr){
  return [...arr].sort(() => Math.random() - 0.5);
}

function showQ(){
  if(index >= quiz.length) return showResult();

  const q = quiz[index][lang];

  document.getElementById("question").innerText = q.q;

  // 👉 WICHTIG: Antworten JEDES MAL neu mischen
  const shuffledAnswers = q.o
    .map((text, i) => ({ text, i })) // Originalindex behalten
    .sort(() => Math.random() - 0.5);

  document.getElementById("answers").innerHTML =
    shuffledAnswers.map(a =>
      `<button onclick="answer(${a.i})">${a.text}</button>`
    ).join("");

  document.getElementById("fill").style.width =
    (index / quiz.length * 100) + "%";
}

function answer(i) {
  const q = quiz[index];

  if (i === q.a) score++;

  results.push({
    q: q[lang].q,
    o: q[lang].o,
    u: i,
    c: q.a
  });

  index++;
  showQ();
}

/* RESULT */
function showResult() {
  reset();
  document.getElementById("result").style.display = "block";

  document.getElementById("score").innerText =
    `Score: ${score}/${quiz.length}`;

  document.getElementById("results").innerHTML =
    results.map(r => `
      <div class="card" style="background:${r.u === r.c ? '#d4edda' : '#f8d7da'}">
        <b>${r.q}</b><br>
        ${T[lang].your} ${r.o[r.u]}<br>
        ${T[lang].correct} ${r.o[r.c]}
      </div>
    `).join("");

  showNav("result");
}

/* RESTART */
function restartQuiz() {
  startQuiz();
}

/* INIT */
goHome();
