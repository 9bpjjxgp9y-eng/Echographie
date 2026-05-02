let lang = localStorage.getItem("lang") || "de";
let i = 0;
let score = 0;
let list = [];
let res = [];

const T = {
  de: { your:"Deine Antwort:", correct:"Richtige Antwort:" },
  fr: { your:"Ta réponse :", correct:"Bonne réponse :" }
};

/* THEORY */
const theory = [
  {de:["Einführung","Ultraschall ist nicht-invasiv."], fr:["Introduction","Imagerie par ultrasons."]},
  {de:["Ultraschall","Mechanische Wellen."], fr:["Ultrasons","Ondes mécaniques."]},
  {de:["Kompression","Teilchen werden gedrückt."], fr:["Compression","Particules comprimées."]},
  {de:["Rarefaktion","Teilchen gehen auseinander."], fr:["Raréfaction","Particules s’éloignent."]},
  {de:["Reflexion","Wellen gehen zurück."], fr:["Réflexion","Retour des ondes."]},
  {de:["Absorption","Energie wird Wärme."], fr:["Absorption","Énergie devient chaleur."]},
  {de:["Frequenz","Bestimmt Tiefe & Detail."], fr:["Fréquence","Détermine profondeur."]},
  {de:["Sonden","Linear, konvex, phased array."], fr:["Sondes","Linéaire, convexe, phased array."]}
];

/* QUIZ */
const q = Array.from({length:15}, (_,n)=>({
  de:{q:`Frage ${n+1}`,o:["A","B","C","D"]},
  fr:{q:`Question ${n+1}`,o:["A","B","C","D"]},
  a:0
}));

function $(x){return document.getElementById(x);}

function hide(){
  ["home","theory","theoryDetail","quiz","result"]
  .forEach(e=>$(e).classList.add("hidden"));
}

function goHome(){
  hide();
  $("home").classList.remove("hidden");
}

function setLang(l){
  lang=l;
  localStorage.setItem("lang",l);
  goHome();
}

/* THEORY */
function showTheory(){
  hide();
  $("theory").classList.remove("hidden");

  $("theoryList").innerHTML =
    theory.map((t,i)=>
      `<button onclick="openT(${i})">${t[lang][0]}</button>`
    ).join("");
}

function openT(i){
  hide();
  $("theoryDetail").classList.remove("hidden");

  $("theoryDetail").innerHTML=`
    <button onclick="showTheory()">Back</button>
    <h2>${theory[i][lang][0]}</h2>
    <p>${theory[i][lang][1]}</p>
  `;
}

/* QUIZ */
function startQuiz(){
  score=0;
  i=0;
  res=[];
  list=[...q].sort(()=>Math.random()-0.5);

  hide();
  $("quiz").classList.remove("hidden");

  showQ();
}

function showQ(){
  if(i>=list.length) return showR();

  const x=list[i][lang];

  $("q").innerText=x.q;

  $("a").innerHTML=x.o.map((o,j)=>
    `<button onclick="ans(${j})">${o}</button>`
  ).join("");

  $("fill").style.width=(i/list.length*100)+"%";
}

function ans(j){
  const x=list[i];
  if(j===x.a) score++;

  res.push({
    q:x[lang].q,
    o:x[lang].o,
    u:j,
    c:x.a
  });

  i++;
  showQ();
}

/* RESULT */
function showR(){
  hide();
  $("result").classList.remove("hidden");

  $("score").innerText=`Score: ${score}/${list.length}`;

  $("list").innerHTML=res.map(r=>`
    <div>
      <b>${r.q}</b><br>
      ${T[lang].your} ${r.o[r.u]}<br>
      ${T[lang].correct} ${r.o[r.c]}
    </div>
  `).join("");
}

/* RESTART */
function restart(){
  startQuiz();
}

goHome();
