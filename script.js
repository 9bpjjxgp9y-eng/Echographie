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
id: "introduction",
de: [
"Einführung",
"Echographie ist eine medizinische Bildgebungsmethode, die vollständig ohne ionisierende Strahlung arbeitet. Sie basiert auf Ultraschallwellen, die in den Körper gesendet und von Geweben unterschiedlich stark reflektiert werden. Diese Reflexionen werden von einer Sonde empfangen und in ein Bild umgewandelt. Der große Vorteil der Echographie ist, dass sie nicht-invasiv, schmerzfrei und in Echtzeit funktioniert. Dadurch kann der Arzt Bewegungen von Organen direkt beobachten, zum Beispiel das Schlagen des Herzens oder die Bewegung eines Fötus. Die Methode ist besonders wichtig in der Notfallmedizin, in der Schwangerschaftsvorsorge und in der Kardiologie. Sie ermöglicht eine schnelle Einschätzung ohne Risiko für den Patienten. Außerdem ist sie im Vergleich zu anderen bildgebenden Verfahren wie CT oder MRT deutlich günstiger und überall verfügbar. Die Qualität der Bilder hängt jedoch stark von der Erfahrung des Untersuchers und den physikalischen Eigenschaften des Gewebes ab."
],
fr: [
"Introduction",
"L’échographie est une méthode d’imagerie médicale qui n’utilise pas de rayonnements ionisants. Elle repose sur des ondes ultrasonores envoyées dans le corps, qui sont réfléchies différemment selon les tissus. Ces échos sont captés par une sonde et transformés en images en temps réel. L’avantage principal est qu’elle est non invasive, indolore et sûre. Elle permet d’observer directement le mouvement des organes, comme le cœur ou le fœtus. Elle est très utilisée en médecine d’urgence, en obstétrique et en cardiologie. Elle est aussi moins coûteuse et plus accessible que d’autres techniques comme le scanner ou l’IRM. Cependant, la qualité des images dépend de l’opérateur et des propriétés des tissus."
]
},

{
id: "ultrasounds",
de: [
"Ultraschall",
"Ultraschall sind mechanische Schallwellen mit Frequenzen über 20 kHz, die für das menschliche Ohr nicht hörbar sind. In der Medizin werden deutlich höhere Frequenzen verwendet, meist zwischen 1 und 15 MHz, um eine hohe Bildauflösung zu erreichen. Diese Wellen breiten sich im Körper aus und werden an Grenzflächen zwischen verschiedenen Geweben reflektiert. Flüssigkeiten, Muskeln und Knochen reflektieren Ultraschall unterschiedlich stark, wodurch ein kontrastreiches Bild entsteht. Die physikalische Grundlage ist die longitudinale Ausbreitung der Wellen, bei der die Teilchen in Richtung der Wellenausbreitung schwingen. Die Geschwindigkeit hängt vom Medium ab, in Weichteilen beträgt sie etwa 1540 m/s. Ultraschall wird auch in der Industrie und Materialprüfung verwendet, ist aber in der Medizin besonders wichtig, da er sicher und ohne Nebenwirkungen ist."
],
fr: [
"Ultrasons",
"Les ultrasons sont des ondes mécaniques dont la fréquence est supérieure à 20 kHz, donc inaudibles pour l’humain. En médecine, on utilise des fréquences beaucoup plus élevées, généralement entre 1 et 15 MHz, afin d’obtenir une meilleure résolution d’image. Ces ondes se propagent dans les tissus et sont réfléchies différemment selon les structures rencontrées. Les liquides, muscles et os renvoient des échos différents, ce qui permet de créer une image contrastée. Les ultrasons sont des ondes longitudinales où les particules vibrent dans la direction de propagation. Leur vitesse dépend du milieu et est d’environ 1540 m/s dans les tissus mous. Ils sont également utilisés en industrie, mais leur principal avantage en médecine est leur sécurité."
]
},

