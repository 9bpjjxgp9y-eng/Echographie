let lang = localStorage.getItem("lang") || "de";
let index = 0;
let score = 0;
let quiz = [];
let results = [];

/* TEXT */
const T = {
  de: {your:"Deine Antwort:", correct:"Richtige Antwort:"},
  fr: {your:"Ta réponse :", correct:"Bonne réponse :"}
};

/* THEORY */
const theory = [
  {de:["Einführung","Echographie nutzt Ultraschall."], fr:["Introduction","Utilise les ultrasons."]},
  {de:["Ultraschall","Mechanische Wellen >20kHz."], fr:["Ultrasons","Ondes mécaniques >20kHz."]},
  {de:["Kompression","Teilchen werden gedrückt."], fr:["Compression","Particules comprimées."]},
  {de:["Rarefaktion","Teilchen entfernen sich."], fr:["Raréfaction","Particules s’éloignent."]},
  {de:["Reflexion","Wellen werden zurückgeworfen."], fr:["Réflexion","Retour des ondes."]},
  {de:["Absorption","Energie wird Wärme."], fr:["Absorption","Énergie devient chaleur."]}
];

/* QUESTIONS (15) */
const questions = [
  {
    de: { q: "Was nutzt die Echographie?", o: ["Ultraschall", "Röntgen", "Licht", "Magnetfeld"] },
    fr: { q: "Que utilise l’échographie ?", o: ["Ultrasons", "Rayons X", "Lumière", "Champ magnétique"] },
    a: 0
  },
  {
    de: { q: "Was entsteht im Gerät?", o: ["Bilder", "Hitze", "Geräusche", "Elektrizität"] },
    fr: { q: "Que produit l’appareil ?", o: ["Images", "Chaleur", "Sons", "Électricité"] },
    a: 0
  },
  {
    de: { q: "Welche Frequenz wird verwendet?", o: ["1–15 MHz", "20 Hz", "100 Hz", "1 kHz"] },
    fr: { q: "Quelle fréquence est utilisée ?", o: ["1–15 MHz", "20 Hz", "100 Hz", "1 kHz"] },
    a: 0
  },
  {
    de: { q: "Warum benutzt man Gel?", o: ["Luft entfernen", "Kühlen", "Farbe verbessern", "Schutz"] },
    fr: { q: "Pourquoi utilise-t-on du gel ?", o: ["Enlever l’air", "Refroidir", "Améliorer la couleur", "Protection"] },
    a: 0
  },
  {
    de: { q: "Was passiert bei Reflexion?", o: ["Wellen gehen zurück", "Wellen verschwinden", "Wellen werden verstärkt", "Wellen stoppen"] },
    fr: { q: "Que se passe-t-il lors de la réflexion ?", o: ["Retour des ondes", "Disparition", "Amplification", "Arrêt"] },
    a: 0
  },
  {
    de: { q: "Welche Struktur erscheint schwarz?", o: ["Flüssigkeit", "Knochen", "Luft", "Metall"] },
    fr: { q: "Quelle structure apparaît noire ?", o: ["Liquide", "Os", "Air", "Métal"] },
    a: 0
  },
  {
    de: { q: "Was bedeutet hyperechogen?", o: ["Hell", "Dunkel", "Unsichtbar", "Rot"] },
    fr: { q: "Que signifie hyperéchogène ?", o: ["Clair", "Sombre", "Invisible", "Rouge"] },
    a: 0
  },
  {
    de: { q: "Welche Sonde für das Herz?", o: ["Phased Array", "Linear", "Konvex", "Rund"] },
    fr: { q: "Quelle sonde pour le cœur ?", o: ["Phased array", "Linéaire", "Convexe", "Ronde"] },
    a: 0
  },
  {
    de: { q: "Warum niedrige Frequenz?", o: ["Tiefe Eindringung", "Farbe", "Lautstärke", "Tempo"] },
    fr: { q: "Pourquoi basse fréquence ?", o: ["Profondeur", "Couleur", "Volume", "Vitesse"] },
    a: 0
  },
  {
    de: { q: "Was misst das Gerät?", o: ["Zeit", "Temperatur", "Farbe", "Masse"] },
    fr: { q: "Que mesure l’appareil ?", o: ["Temps", "Température", "Couleur", "Masse"] },
    a: 0
  },
  {
    de: { q: "Welche Welle ist Ultraschall?", o: ["Longitudinal", "Quer", "Statisch", "Elektrisch"] },
    fr: { q: "Quel type d’onde est un ultrason ?", o: ["Longitudinale", "Transversale", "Statique", "Électrique"] },
    a: 0
  },
  {
    de: { q: "Was ist Absorption?", o: ["Energie wird Wärme", "Energie wird Licht", "Energie verschwindet", "Energie wird Schall"] },
    fr: { q: "Qu’est-ce que l’absorption ?", o: ["Énergie devient chaleur", "Énergie devient lumière", "Disparition", "Énergie devient son"] },
    a: 0
  },
  {
    de: { q: "Was ist Impedanz?", o: ["Materialunterschied", "Farbe", "Größe", "Zeit"] },
    fr: { q: "Qu’est-ce que l’impédance ?", o: ["Différence de matière", "Couleur", "Taille", "Temps"] },
    a: 0
  },
  {
    de: { q: "Was ist ein Echo?", o: ["Reflexion", "Absorption", "Brechung", "Diffusion"] },
    fr: { q: "Qu’est-ce qu’un écho ?", o: ["Réflexion", "Absorption", "Réfraction", "Diffusion"] },
    a: 0
  },
  {
    de: { q: "Wie misst man Tiefe?", o: ["Zeit", "Farbe", "Druck", "Licht"] },
    fr: { q: "Comment mesurer la profondeur ?", o: ["Temps", "Couleur", "Pression", "Lumière"] },
    a: 0
  }
];

