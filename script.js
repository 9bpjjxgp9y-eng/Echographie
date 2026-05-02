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
    id: "intro",
    de: [
      "Einführung",
      "Echographie ist eine sichere Echtzeit-Ultraschallmethode zur medizinischen Bildgebung. Sie nutzt hochfrequente Schallwellen, die in den Körper gesendet werden und dort an Gewebegrenzen reflektiert werden. Diese Echos werden von einer Sonde erfasst und in Bilder umgewandelt. Der große Vorteil ist die völlige Strahlenfreiheit, wodurch sie besonders sicher ist. Sie erlaubt Echtzeitbeobachtung von Organen wie Herz oder Fötus und ist deshalb essenziell in der Notfallmedizin, Kardiologie und Schwangerschaftsbetreuung."
    ],
    fr: [
      "Introduction",
      "L’échographie est une méthode d’imagerie en temps réel utilisant des ultrasons. Les ondes sont envoyées dans le corps et réfléchies par les tissus. Ces échos sont transformés en images par une sonde. L’avantage principal est l’absence de radiation, ce qui la rend très sûre. Elle permet d’observer en direct des organes comme le cœur ou le fœtus et est essentielle en médecine d’urgence, cardiologie et obstétrique."
    ]
  },
  {
    id: "ultrasound",
    de: [
      "Ultraschall",
      "Ultraschall sind mechanische Schallwellen mit Frequenzen über 20 kHz. In der Medizin werden sie meist im MHz-Bereich verwendet, um hohe Auflösung zu erreichen. Sie breiten sich longitudinal aus und benötigen ein Medium wie Gewebe oder Flüssigkeit. Unterschiedliche Gewebedichten erzeugen unterschiedliche Reflexionen, was die Bildentstehung ermöglicht."
    ],
    fr: [
      "Ultrasons",
      "Les ultrasons sont des ondes mécaniques au-dessus de 20 kHz. En médecine, on utilise des fréquences en MHz pour obtenir une haute résolution. Ils se propagent de manière longitudinale et nécessitent un milieu comme les tissus. Les différences de densité produisent des réflexions qui permettent de former une image."
    ]
  },
  {
    id: "compression",
    de: [
      "Compression & Rarefaction",
      "Ultraschall besteht aus abwechselnden Zonen von Kompression und Rarefaktion. In der Kompression werden Teilchen zusammengedrückt, in der Rarefaktion auseinandergezogen. Diese Druckunterschiede erzeugen die Welle, die vom Gerät gemessen wird. Je größer der Unterschied zwischen Geweben, desto stärker das Echo."
    ],
    fr: [
      "Compression & raréfaction",
      "Les ultrasons sont composés d’alternances de compression et de raréfaction. Les particules sont comprimées puis relâchées. Ces variations de pression créent l’onde détectée par la sonde. Plus les différences entre tissus sont grandes, plus l’écho est fort."
    ]
  },
  {
    id: "types",
    de: [
      "Typen der Echographie",
      "Die 2D-Echographie zeigt Schnittbilder von Organen. Die 3D-Echographie kombiniert viele Schnitte zu einem räumlichen Bild. Die 4D-Echographie zeigt diese 3D-Bilder in Echtzeit mit Bewegung. Der Doppler misst zusätzlich den Blutfluss und die Geschwindigkeit des Blutes, was besonders in der Kardiologie wichtig ist."
    ],
    fr: [
      "Types d’échographie",
      "L’échographie 2D montre des coupes. La 3D reconstruit un volume. La 4D ajoute le mouvement en temps réel. Le Doppler mesure le flux sanguin et sa vitesse, essentiel en cardiologie."
    ]
  },
  {
    id: "conclusion",
    de: [
      "Fazit",
      "Die Echographie ist eine sichere, schnelle und unverzichtbare Methode der modernen Medizin. Sie kombiniert Physik und Technologie, um Organe in Echtzeit sichtbar zu machen. Ihre Vorteile sind Sicherheit, Kosten und Geschwindigkeit. Ihre Grenzen liegen in der Abhängigkeit vom Untersucher und der Gewebequalität."
    ],
    fr: [
      "Conclusion",
      "L’échographie est une méthode essentielle, rapide et sûre. Elle combine physique et technologie pour visualiser les organes en temps réel. Ses avantages sont la sécurité et la rapidité, mais sa qualité dépend de l’opérateur et des tissus."
    ]
  }
];

/* QUESTIONS */
const questions = Array.from({ length: 15 }, (_, i) => ({
  de: { q: `Frage ${i + 1}`, o: ["A", "B", "C", "D"] },
  fr: { q: `Question ${i + 1}`, o: ["A", "B", "C", "D"] },
  a: Math.floor(Math.random() * 4)
}));

/* RESET */
function reset() {
  ["home", "theory", "theoryDetail", "quiz", "result"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = "none";
  });

  const fill = document.getElementById("fill");
  if (fill) fill.style.width = "0%";
}

/* NAV */
function showNav(mode) {
  const nav = document.getElementById("nav");
  const restart = document.getElementById("restartBtn");

  if (!nav || !restart) return;

  if (mode === "home") {
    nav.style.display = "none";
    return;
  }

  nav.style.display = "flex";

  restart.style.display = (mode === "quiz") ? "block" : "none";
}

/* HOME */
function goHome() {
  reset();
  document.getElementById("home").style.display = "block";
  showNav("home");
}

/* LANGUAGE */
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
    theory.map((t, i) => `
      <div class="card">
        <button onclick="openTheory(${i})">${t[lang][0]}</button>
      </div>
    `).join("");

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
      <button onclick="showTheory()">Back</button>
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

function showQ() {
  if (index >= quiz.length) return showResult();

  const q = quiz[index][lang];

  document.getElementById("question").innerText = q.q;

  document.getElementById("answers").innerHTML =
    q.o.map((o, i) => `<button onclick="answer(${i})">${o}</button>`).join("");

  document.getElementById("fill").style.width =
    (index / quiz.length) * 100 + "%";
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

  showNav("result");

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
}

/* RESTART */
function restartQuiz() {
  startQuiz();
}

/* INIT */
goHome();
