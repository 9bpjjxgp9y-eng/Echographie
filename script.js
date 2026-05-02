let lang = localStorage.getItem("lang") || "de";
let score = 0;
let index = 0;
let quiz = [];
let results = [];

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

const theory = [
  {de:["Einführung","Echographie nutzt Ultraschall."],
   fr:["Introduction","L’échographie utilise des ultrasons."]},
  {de:["Ultraschall","Mechanische longitudinale Wellen."],
   fr:["Ultrasons","Ondes longitudinales."]},
  {de:["Kompression","Teilchen werden zusammengedrückt."],
   fr:["Compression","Les particules se rapprochent."]},
  {de:["Rarefaktion","Teilchen entfernen sich."],
   fr:["Raréfaction","Les particules s’éloignent."]},
  {de:["Reflexion","Wellen werden zurückgeworfen."],
   fr:["Réflexion","Les ondes reviennent."]},
  {de:["Absorption","Energie wird zu Wärme."],
   fr:["Absorption","Énergie devient chaleur."]},
  {de:["Frequenz","Hoch = Detail, niedrig = Tiefe"],
   fr:["Fréquence","Haute = détail, basse = profondeur"]},
  {de:["Sonden","Linear, konvex, phased"],
   fr:["Sondes","Linéaire, convexe, phased"]}
];

const questions = [
  {
    de:{q:"Was nutzt Echographie?",o:["Ultraschall","Licht","Röntgen","Magnet"]},
    fr:{q:"Que utilise l’échographie ?",o:["Ultrasons","Lumière","Rayons X","Champ"]},
    a:0
  },
  {
    de:{q:"Was entsteht?",o:["Bilder","Geräusche","Hitze","Licht"]},
    fr:{q:"Que produit-elle ?",o:["Images","Sons","Chaleur","Lumière"]},
    a:0
  },
  {
    de:{q:"Frequenz?",o:["1–15 MHz","20 Hz","100 Hz","1 kHz"]},
    fr:{q:"Fréquence ?",o:["1–15 MHz","20 Hz","100 Hz","1 kHz"]},
    a:0
  },
  {
    de:{q:"Gel?",o:["Luft entfernen","Kühlen","Strom","Farbe"]},
    fr:{q:"Gel ?",o:["Enlever l’air","Refroidir","Électricité","Couleur"]},
    a:0
  },
  {
    de:{q:"Reflexion?",o:["Zurück","Weiter","Verschwindet","Explodiert"]},
    fr:{q:"Réflexion ?",o:["Retour","Avance","Disparaît","Explosion"]},
    a:0
  },
  {
    de:{q:"Schwarz?",o:["Flüssigkeit","Knochen","Metall","Luft"]},
    fr:{q:"Noir ?",o:["Liquide","Os","Métal","Air"]},
    a:0
  },
  {
    de:{q:"Hyperechogen?",o:["Hell","Dunkel","Unsichtbar","Blau"]},
    fr:{q:"Hyperéchogène ?",o:["Clair","Sombre","Invisible","Bleu"]},
    a:0
  },
  {
    de:{q:"Herzsonde?",o:["Phased","Linear","Konvex","Rund"]},
    fr:{q:"Sonde cœur ?",o:["Phased","Linéaire","Convexe","Ronde"]},
    a:0
  },
  {
    de:{q:"Niedrige Frequenz?",o:["Tiefe","Farbe","Tempo","Ton"]},
    fr:{q:"Basse fréquence ?",o:["Profondeur","Couleur","Vitesse","Son"]},
    a:0
  },
  {
    de:{q:"Messung?",o:["Zeit","Temperatur","Druck","Farbe"]},
    fr:{q:"Mesure ?",o:["Temps","Température","Pression","Couleur"]},
    a:0
  },
  {
    de:{q:"Welle?",o:["Longitudinal","Quer","Still","Fest"]},
    fr:{q:"Onde ?",o:["Longitudinale","Transversale","Fixe","Solide"]},
    a:0
  },
  {
    de:{q:"Absorption?",o:["Wärme","Kälte","Licht","Strom"]},
    fr:{q:"Absorption ?",o:["Chaleur","Froid","Lumière","Électricité"]},
    a:0
  },
  {
    de:{q:"Impedanz?",o:["Material","Farbe","Größe","Zeit"]},
    fr:{q:"Impédance ?",o:["Matière","Couleur","Taille","Temps"]},
    a:0
  },
  {
    de:{q:"Echo?",o:["Reflexion","Absorption","Brechung","Diffusion"]},
    fr:{q:"Écho ?",o:["Réflexion","Absorption","Réfraction","Diffusion"]},
    a:0
  },
  {
    de:{q:"Tiefe messen?",o:["Zeit","Licht","Farbe","Druck"]},
    fr:{q:"Mesure profondeur ?",o:["Temps","Lumière","Couleur","Pression"]},
    a:0
  }
];

function $(id){return document.getElementById(id);}

function reset(){
  ["startScreen","theoryScreen","theoryDetailScreen","quizScreen","resultScreen"]
  .forEach(id=>$(id).classList.add("hidden"));
}

function goHome(){
  reset();
  $("startScreen").classList.remove("hidden");
}

function showTheory(){
  reset();
  $("theoryScreen").classList.remove("hidden");

  $("theoryMenu").innerHTML =
    theory.map((t,i)=>
      `<button onclick="openTheory(${i})">${t[lang][0]}</button>`
    ).join("");
}

function openTheory(i){
  reset();
  $("theoryDetailScreen").classList.remove("hidden");

  const t = theory[i];
  $("theoryDetail").innerHTML = `
    <button onclick="showTheory()">${texts[lang].back}</button>
    <h2>${t[lang][0]}</h2>
    <p>${t[lang][1]}</p>
  `;
}

function startQuiz(){
  score=0; index=0; results=[];
  quiz=[...questions].sort(()=>Math.random()-0.5);

  reset();
  $("quizScreen").classList.remove("hidden");

  showQuestion();
}

function showQuestion(){
  if(index>=quiz.length) return showResult();

  const q = quiz[index][lang];
  $("question").innerText = q.q;

  $("answers").innerHTML =
    q.o.map((o,i)=>`<button onclick="answer(${i})">${o}</button>`).join("");

  $("progressBar").style.width =
    (index/quiz.length*100)+"%";
}

function answer(i){
  const q=quiz[index];
  if(i===q.a) score++;

  results.push({q:q[lang].q,o:q[lang].o,u:i,c:q.a});
  index++;
  showQuestion();
}

function showResult(){
  reset();
  $("resultScreen").classList.remove("hidden");

  $("scoreText").innerText =
    `${texts[lang].result} ${score}/${quiz.length}`;

  $("resultList").innerHTML =
    results.map(r=>`
      <div style="padding:10px;margin:10px;
      background:${r.u===r.c?"#d4edda":"#f8d7da"}">
        <b>${r.q}</b><br>
        ${texts[lang].your} ${r.o[r.u]}<br>
        ${texts[lang].correct} ${r.o[r.c]}
      </div>
    `).join("");
}

function restartQuiz(){ startQuiz(); }

function setLanguage(l){
  lang=l;
  localStorage.setItem("lang",l);
  goHome();
}

goHome();
