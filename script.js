let lang = localStorage.getItem("lang") || "de";
let index = 0;
let score = 0;
let quiz = [];
let results = [];

/* TEXT */
const T = {
  de: { 
    your: "Deine Antwort:", 
    correct: "Richtige Antwort:",
    qa: "🙋‍♀️ Fragen & Antworten"
  },
  fr: { 
    your: "Ta réponse :", 
    correct: "Bonne réponse :",
    qa: "🙋‍♀️ Questions & Réponses"
  }
};
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
    de: { q: "Welche Frequenz wird in der Echographie benutzt?", o: ["1–15 MHz", "20 Hz", "1 kHz", "100 Hz"] },
    fr: { q: "Quelle fréquence est utilisée en échographie?", o: ["1–15 MHz", "20 Hz", "1 kHz", "100 Hz"] },
    a: 0
  },
  {
    de: { q: "Warum Gel zwischen dem Apparat und Körper?", o: ["Luft entfernen", "Kühlen", "Farbe", "Schutz"] },
    fr: { q: "Pourquoi mettre du gel entre l'apareil et le corps ?", o: ["Enlever l’air", "Refroidir", "Couleur", "Protection"] },
    a: 0
  },
  {
    de: { q: "Was ist Reflexion?", o: ["Zurück", "Verschwindet", "Wird zerstört", "Bleibt"] },
    fr: { q: "Réflexion, c'est quoi ?", o: ["Retour", "Disparaît", "Détruit", "Reste"] },
    a: 0
  },
  {
    de: { q: "Welche Struktur ist schwarz auf dem Bild?", o: ["Flüssigkeit", "Knochen", "Luft", "Metall"] },
    fr: { q: "Quelle Structure est noire sur l'image ?", o: ["Liquide", "Os", "Air", "Métal"] },
    a: 0
  },
  {
    de: { q: "Bedeutung : Hyperechogen?", o: ["Hell", "Dunkel", "Unsichtbar", "Rot"] },
    fr: { q: "Hyperéchogène, c'est quoi ?", o: ["Clair", "Sombre", "Invisible", "Rouge"] },
    a: 0
  },
  {
    de: { q: "Welche Sonde für das Herz?", o: ["Phased Array", "Linear", "Konvex", "Mini"] },
    fr: { q: "Quelle Sonde pour le cœur ?", o: ["Phased array", "Linéaire", "Convexe", "Mini"] },
    a: 0
  },
  {
    de: { q: "Ultraschall ist?", o: ["Longitudinal", "Quer", "Statisch", "Optisch"] },
    fr: { q: "les Ultrasons sont?", o: ["Longitudinal", "Transversal", "Statique", "Optique"] },
    a: 0
  },
  {
    de: { q: "Bedeutung : Absorption?", o: ["Wärme", "Licht", "Ton", "Druck"] },
    fr: { q: "Absorption, c'est quoi?", o: ["Chaleur", "Lumière", "Son", "Pression"] },
    a: 0
  },
  {
    de: { q: "Bedeutung : Impedanz?", o: ["Materialunterschied", "Farbe", "Zeit", "Größe"] },
    fr: { q: "Impédance, c'est quoi?", o: ["Différence matière", "Couleur", "Temps", "Taille"] },
    a: 0
  },
  {
    de: { q: "Bedeutung : Echo?", o: ["Reflexion", "Absorption", "Brechung", "Stop"] },
    fr: { q: "Écho, c'est quoi?", o: ["Réflexion", "Absorption", "Réfraction", "Stop"] },
    a: 0
  },
  {
    de: { q: "Tiefe messen,wie?", o: ["Zeit", "Farbe", "Licht", "Masse"] },
    fr: { q: "mesurer la Profondeur, comment?", o: ["Temps", "Couleur", "Lumière", "Masse"] },
    a: 0
  },
  {
    de: { q: "3D?", o: ["Raum", "Ton", "Licht", "Hitze"] },
    fr: { q: "3D?", o: ["Volume", "Son", "Lumière", "Chaleur"] },
    a: 0
  },
  {
    de: { q: "Doppler misst?", o: ["Blutfluss", "Temperatur", "Licht", "Druck"] },
    fr: { q: "Doppler mesure ?", o: ["Flux sanguin", "Température", "Lumière", "Pression"] },
    a: 0
  },
  {
    de: { q: "Ultraschall Vorteil?", o: ["Sicher", "Gefährlich", "Langsam", "Teuer"] },
    fr: { q: "Avantage de l'échographie?", o: ["Sûr", "Dangereux", "Lent", "Cher"] },
    a: 0
  }
];

