/* ================= STATE ================= */

let lang = localStorage.getItem("lang") || "de";
let score = 0;
let index = 0;
let quizQuestions = [];
let results = [];

/* ================= TEXT ================= */

const texts = {
  de: {
    theory: "Theorie",
    quiz: "Quiz",
    back: "Zurück",
    result: "Score:",
    your: "Deine Antwort:",
    correct: "Richtige Antwort:"
  },
  fr: {
    theory: "Théorie",
    quiz: "Quiz",
    back: "Retour",
    result: "Score :",
    your: "Ta réponse :",
    correct: "Bonne réponse :"
  }
};

/* ================= THEORY ================= */

const theory = [
  {
    id: "intro",
    de: ["Einführung", "Echographie ist eine nicht-invasive Methode mit Ultraschall."],
    fr: ["Introduction", "L’échographie utilise des ultrasons pour créer des images."]
  },
  {
    id: "ultrasons",
    de: ["Ultraschall", "Mechanische longitudinale Wellen über 20 kHz."],
    fr: ["Ultrasons", "Ondes mécaniques longitudinales > 20 kHz."]
  },
  {
    id: "compression",
    de: ["Kompression & Rarefaktion", "Teilchen werden zusammengepresst und auseinandergezogen."],
    fr: ["Compression & raréfaction", "Les particules oscillent."]
  },
  {
    id: "impedance",
    de: ["Impedanz", "Unterschiede erzeugen Reflexionen."],
    fr: ["Impédance", "Les différences créent des réflexions."]
  },
  {
    id: "reflection",
    de: ["Reflexion", "Wellen werden zurückgeworfen."],
    fr: ["Réflexion", "Les ondes reviennent."]
  },
  {
    id: "absorption",
    de: ["Absorption", "Energie wird in Wärme umgewandelt."],
    fr: ["Absorption", "L’énergie devient chaleur."]
  },
  {
    id: "frequency",
    de: ["Frequenz", "Hohe Frequenz = Detail, niedrige = Tiefe"],
    fr: ["Fréquence", "Haute = détail, basse = profondeur"]
  },
  {
    id: "types",
    de: ["Sonden", "Linear, Konvex, Phased Array"],
    fr: ["Sondes", "Linéaire, convexe, phased array"]
  }
];

/* ================= QUIZ (15 QUESTIONS) ================= */

const questions = [
  {
    de: { q: "Was nutzt Echographie?", o: ["Ultraschall","Licht","Magnetfeld","Röntgen"] },
    fr: { q: "Que utilise l’échographie ?", o: ["Ultrasons","Lumière","Rayons X","Champ"] },
    a: 0
  },
  {
    de: { q: "Was entsteht?", o: ["Bilder","Geräusche","Hitze","Licht"] },
    fr: { q: "Que produit-elle ?", o: ["Images","Sons","Chaleur","Lumière"] },
    a: 0
  },
  {
    de: { q: "Frequenz?", o: ["1–15 MHz","20 Hz","100 Hz","1 kHz"] },
    fr: { q: "Fréquence ?", o: ["1–15 MHz","20 Hz","100 Hz","1 kHz"] },
    a: 0
  },
  {
    de: { q: "Gel?", o: ["Luft entfernen","Kühlen","Farbe","Strom"] },
    fr: { q: "Gel ?", o: ["Enlever l’air","Refroidir","Couleur","Électricité"] },
    a: 0
  },
  {
    de: { q: "Reflexion?", o: ["Zurück","Weiter","Verschwindet","Explodiert"] },
    fr: { q: "Réflexion ?", o: ["Retour","Avance","Disparaît","Explosion"] },
    a: 0
  },
  {
    de: { q: "Schwarz?", o: ["Flüssigkeit","Knochen","Luft","Metall"] },
    fr: { q: "Noir ?", o: ["Liquide","Os","Air","Métal"] },
    a: 0
  },
  {
    de: { q: "Hyperechogen?", o: ["Hell","Dunkel","Unsichtbar","Blau"] },
    fr: { q: "Hyperéchogène ?", o: ["Clair","Sombre","Invisible","Bleu"] },
    a: 0
  },
  {
    de: { q: "Herzsonde?", o: ["Phased Array","Linear","Konvex","Rund"] },
    fr: { q: "Sonde cœur ?", o: ["Phased array","Linéaire","Convexe","Ronde"] },
    a: 0
  },
  {
    de: { q: "Niedrige Frequenz?", o: ["Tiefe","Farbe","Tempo","Ton"] },
    fr: { q: "Basse fréquence ?", o: ["Profondeur","Couleur","Vitesse","Son"] },
    a: 0
  },
  {
    de: { q: "Messung?", o: ["Zeit","Temperatur","Druck","Farbe"] },
    fr: { q: "Mesure ?", o: ["Temps","Température","Pression","Couleur"] },
    a: 0
  },
  {
    de: { q: "Welle?", o: ["Longitudinal","Quer","Still","Fest"] },
    fr: { q: "Onde ?", o: ["Longitudinale","Transversale","Fixe","Solide"] },
    a: 0
  },
  {
    de: { q: "Absorption?", o: ["Wärme","Kälte","Licht","Strom"] },
    fr: { q: "Absorption ?", o: ["Chaleur","Froid","Lumière","Électricité"] },
    a: 0
  },
  {
    de: { q: "Impedanz?", o: ["Materialunterschied","Farbe","Größe","Zeit"] },
    fr: { q: "Impédance ?", o: ["Différence de matière","Couleur","Taille","Temps"] },
    a: 0
  },
  {
    de: { q: "Echo?", o: ["Reflexion","Absorption","Brechung","Diffusion"] },
    fr: { q: "Écho ?", o: ["Réflexion","Absorption","Réfraction","Diffusion"] },
    a: 0
  },
  {
    de: { q: "Tiefe messen?", o: ["Zeit","Licht","Farbe","Druck"] },
    fr: { q: "Mesure profondeur ?", o: ["Temps","Lumière","Couleur","Pression"] },
    a: 0
  }
];

