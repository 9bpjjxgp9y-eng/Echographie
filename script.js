let lang = localStorage.getItem("lang") || "de";
let score = 0;
let index = 0;
let quizQuestions = [];
let results = [];

/* TEXT */
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

/* THEORY */
const theory = [
  {id:"intro", de:["Einführung","Echographie ist eine nicht-invasive Methode mit Ultraschall."], fr:["Introduction","L’échographie utilise des ultrasons."]},
  {id:"ultrasons", de:["Ultraschall","Mechanische longitudinale Wellen."], fr:["Ultrasons","Ondes mécaniques longitudinales."]},
  {id:"compression", de:["Kompression","Teilchen bewegen sich vor und zurück."], fr:["Compression","Les particules oscillent."]},
  {id:"impedance", de:["Impedanz","Materialunterschiede erzeugen Reflexion."], fr:["Impédance","Différences créent réflexion."]},
  {id:"reflection", de:["Reflexion","Wellen werden zurückgeworfen."], fr:["Réflexion","Les ondes reviennent."]},
  {id:"absorption", de:["Absorption","Energie wird zu Wärme."], fr:["Absorption","Énergie devient chaleur."]},
  {id:"frequency", de:["Frequenz","Hoch = Detail, niedrig = Tiefe"], fr:["Fréquence","Haute = détail, basse = profondeur"]},
  {id:"types", de:["Sonden","Linear, Konvex, Phased Array"], fr:["Sondes","Linéaire, convexe, phased array"]}
];

/* QUIZ */
const questions = [
  {de:{q:"Was nutzt Echographie?",o:["Ultraschall","Licht","Magnetfeld","Röntgen"]},fr:{q:"Que utilise l’échographie ?",o:["Ultrasons","Lumière","Rayons X","Champ"]},a:0},
  {de:{q:"Was entsteht?",o:["Bilder","Geräusche","Hitze","Licht"]},fr:{q:"Que produit-elle ?",o:["Images","Sons","Chaleur","Lumière"]},a:0},
  {de:{q:"Frequenz?",o:["1–15 MHz","20 Hz","100 Hz","1 kHz"]},fr:{q:"Fréquence ?",o:["1–15 MHz","20 Hz","100 Hz","1 kHz"]},a:0},
  {de:{q:"Gel?",o:["Luft entfernen","Kühlen","Farbe","Strom"]},fr:{q:"Gel ?",o:["Enlever l’air","Refroidir","Couleur","Électricité"]},a:0},
  {de:{q:"Reflexion?",o:["Zurück","Weiter","Verschwindet","Explodiert"]},fr:{q:"Réflexion ?",o:["Retour","Avance","Disparaît","Explosion"]},a:0},
  {de:{q:"Schwarz?",o:["Flüssigkeit","Knochen","Luft","Metall"]},fr:{q:"Noir ?",o:["Liquide","Os","Air","Métal"]},a:0},
  {de:{q:"Hyperechogen?",o:["Hell","Dunkel","Unsichtbar","Blau"]},fr:{q:"Hyperéchogène ?",o:["Clair","Sombre","Invisible","Bleu"]},a:0},
  {de:{q:"Herzsonde?",o:["Phased Array","Linear","Konvex","Rund"]},fr:{q:"Sonde cœur ?",o:["Phased array","Linéaire","Convexe","Ronde"]},a:0},
  {de:{q:"Niedrige Frequenz?",o:["Tiefe","Farbe","Tempo","Ton"]},fr:{q:"Basse fréquence ?",o:["Profondeur","Couleur","Vitesse","Son"]},a:0},
  {de:{q:"Messung?",o:["Zeit","Temperatur","Druck","Farbe"]},fr:{q:"Mesure ?",o:["Temps","Température","Pression","Couleur"]},a:0},
  {de:{q:"Welle?",o:["Longitudinal","Quer","Still","Fest"]},fr:{q:"Onde ?",o:["Longitudinale","Transversale","Fixe","Solide"]},a:0},
  {de:{q:"Absorption?",o:["Wärme","Kälte","Licht","Strom"]},fr:{q:"Absorption ?",o:["Chaleur","Froid","Lumière","Électricité"]},a:0},
  {de:{q:"Impedanz?",o:["Materialunterschied","Farbe","Größe","Zeit"]},fr:{q:"Impédance ?",o:["Différence de matière","Couleur","Taille","Temps"]},a:0},
  {de:{q:"Echo?",o:["Reflexion","Absorption","Brechung","Diffusion"]},fr:{q:"Écho ?",o:["Réflexion","Absorption","Réfraction","Diffusion"]},a:0},
  {de:{q:"Tiefe messen?",o:["Zeit","Licht","Farbe","Druck"]},fr:{q:"Mesure profondeur ?",o:["Temps","Lumière","Couleur","Pression"]},a:0}
];

/* HELPERS */
function $(id){return document.getElementById(id);}
function hideAll(){["startScreen","theoryScreen","theoryDetailScreen","quizScreen","resultScreen"].forEach(id=>$(id).classList.add("hidden"));}

/* NAV */
function showNav(){ $("nav").classList.remove("hidden"); }
function hideNav(){ $("nav").classList.add("hidden"); }

/* HOME */
function goHome(){
  hideAll();
  $("startScreen").classList.remove("hidden");
  hideNav();
}

/* THEORY */
function showTheory(){
  hideAll();
  $("theoryScreen").classList.remove("hidden");
  showNav();

  $("theoryMenu").innerHTML = theory.map(t=>
    `<button onclick="openTheory('${t.id}')">${t[lang][0]}</button>`
  ).join("");
}

function openTheory(id){
  const t = theory.find(x=>x.id===id);
  hideAll();
  $("theoryDetailScreen").classList.remove("hidden");

  $("theoryDetailScreen").innerHTML = `
    <button onclick="showTheory()">${texts[lang].back}</button>
    <h2>${t[lang][0]}</h2>
    <p>${t[lang][1]}</p>
  `;
}

/* QUIZ */
function startQuiz(){
  score=0; index=0; results=[];
  quizQuestions=[...questions].sort(()=>Math.random()-0.5);

  hideAll();
  $("quizScreen").classList.remove("hidden");
  showNav();
  showQuestion();
}

function showQuestion(){
  if(index>=quizQuestions.length) return showResult();

  const q=quizQuestions[index][lang];
  $("question").innerText=q.q;

  $("answers").innerHTML=q.o.map((o,i)=>
    `<button onclick="answer(${i})">${o}</button>`
  ).join("");

  $("progressBar").style.width=(index/questions.length*100)+"%";
}

function answer(i){
  const q=quizQuestions[index];
  if(i===q.a) score++;

  results.push({q:q[lang].q,o:q[lang].o,u:i,c:q.a});
  index++;
  showQuestion();
}

/* RESULT */
function showResult(){
  hideAll();
  $("resultScreen").classList.remove("hidden");

  $("scoreText").innerText=`${texts[lang].result} ${score}/${questions.length}`;

  $("resultList").innerHTML=results.map(r=>`
    <div class="${r.u===r.c?'correct':'wrong'}">
      <b>${r.q}</b><br>
      ${texts[lang].your} ${r.o[r.u]}<br>
      ${texts[lang].correct} ${r.o[r.c]}
    </div>
  `).join("");
}

/* OTHER */
function restartQuiz(){startQuiz();}
function setLanguage(l){lang=l;localStorage.setItem("lang",l);goHome();}

/* INIT */
goHome();
