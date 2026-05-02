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
  {
    de: ["Introduction","Echographie ist eine bildgebende Methode ohne Strahlung, die Ultraschall nutzt."],
    fr: ["Introduction","L’échographie est une technique d’imagerie sans radiation utilisant les ultrasons."]
  },
  {
    de: ["Ultrasounds","Ultraschall sind hochfrequente mechanische Wellen (1–15 MHz)."],
    fr: ["Ultrasons","Ondes mécaniques haute fréquence (1–15 MHz)."]
  },
  {
    de: ["Compression / Rarefaction","Wechsel von Druckverdichtung und Entspannung erzeugt die Welle."],
    fr: ["Compression / raréfaction","Alternance de pression et détente crée l’onde."]
  },
  {
    de: ["Types","2D, 3D, 4D sowie Doppler (Blutflussmessung)."],
    fr: ["Types","2D, 3D, 4D et Doppler (flux sanguin)."]
  },
  {
    de: ["Conclusion","Echographie ist sicher, schnell und essenziell in der Medizin."],
    fr: ["Conclusion","L’échographie est sûre, rapide et essentielle."]
  }
];

/* QUESTIONS 15 */
const questions = [
  {de:{q:"Was nutzt Echographie?",o:["Ultraschall","Licht","Magnet","Röntgen"]},fr:{q:"Que utilise l’échographie?",o:["Ultrasons","Lumière","Magnétisme","Rayons X"]},a:0},
  {de:{q:"Was entsteht?",o:["Bilder","Hitze","Ton","Strom"]},fr:{q:"Que produit-elle?",o:["Images","Chaleur","Son","Électricité"]},a:0},
  {de:{q:"Frequenz?",o:["1–15 MHz","20 Hz","100 Hz","1 kHz"]},fr:{q:"Fréquence?",o:["1–15 MHz","20 Hz","100 Hz","1 kHz"]},a:0},
  {de:{q:"Gel?",o:["Luft entfernen","Kühlen","Farbe","Schutz"]},fr:{q:"Gel?",o:["Enlever air","Refroidir","Couleur","Protection"]},a:0},
  {de:{q:"Reflexion?",o:["Zurück","Stop","Weg","Bruch"]},fr:{q:"Réflexion?",o:["Retour","Stop","Perdu","Cassé"]},a:0},
  {de:{q:"Schwarz im Bild?",o:["Flüssigkeit","Knochen","Luft","Metall"]},fr:{q:"Noir image?",o:["Liquide","Os","Air","Métal"]},a:0},
  {de:{q:"Hyperechogen?",o:["Hell","Dunkel","Leer","Rot"]},fr:{q:"Hyperéchogène?",o:["Clair","Sombre","Vide","Rouge"]},a:0},
  {de:{q:"Herzsonde?",o:["Phased Array","Linear","Konvex","Ring"]},fr:{q:"Sonde cœur?",o:["Phased array","Linéaire","Convexe","Anneau"]},a:0},
  {de:{q:"Tiefe Frequenz?",o:["Tiefe","Farbe","Licht","Ton"]},fr:{q:"Basse fréquence?",o:["Profondeur","Couleur","Lumière","Son"]},a:0},
  {de:{q:"Messung?",o:["Zeit","Farbe","Masse","Strom"]},fr:{q:"Mesure?",o:["Temps","Couleur","Masse","Courant"]},a:0},
  {de:{q:"Welle?",o:["Longitudinal","Quer","Still","Fest"]},fr:{q:"Onde?",o:["Longitudinale","Transversale","Fixe","Dur"]},a:0},
  {de:{q:"Absorption?",o:["Wärme","Licht","Ton","Kälte"]},fr:{q:"Absorption?",o:["Chaleur","Lumière","Son","Froid"]},a:0},
  {de:{q:"Impedanz?",o:["Material","Farbe","Zeit","Form"]},fr:{q:"Impédance?",o:["Matière","Couleur","Temps","Forme"]},a:0},
  {de:{q:"Echo?",o:["Reflexion","Absorption","Bruch","Strom"]},fr:{q:"Écho?",o:["Réflexion","Absorption","Cassure","Courant"]},a:0},
  {de:{q:"Tiefe messen?",o:["Zeit","Licht","Farbe","Druck"]},fr:{q:"Mesurer profondeur?",o:["Temps","Lumière","Couleur","Pression"]},a:0}
];

/* FUNCTIONS */
function goHome(){
  hideAll();
  document.getElementById("home").style.display="block";
}

function hideAll(){
  ["home","theory","theoryDetail","quiz","result"]
  .forEach(id=>document.getElementById(id).style.display="none");
}

function setLang(l){
  lang=l;
  localStorage.setItem("lang",l);
  goHome();
}

/* THEORY */
function showTheory(){
  hideAll();
  document.getElementById("theory").style.display="block";

  document.getElementById("theoryMenu").innerHTML =
    theory.map((t,i)=>
      `<div class="card" onclick="openTheory(${i})">
        <b>${t[lang][0]}</b>
      </div>`
    ).join("");
}

function openTheory(i){
  hideAll();
  document.getElementById("theoryDetail").style.display="block";

  const t = theory[i][lang];

  document.getElementById("theoryDetail").innerHTML = `
    <div class="theory-card">
      <div class="theory-title">${t[0]}</div>
      <div class="theory-text">${t[1]}</div>
    </div>
    <button onclick="showTheory()">Back</button>
  `;
}

/* QUIZ */
function startQuiz(){
  score=0;
  index=0;
  results=[];
  quiz=[...questions].sort(()=>Math.random()-0.5);

  hideAll();
  document.getElementById("quiz").style.display="block";

  showQ();
}

function showQ(){
  if(index>=quiz.length) return showResult();

  const q=quiz[index][lang];

  document.getElementById("question").innerText=q.q;

  document.getElementById("answers").innerHTML=
    q.o.map((o,i)=>`<button onclick="answer(${i})">${o}</button>`).join("");

  document.getElementById("fill").style.width =
    (index/quiz.length*100)+"%";
}

function answer(i){
  if(i===quiz[index].a) score++;

  results.push({
    q:quiz[index][lang].q,
    o:quiz[index][lang].o,
    u:i,
    c:quiz[index].a
  });

  index++;
  showQ();
}

/* RESULT */
function showResult(){
  hideAll();
  document.getElementById("result").style.display="block";

  document.getElementById("score").innerText=
    "Score: "+score+"/"+quiz.length;

  document.getElementById("results").innerHTML=
    results.map(r=>`
      <div class="card">
        <b>${r.q}</b><br>
        ${T[lang].your} ${r.o[r.u]}<br>
        ${T[lang].correct} ${r.o[r.c]}
      </div>
    `).join("");
}

function restartQuiz(){
  startQuiz();
}

goHome();