/* ================= CORE ================= */

function $(id){ return document.getElementById(id); }

function resetScreens(){
  ["startScreen","theoryScreen","theoryDetailScreen","quizScreen","resultScreen"]
  .forEach(id => {
    const el = document.getElementById(id);
    if(el) el.style.display = "none";
  });
}

function goHome(){
  resetScreens();
  document.getElementById("startScreen").style.display = "flex";
  updateNav("home");
}

/* THEORY */

function showTheory(){
  resetScreens();
  document.getElementById("theoryScreen").style.display = "block";

  document.getElementById("theoryMenu").innerHTML =
    theory.map(t =>
      `<button onclick="openTheory('${t.id}')">${t[lang][0]}</button>`
    ).join("<br>");

  updateNav("theory");
}

function openTheory(id){
  const t = theory.find(x => x.id === id);

  resetScreens();
  document.getElementById("theoryDetailScreen").style.display = "block";

  document.getElementById("theoryDetailScreen").innerHTML = `
    <button onclick="showTheory()">${texts[lang].back}</button>
    <h2>${t[lang][0]}</h2>
    <p>${t[lang][1]}</p>
  `;

  updateNav("theory");
}

/* QUIZ */

function startQuiz(){
  score = 0;
  index = 0;
  results = [];
  quizQuestions = shuffle([...questions]);

  resetScreens();
  document.getElementById("quizScreen").style.display = "block";

  updateNav("quiz");
  showQuestion();
}

function showQuestion(){
  if(index>=quizQuestions.length) return showResult();

  const q = quizQuestions[index][lang];
  $("question").innerText = q.q;

  $("answers").innerHTML =
    q.o.map((o,i)=>`<button onclick="answer(${i})">${o}</button>`).join("");

  $("progressBar").style.width =
    (index/quizQuestions.length*100)+"%";
}

function answer(i){
  const q = quizQuestions[index];
  if(i===q.a) score++;

  results.push({q:q[lang].q,o:q[lang].o,u:i,c:q.a});
  index++;
  showQuestion();
}

/* RESULT */

function showResult(){
  resetScreens();
  document.getElementById("resultScreen").style.display = "block";

  document.getElementById("scoreText").innerText =
    `${texts[lang].result} ${score}/${quizQuestions.length}`;

  document.getElementById("resultList").innerHTML =
    results.map(r => `
      <div style="margin:10px;padding:10px;border-radius:10px;
      background:${r.u===r.c ? "#d4edda" : "#f8d7da"}">
        <b>${r.q}</b><br><br>
        ${texts[lang].your} ${r.o[r.u]}<br>
        ${texts[lang].correct} ${r.o[r.c]}
      </div>
    `).join("");

  updateNav("result");
}

/* UTIL */

function shuffle(a){
  for(let i=a.length-1;i>0;i--){
    let j=Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

function restartQuiz(){ startQuiz(); }
function setLanguage(l){
  lang = l;
  localStorage.setItem("lang", l);
  updateUI();   
  goHome();
}
function updateUI() {
  const t = texts[lang];

  const btnTheory = document.getElementById("btnTheory");
  const btnQuiz = document.getElementById("btnQuiz");

  if (btnTheory) btnTheory.innerText = t.theory;
  if (btnQuiz) btnQuiz.innerText = t.quiz;
}
/* INIT */
updateUI();
goHome();
