let lang = localStorage.getItem("lang") || "de";
let index = 0;
let score = 0;
let quiz = [];
let results = [];

const T = {
  de: {your:"Deine Antwort:", correct:"Richtige Antwort:"},
  fr: {your:"Ta réponse :", correct:"Bonne réponse :"}
};

/* THEORY */
const theory = [
{
id:"intro",
de:["Einführung","Echographie ist eine sichere Echtzeit-Ultraschallmethode zur medizinischen Bildgebung."],
fr:["Introduction","L’échographie est une méthode d’imagerie par ultrasons en temps réel."]
},
{
id:"ultrasound",
de:["Ultraschall","Ultraschall sind hochfrequente Schallwellen über 20 kHz."],
fr:["Ultrasons","Ondes sonores à haute fréquence > 20 kHz."]
},
{
id:"compression",
de:["Compression & Rarefaction","Wechsel von Druckzonen erzeugt die Welle."],
fr:["Compression & raréfaction","Alternance de zones de pression."]
},
{
id:"types",
de:["Types","2D zeigt Schnittbilder, 3D räumlich, 4D Bewegung. Doppler misst Blutfluss."],
fr:["Types","2D images, 3D volume, 4D mouvement. Doppler mesure le flux sanguin."]
},
{
id:"conclusion",
de:["Fazit","Echographie ist sicher, schnell und essenziell in der Medizin."],
fr:["Conclusion","L’échographie est rapide, sûre et essentielle."]
}
];

/* QUESTIONS 15 */
const questions = Array.from({length:15}, (_,i)=>({
de:{q:`Frage ${i+1}`,o:["A","B","C","D"]},
fr:{q:`Question ${i+1}`,o:["A","B","C","D"]},
a:Math.floor(Math.random()*4)
}));

/* NAV CONTROL */
function showNav(mode){
  const nav = document.getElementById("nav");
  const restart = document.getElementById("restartBtn");

  if(mode === "home"){
    nav.classList.add("hidden");
  } else {
    nav.classList.remove("hidden");
  }

  restart.style.display = (mode === "quiz") ? "block" : "none";
}

/* RESET */
function reset(){
  ["home","theory","theoryDetail","quiz","result"].forEach(id=>{
    document.getElementById(id).style.display="none";
  });
}

/* HOME */
function goHome(){
  reset();
  document.getElementById("home").style.display="block";
  showNav("home");
}

/* LANGUAGE */
function setLang(l){
  lang=l;
  localStorage.setItem("lang",l);
  goHome();
}

/* THEORY */
function showTheory(){
  reset();
  document.getElementById("theory").style.display="block";

  document.getElementById("theoryMenu").innerHTML =
    theory.map((t,i)=>`
      <div class="card">
        <button onclick="openTheory(${i})">${t[lang][0]}</button>
      </div>
    `).join("");

  showNav("theory");
}

function openTheory(i){
  reset();
  document.getElementById("theoryDetail").style.display="block";

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
function startQuiz(){
  reset();
  document.getElementById("quiz").style.display="block";

  score=0;
  index=0;
  results=[];
  quiz=[...questions].sort(()=>Math.random()-0.5);

  showNav("quiz");
  showQ();
}

function showQ(){
  if(index>=quiz.length) return showResult();

  const q=quiz[index][lang];

  document.getElementById("question").innerText=q.q;

  document.getElementById("answers").innerHTML =
    q.o.map((o,i)=>`<button onclick="answer(${i})">${o}</button>`).join("");

  document.getElementById("fill").style.width =
    (index/quiz.length*100)+"%";
}

function answer(i){
  const q=quiz[index];

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
  reset();
  document.getElementById("result").style.display="block";

  document.getElementById("score").innerText =
    `Score: ${score}/${quiz.length}`;

  document.getElementById("results").innerHTML =
    results.map(r=>`
      <div class="card" style="background:${r.u===r.c?'#d4edda':'#f8d7da'}">
        <b>${r.q}</b><br>
        ${T[lang].your} ${r.o[r.u]}<br>
        ${T[lang].correct} ${r.o[r.c]}
      </div>
    `).join("");

  showNav("result");
}

/* RESTART */
function restartQuiz(){
  startQuiz();
}

/* INIT */
goHome();