/* HELP */
const $ = id => document.getElementById(id);

function hideAll(){
  ["home","theory","theoryDetail","quiz","result"]
  .forEach(id => $(id).classList.add("hidden"));
}

/* HOME */
function goHome(){
  hideAll();
  $("home").classList.remove("hidden");
}

/* LANGUAGE */
function setLang(l){
  lang = l;
  localStorage.setItem("lang",l);
  goHome();
}

/* THEORY */
function openTheory(){
  hideAll();
  $("theory").classList.remove("hidden");

  $("theoryList").innerHTML =
    theory.map((t,i)=>
      `<button onclick="showTheory(${i})">${t[lang][0]}</button>`
    ).join("");
}

function showTheory(i){
  hideAll();
  $("theoryDetail").classList.remove("hidden");

  $("theoryDetail").innerHTML = `
    <button onclick="openTheory()">Back</button>
    <h2>${theory[i][lang][0]}</h2>
    <p>${theory[i][lang][1]}</p>
  `;
}

/* QUIZ */
function startQuiz(){
  index=0;
  score=0;
  results=[];
  quiz=[...questions].sort(()=>Math.random()-0.5);

  hideAll();
  $("quiz").classList.remove("hidden");

  showQ();
}

function showQ(){
  if(index>=quiz.length) return showResult();

  const q = quiz[index][lang];

  $("question").innerText = q.q;

  $("answers").innerHTML =
    q.o.map((o,i)=>
      `<button onclick="answer(${i})">${o}</button>`
    ).join("");

  $("fill").style.width = (index/quiz.length*100)+"%";
}

function answer(i){
  const q = quiz[index];

  if(i===q.a) score++;

  results.push({
    q:q[lang].q,
    o:q[lang].o,
    u:i,
    c:q.a
  });

  index++;
  showQ();
}

/* RESULT */
function showResult(){
  hideAll();
  $("result").classList.remove("hidden");

  $("score").innerText =
    `Score: ${score}/${quiz.length}`;

  $("results").innerHTML =
    results.map(r=>`
      <div style="margin:10px;padding:10px;background:${r.u===r.c?"#d4edda":"#f8d7da"}">
        <b>${r.q}</b><br>
        ${T[lang].your} ${r.o[r.u]}<br>
        ${T[lang].correct} ${r.o[r.c]}
      </div>
    `).join("");
}

goHome();