/* NAV */
function showNav(mode) {
  const nav = document.getElementById("nav");
  const restart = document.getElementById("restartBtn");

  nav.classList.toggle("hidden", mode === "home");
  restart.style.display = (mode === "quiz") ? "inline-block" : "none";
}
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
/* RESET */
function reset(){
  document.querySelectorAll(".screen").forEach(s => {
    s.classList.add("hidden");
    s.style.display = "";
  });
}

/* HOME */
function goHome() {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
  document.getElementById("home").classList.remove("hidden");
  showNav("home");
}

/* LANG */
function setLang(l) {
  lang = l;
  localStorage.setItem("lang", l);
  updateUI();
  goHome();
  showTheory();
  showQA();
}

/* THEORY */
function showTheory() {
  reset();
  document.getElementById("theory").classList.remove("hidden");

  document.getElementById("theoryMenu").innerHTML =
    theory.map((t, i) =>
      `<div class="card"><button onclick="openTheory(${i})">${t[lang][0]}</button></div>`
    ).join("");

  showNav("theory");
}

function openTheory(i) {
  document.querySelectorAll(".screen").forEach(s => s.classList.add("hidden"));
document.getElementById("theory").classList.remove("hidden");

  const t = theory[i][lang];

  document.getElementById("theoryDetail").innerHTML = `
    <div class="card">
      <h2>${t[0]}</h2>
      <p>${t[1]}</p>
      <button onclick="showTheory()">🔙</button>
    </div>
  `;
}
/* QA */
function showQA() {
  reset();
  document.getElementById("qa").classList.remove("hidden");

  document.getElementById("qaMenu").innerHTML =
    qa.map((item, i) => `
      <div class="card">
        <button onclick="openQA(${i})">${item[lang].q}</button>
      </div>
    `).join("");

  showNav("qa");
}

function openQA(i) {
  reset();
  document.getElementById("qaDetail").classList.remove("hidden");

  const item = qa[i][lang];

  document.getElementById("qaDetail").innerHTML = `
    <div class="card">
      <h2>${item.q}</h2>
      <p style="font-size:20px; line-height:1.6;">
        ${item.a}
      </p>

      <button onclick="showQA()">⬅️ Back</button>
    </div>
  `;
}

/* QUIZ */
function startQuiz() {
  reset();

  score = 0;
  index = 0;
  results = [];

  quiz = [...questions]
    .sort(() => Math.random() - 0.5)
    .map(q => ({
      q: q[lang].q,
      o: q[lang].o,
      a: q.a
    }));

  document.getElementById("quiz").classList.remove("hidden");
  showNav("quiz");

  showQ();
}

function shuffle(arr){
  return [...arr].sort(() => Math.random() - 0.5);
}

function showQ(){
  if(index >= quiz.length) return showResult();

  const q = quiz[index];

  document.getElementById("question").innerText = q.q;

  const shuffledAnswers = q.o
    .map((text, i) => ({ text, i }))
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
    q: q.q,
    o: q.o,
    u: i,
    c: q.a
  });

  index++;
  showQ();
}

/* RESULT */
function showResult() {
  reset();
  document.getElementById("result").classList.remove("hidden");

  document.getElementById("score").innerText =
    `🏆Score: ${score}/${quiz.length}`;

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
function updateUI(){
  document.getElementById("qaBtn").innerText = T[lang].qa;

  // optional später erweitern:
  // document.getElementById("title").innerText = ...
}

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  updateUI();
  goHome();
});
