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
const questions = Array.from({length:15}, (_,i)=>({
  de:{q:`Frage ${i+1}`,o:["A","B","C","D"]},
  fr:{q:`Question ${i+1}`,o:["A","B","C","D"]},
  a:0
}));

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
