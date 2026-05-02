let lang = localStorage.getItem("lang") || "de";
let index = 0;
let score = 0;
let quiz = [];
let results = [];

/* ================= THEORY ================= */

const theory = [
{
title: {
de: "Einführung",
fr: "Introduction"
},
text: {
de: "Die Echographie ist eine medizinische Bildgebung, die Ultraschall verwendet. Sie funktioniert ohne Strahlung und erlaubt Echtzeitbilder des Körpers. Ultraschallwellen werden in den Körper gesendet, reflektiert und als Bild dargestellt. Diese Methode ist sicher, schnell und wird in vielen Bereichen wie Schwangerschaft oder Kardiologie genutzt. Sie basiert auf physikalischen Prinzipien von Wellen und Impedanzunterschieden.",
fr: "L’échographie est une technique d’imagerie médicale utilisant les ultrasons. Elle est sans radiation et permet une visualisation en temps réel. Les ondes sont envoyées, réfléchies et transformées en image. Elle est utilisée en obstétrique et cardiologie."
}
},
{
title: {de:"Ultraschall", fr:"Ultrasons"},
text: {
de:"Ultraschall sind Schallwellen über 20 kHz. In der Medizin nutzt man 1–15 MHz. Sie sind longitudinal und brauchen ein Medium. Unterschiedliche Gewebe reflektieren sie unterschiedlich stark.",
fr:"Les ultrasons sont des ondes >20 kHz utilisées en médecine entre 1 et 15 MHz."
}
},
{
title:{de:"Kompression & Rarefaktion", fr:"Compression & raréfaction"},
text:{
de:"Ultraschall besteht aus Wechsel von Druckzonen (Kompression) und niedrigen Druckzonen (Rarefaktion). Diese Struktur erlaubt die Bildbildung.",
fr:"Les ultrasons alternent compression et raréfaction."
}
},
{
title:{de:"Arten", fr:"Types"},
text:{
de:"2D zeigt Schnittbilder. 3D erzeugt Volumenbilder. 4D zeigt Bewegung in Echtzeit. Doppler misst Blutfluss und Geschwindigkeit. In Kardiologie untersucht man Herz, in Abdominalmedizin Organe, in Schwangerschaft den Fötus.",
fr:"2D images, 3D volume, 4D mouvement. Doppler mesure le flux sanguin."
}
}
];

/* ================= QUIZ ================= */

const questions = [
{q:{de:"Was nutzt Echographie?",fr:"Que utilise l’échographie?"},o:["Ultraschall","Licht","Röntgen","Magnetfeld"],a:0},
{q:{de:"Was entsteht?",fr:"Que produit-elle?"},o:["Bilder","Hitze","Ton","Strom"],a:0},
{q:{de:"Frequenz?",fr:"Fréquence?"},o:["1–15 MHz","20 Hz","1 kHz","5 Hz"],a:0},
{q:{de:"Gel?",fr:"Gel?"},o:["Luft entfernen","Kühlen","Farbe","Schutz"],a:0},
{q:{de:"Reflexion?",fr:"Réflexion?"},o:["Zurück","Stop","Verschwindet","Explodiert"],a:0},
{q:{de:"Schwarz im Bild?",fr:"Noir?"},o:["Flüssigkeit","Knochen","Luft","Metall"],a:0},
{q:{de:"Hyperechogen?",fr:"Hyperéchogène?"},o:["Hell","Dunkel","Rot","Blau"],a:0},
{q:{de:"Herzsonde?",fr:"Sonde cœur?"},o:["Phased Array","Linear","Konvex","Rund"],a:0},
{q:{de:"Tiefe?",fr:"Profondeur?"},o:["Niedrige Frequenz","Farbe","Licht","Ton"],a:0},
{q:{de:"Messung?",fr:"Mesure?"},o:["Zeit","Farbe","Masse","Licht"],a:0},
{q:{de:"Welle?",fr:"Onde?"},o:["Longitudinal","Quer","Statisch","Fest"],a:0},
{q:{de:"Absorption?",fr:"Absorption?"},o:["Wärme","Licht","Kälte","Strom"],a:0},
{q:{de:"Impedanz?",fr:"Impédance?"},o:["Materialunterschied","Farbe","Zeit","Größe"],a:0},
{q:{de:"Echo?",fr:"Écho?"},o:["Reflexion","Absorption","Brechung","Streuung"],a:0},
{q:{de:"Tiefe messen?",fr:"Mesure profondeur?"},o:["Zeit","Farbe","Licht","Druck"],a:0}
];

/* ================= CORE ================= */

function $(id){return document.getElementById(id)}

function show(id){
  document.querySelectorAll(".screen").forEach(e=>e.style.display="none");
  $(id).style.display="block";
}

/* HOME */
function goHome(){
  show("homeScreen");
}

/* THEORY */
function showTheoryMenu(){
  let html="";
  theory.forEach((t,i)=>{
    html+=`<div class="theory-card">
      <button onclick="openTheory(${i})">${t.title[lang]}</button>
    </div>`;
  });
  $("theoryScreen").innerHTML=html;
  show("theoryScreen");
}

function openTheory(i){
  const t=theory[i];
  $("theoryDetailScreen").innerHTML=`
    <div class="card">
      <h2>${t.title[lang]}</h2>
      <p>${t.text[lang]}</p>
      <button onclick="showTheoryMenu()">Back</button>
    </div>
  `;
  show("theoryDetailScreen");
}

/* QUIZ */
function startQuiz(){
  index=0;score=0;results=[];
  quiz=[...questions].sort(()=>Math.random()-0.5);
  show("quizScreen");
  nextQ();
}

function nextQ(){
  if(index>=quiz.length) return showResult();

  let q=quiz[index];

  $("question").innerText=q.q[lang];

  $("answers").innerHTML=q.o.map((o,i)=>
    `<button onclick="answer(${i})">${o}</button>`
  ).join("");

  $("progressBar").style.width=(index/quiz.length*100)+"%";
}

function answer(i){
  let q=quiz[index];
  if(i===q.a)score++;

  results.push({q:q.q[lang],o:q.o,u:i,c:q.a});
  index++;
  nextQ();
}

/* RESULT */
function showResult(){
  show("resultScreen");

  $("score").innerText=`Score: ${score}/${quiz.length}`;

  $("results").innerHTML=results.map(r=>`
    <div class="card">
      <b>${r.q}</b><br>
      ${T[lang].your} ${r.o[r.u]}<br>
      ${T[lang].correct} ${r.o[r.c]}
    </div>
  `).join("");
}

/* LANG */
function setLang(l){
  lang=l;
  localStorage.setItem("lang",l);
  goHome();
}

goHome();