{
id: "compression",
de: [
"Compression und Rarefaktion",
"Ultraschallwellen bestehen aus abwechselnden Phasen von Kompression und Rarefaktion. Bei der Kompression werden die Teilchen des Mediums dichter zusammengepresst, während sie sich bei der Rarefaktion wieder auseinander bewegen. Dieser Wechsel erzeugt die typische Wellenausbreitung einer longitudinalen Welle. Diese Druckschwankungen sind es, die vom Ultraschallgerät gemessen werden. Je stärker die Unterschiede zwischen den Geweben, desto stärker die Reflexion des Signals. Diese physikalische Eigenschaft ist entscheidend für die Bildentstehung in der Echographie. Ohne diesen Wechsel von hoher und niedriger Dichte könnte keine Information über die Struktur des Körpers gewonnen werden."
],
fr: [
"Compression et raréfaction",
"Les ondes ultrasonores sont constituées d’alternances de compression et de raréfaction. Pendant la compression, les particules du milieu sont rapprochées, tandis que pendant la raréfaction elles s’éloignent. Ce phénomène crée une onde longitudinale. Ces variations de pression sont détectées par la sonde pour former une image. Plus les différences entre tissus sont importantes, plus le signal réfléchi est fort. Ce mécanisme est essentiel pour produire des images médicales précises en échographie."
]
},

{
id: "types",
de: [
"Arten der Echographie",
"Es gibt verschiedene Arten der Echographie, die jeweils für spezifische medizinische Anwendungen genutzt werden. Die 2D-Echographie ist die klassische Form und zeigt zweidimensionale Schnittbilder von Organen. Sie wird häufig in der allgemeinen Diagnostik und Schwangerschaft verwendet. Die 3D-Echographie erzeugt ein räumliches Bild, indem viele 2D-Schnitte kombiniert werden. Dadurch kann man Strukturen besser erkennen, zum Beispiel das Gesicht eines Fötus. Die 4D-Echographie ist eine Erweiterung der 3D-Technik in Echtzeit, sodass Bewegungen sichtbar werden. Besonders wichtig ist der Doppler-Ultraschall, der die Fließgeschwindigkeit von Blut misst. Er nutzt den Doppler-Effekt, um Veränderungen in der Frequenz zu analysieren. In der Kardiologie wird er verwendet, um Herzklappen und Blutfluss zu untersuchen. In der Abdominaldiagnostik untersucht man Organe wie Leber, Nieren oder Gallenblase. In der Schwangerschaft wird die Entwicklung des Fötus überwacht und Herzschläge kontrolliert."
],
fr: [
"Types d’échographie",
"Il existe plusieurs types d’échographie selon les besoins médicaux. L’échographie 2D est la forme classique et fournit des images en coupe. Elle est utilisée en diagnostic général et en obstétrique. L’échographie 3D permet de reconstruire une image en volume en combinant plusieurs coupes. Elle est souvent utilisée pour mieux visualiser certaines structures comme le visage du fœtus. L’échographie 4D est une version en temps réel de la 3D, permettant d’observer les mouvements. Le Doppler est une technique spécifique qui mesure la vitesse du flux sanguin grâce à l’effet Doppler. En cardiologie, il permet d’analyser les valves et la circulation sanguine. En échographie abdominale, on observe les organes comme le foie ou les reins. En obstétrique, on suit le développement du fœtus et son activité cardiaque."
]
},

{
id: "conclusion",
de: [
"Fazit",
"Die Echographie ist eine der wichtigsten modernen Bildgebungstechniken in der Medizin. Sie kombiniert physikalische Prinzipien der Schallwellen mit moderner Computertechnologie, um schnelle und sichere Diagnosen zu ermöglichen. Ihre Vorteile liegen in der Echtzeitdarstellung, der Sicherheit ohne Strahlenbelastung und der hohen Flexibilität in vielen medizinischen Bereichen. Besonders in der Schwangerschaft, Kardiologie und inneren Medizin ist sie unverzichtbar geworden. Trotz ihrer Vorteile hat sie auch Grenzen, da die Bildqualität von der Erfahrung des Untersuchers und der Beschaffenheit des Gewebes abhängt. Insgesamt bleibt die Echographie jedoch ein zentrales Werkzeug der modernen Diagnostik."
],
fr: [
"Conclusion",
"L’échographie est une technique d’imagerie médicale essentielle. Elle combine des principes physiques des ondes sonores avec des technologies informatiques modernes pour fournir des diagnostics rapides et sûrs. Ses avantages sont l’imagerie en temps réel, l’absence de radiation et sa grande flexibilité. Elle est indispensable en obstétrique, cardiologie et médecine interne. Cependant, ses limites incluent une dépendance à l’opérateur et aux caractéristiques des tissus. Malgré cela, elle reste un outil central en médecine moderne."
]
}
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
