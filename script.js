let lang = localStorage.getItem("lang") || "de";

let score = 0;
let index = 0;

const texts = {
  de: {
    theory: "Theorie",
    quiz: "Quiz",
    home: "🏠",
    restart: "🔄",
    theoryTitle: "Theorie",
    result: "Score🧑‍🏫 : "
  },
  fr: {
    theory: "Théorie",
    quiz: "Quiz",
    home: "🏠",
    restart: "🔄",
    theoryTitle: "Théorie",
    result: "Score👨‍🏫 : "
  }
};

const questions = [
  {
    de: { q: "Was nutzt Echographie?", options: ["Ultraschall", "Licht"] },
    fr: { q: "Que utilise l’échographie ?", options: ["Ultrasons", "Lumière"] },
    a: 0
  },
  {
    de: { q: "Was entsteht?", options: ["Bilder", "Geräusche"] },
    fr: { q: "Qu’est-ce qui est créé ?", options: ["Images", "Sons"] },
    a: 0
  }
];

function setLanguage(l) {
  lang = l;
  localStorage.setItem("lang", l);
  updateUI();
}

function updateUI() {
  document.getElementById("btnTheory").innerText = texts[lang].theory;
  document.getElementById("btnQuiz").innerText = texts[lang].quiz;

  document.getElementById("btnHome1").innerText = texts[lang].home;
  document.getElementById("btnHome2").innerText = texts[lang].home;
  document.getElementById("btnHome3").innerText = texts[lang].home;

  document.getElementById("btnRestart").innerText = texts[lang].restart;
  document.getElementById("btnRestart2").innerText = texts[lang].restart;

  document.getElementById("theoryTitle").innerText = texts[lang].theoryTitle;
}

function resetScreens() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("theoryScreen").style.display = "none";
  document.getElementById("theoryDetailScreen").style.display = "none";
  document.getElementById("quizScreen").style.display = "none";
  document.getElementById("resultScreen").style.display = "none";
}

function goHome() {
  resetScreens();
  document.getElementById("startScreen").style.display = "block";
}

function showTheory() {
  resetScreens();
  document.getElementById("theoryScreen").style.display = "block";
  document.getElementById("theoryText").innerText = theory[lang];
}

function startQuiz() {
  resetScreens();
  document.getElementById("quizScreen").style.display = "block";
  showQuestion();
}

function showQuestion() {
  if (index >= questions.length) {
    showResult();
    return;
  }

  let q = questions[index][lang];

  document.getElementById("question").innerText = q.q;

  document.getElementById("answers").innerHTML = `
    <button onclick="answer(0)">${q.options[0]}</button>
    <button onclick="answer(1)">${q.options[1]}</button>
  `;
}

function answer(val) {
  if (val === questions[index].a) {
    score++;
  }

  index++;
  showQuestion();
}

function showResult() {
  resetScreens();
  document.getElementById("resultScreen").style.display = "block";

  document.getElementById("resultText").innerText =
    texts[lang].result + score + "/" + questions.length;
}

function restartQuiz() {
  score = 0;
  index = 0;
  startQuiz();
}

updateUI();
goHome();
const theoryContent = [
  {
    id: "intro",
    title: {
      de: "00 Einführung",
      fr: "00 Introduction"
    },
    content: {
      de: `
<b>Nicht-invasive Bildgebungsmethode</b><br><br>

Die Echographie ist eine nicht-invasive medizinische Methode. Das bedeutet, dass kein chirurgischer Eingriff notwendig ist und nichts in den Körper eingeführt wird. Sie ist daher schmerzfrei und sicher.<br><br>

Sie basiert auf Ultraschallwellen, also Schallwellen mit hoher Frequenz, die für den Menschen nicht hörbar sind. Diese werden in den Körper gesendet und reflektiert, wodurch ein Bild entsteht.<br><br>

Ein großer Vorteil ist die Echtzeit-Beobachtung von Gewebe. So kann man Bewegungen wie das schlagende Herz direkt sehen.<br><br>

Diese Technik wird in vielen medizinischen Bereichen genutzt, wie Kardiologie oder Schwangerschaft.
`,
      fr: `
<b>Méthode d’imagerie non invasive</b><br><br>

L’échographie est une méthode d’imagerie médicale non invasive, ce qui signifie qu’elle ne nécessite aucune intervention chirurgicale. Elle est donc sans douleur et sans danger.<br><br>

Elle utilise des ultrasons, c’est-à-dire des ondes sonores à haute fréquence, invisibles pour l’oreille humaine. Ces ondes traversent le corps et sont réfléchies pour former une image.<br><br>

Un avantage important est l’observation en temps réel des tissus. On peut voir des mouvements comme le cœur en direct.<br><br>

Elle est utilisée dans plusieurs domaines médicaux, comme la cardiologie ou la grossesse.
`
    }
  },

  {
  id: "ultrasons",
  title: {
    de: "01 Ultraschall",
    fr: "01 Ultrasons"
  },
  content: {
    de: `
<b>Definition von Ultraschall</b><br><br>

Ultraschall sind mechanische Druckwellen. Das bedeutet, dass es sich um Druckschwankungen handelt, die sich in einem Medium wie Luft, Wasser oder menschlichem Gewebe ausbreiten.<br><br>

Im Gegensatz zu elektromagnetischen Wellen benötigen Ultraschallwellen Teilchen, um sich fortzubewegen. Deshalb können sie sich nicht im Vakuum ausbreiten.<br><br>

Ultraschallwellen sind longitudinale Wellen. Das heißt, die Teilchen bewegen sich in die gleiche Richtung wie die Ausbreitung der Welle.<br><br>

<b>Frequenzen</b><br><br>

Das menschliche Ohr kann Schall im Bereich von etwa 20 Hz bis 20.000 Hz wahrnehmen. Darunter spricht man von Infraschall, darüber von Ultraschall.<br><br>

In der Echographie werden typischerweise Frequenzen zwischen 1 und 15 MHz verwendet. Diese hohen Frequenzen ermöglichen es, detaillierte Bilder der inneren Strukturen des Körpers zu erzeugen.<br><br>

Durch diese Eigenschaften eignet sich Ultraschall besonders gut für die medizinische Bildgebung.
`,
    fr: `
<b>Définition des ultrasons</b><br><br>

Les ultrasons sont des ondes mécaniques de pression. Cela signifie qu’il s’agit de variations de pression qui se propagent dans un milieu matériel, comme l’air, l’eau ou les tissus du corps humain.<br><br>

Contrairement aux ondes électromagnétiques, les ultrasons ont besoin de particules pour se transmettre. Ils ne peuvent donc pas se propager dans le vide.<br><br>

Les ultrasons sont des ondes longitudinales. Cela veut dire que les particules du milieu vibrent dans la même direction que la propagation de l’onde.<br><br>

<b>Fréquences</b><br><br>

L’oreille humaine peut entendre des sons entre environ 20 Hz et 20 000 Hz. En dessous de cette limite, on parle d’infrasons, et au-dessus, d’ultrasons.<br><br>

Les ultrasons utilisés en échographie se situent généralement entre 1 et 15 MHz. Ces hautes fréquences permettent d’obtenir des images précises des tissus internes du corps.<br><br>

Grâce à ces propriétés, les ultrasons sont particulièrement adaptés à l’imagerie médicale.
`
  }
},

{
  id: "ondes",
  title: {
    de: "02 Kompression / Rarefaktion",
    fr: "02 Compression / Rarefaction"
  },
  content: {
    de: `
<b>Variationen des Drucks</b><br><br>

Schall- und Ultraschallwellen bestehen aus <b>Variationen des Drucks</b> in einem Medium. Diese Druckänderungen breiten sich im Material aus, ohne dass sich das Material selbst fortbewegt.<br><br>

<b>Kompression</b><br>
Bei der Kompression werden die Teilchen eines Mediums <b>zusammengedrückt</b>. Dadurch steigt der Druck in diesem Bereich.<br><br>

<b>Rarefaktion</b><br>
Bei der Rarefaktion werden die Teilchen <b>auseinandergezogen</b>. Der Druck in diesem Bereich sinkt.<br><br>

<b>Zusammenhang mit der Echographie</b><br>
Die Echographie nutzt die Abfolge von Kompression und Rarefaktion, um Ultraschallwellen im Körper zu erzeugen und deren Reflexion zu messen.<br><br>

<b>Bildentstehung</b><br>
Wenn die Wellen auf unterschiedliche Gewebe treffen, werden sie unterschiedlich stark reflektiert. Aus diesen Echos entsteht das medizinische Bild.
`,
    fr: `
<b>Variations de pression</b><br><br>

Les ondes sonores et ultrasonores sont des <b>variations de pression</b> qui se propagent dans un milieu. Le matériau ne se déplace pas, seules les perturbations se déplacent.<br><br>

<b>Compression</b><br>
Lors d’une compression, les particules du milieu sont <b>rapprochées</b>, ce qui augmente la pression dans cette zone.<br><br>

<b>Raréfaction</b><br>
Lors d’une raréfaction, les particules sont <b>éloignées</b>, ce qui diminue la pression.<br><br>

<b>Lien avec l’échographie</b><br>
L’échographie utilise l’alternance entre compression et raréfaction pour générer les ultrasons et analyser leurs réflexions dans le corps.<br><br>

<b>Formation de l’image</b><br>
Selon les tissus rencontrés, les ondes sont plus ou moins réfléchies. Ces échos permettent de créer une image médicale.
`
  }
},

  {
  id: "impedance",
  title: {
    de: "03 Impedanz & Gewebe",
    fr: "03 Impédance & tissus"
  },
  content: {
    de: `
<b>Akustische Impedanz & Gewebe</b><br><br>

Die <b>akustische Impedanz</b> beschreibt, wie stark ein Gewebe den Ultraschallwellen „Widerstand“ entgegensetzt. Unterschiedliche Gewebe haben unterschiedliche Impedanzen.<br><br>

<b>Interaktion der Wellen mit Gewebe:</b><br><br>

<b>1. Reflexion</b><br>
Ein Teil der Ultraschallwelle wird an Grenzflächen zurückgeworfen. Dies ist die wichtigste Grundlage der Bildentstehung.<br><br>

<b>2. Brechung (Refraction)</b><br>
Die Welle ändert ihre Richtung, wenn sie von einem Medium in ein anderes übergeht.<br><br>

<b>3. Streuung (Scattering)</b><br>
Die Welle wird in viele kleine Richtungen verteilt, besonders bei unregelmäßigen Strukturen.<br><br>

<b>4. Absorption</b><br>
Ein Teil der Energie wird vom Gewebe aufgenommen und in Wärme umgewandelt.<br><br>

<b>Helligkeit im Bild:</b><br><br>

• <b>Hyperechogen (weiß)</b> → starke Reflexion (z. B. Knochen, Luft)<br>
• <b>Hypoechogen (grau)</b> → mittlere Reflexion (z. B. Muskeln)<br>
• <b>Anechogen (schwarz)</b> → keine Reflexion (z. B. Flüssigkeiten)<br><br>

<b>Warum Luft ein Problem ist:</b><br>
Luft hat eine sehr hohe Impedanzunterschiede zum Gewebe → fast komplette Reflexion → schlechte Bildübertragung.<br><br>

<b>Warum Gel benutzt wird:</b><br>
Das Gel entfernt die Luft zwischen Sonde und Haut. Dadurch können die Ultraschallwellen besser in den Körper eindringen und ein klares Bild erzeugen.
`,
    fr: `
<b>Impédance acoustique & tissus</b><br><br>

L’<b>impédance acoustique</b> décrit la résistance d’un tissu au passage des ultrasons. Chaque tissu possède une impédance différente.<br><br>

<b>Interactions des ondes :</b><br><br>

<b>1. Réflexion</b><br>
Une partie de l’onde est renvoyée lorsqu’elle rencontre une interface entre deux tissus.<br><br>

<b>2. Réfraction</b><br>
L’onde change de direction lorsqu’elle passe d’un milieu à un autre.<br><br>

<b>3. Diffusion (scattering)</b><br>
L’onde est dispersée dans plusieurs directions à cause des structures irrégulières.<br><br>

<b>4. Absorption</b><br>
Une partie de l’énergie est absorbée par les tissus et transformée en chaleur.<br><br>

<b>Aspect de l’image :</b><br><br>

• <b>Hyperéchogène (blanc)</b> → forte réflexion (os, air)<br>
• <b>Hypoéchogène (gris)</b> → réflexion moyenne (muscles)<br>
• <b>Anéchogène (noir)</b> → pas de réflexion (liquides)<br><br>

<b>Problème de l’air :</b><br>
L’air provoque une forte différence d’impédance → réflexion presque totale → image de mauvaise qualité.<br><br>

<b>Utilisation du gel :</b><br>
Le gel élimine l’air entre la sonde et la peau. Cela permet une meilleure transmission des ultrasons et une image plus claire.
`
  }
},

{
  id: "mesure",
  title: {
    de: "04 Messprinzip",
    fr: "04 Principe de mesure"
  },
  content: {
    de: `
<b>Prinzip der Echographie (Messprinzip)</b><br><br>

Die Echographie basiert auf der Messung der Zeit, die ein Ultraschallsignal benötigt, um ins Gewebe zu gelangen und als Echo zur Sonde zurückzukehren.<br><br>

<b>Grundprinzip:</b><br>
Die Sonde sendet kurze Ultraschallimpulse in den Körper. Diese werden an verschiedenen Gewebegrenzen reflektiert und kehren als Echo zurück.<br><br>

<b>Entfernungsmessung:</b><br>
Die Tiefe eines Organs wird berechnet durch die Laufzeit des Echos. Je länger die Zeit, desto tiefer liegt das Gewebe.<br><br>

<b>Formel-Idee:</b><br>
Entfernung = (Schallgeschwindigkeit × Zeit) / 2<br>
(Division durch 2, weil Hin- und Rückweg gemessen werden)<br><br>

<b>Bildentstehung:</b><br>
Das Gerät setzt viele dieser Messpunkte zusammen und erstellt daraus ein zweidimensionales Bild.<br><br>

<b>Beispiel: Herz (Echokardiographie)</b><br>
Beim Herz werden schnelle Bewegungen gemessen. Die Ultraschallwellen zeigen in Echtzeit, wie sich das Herz zusammenzieht und wieder entspannt.<br><br>

So kann man z. B. sehen:<br>
• Herzklappenbewegung<br>
• Blutfluss<br>
• Herzschlag in Echtzeit<br><br>

Das ist besonders wichtig zur Diagnose von Herzkrankheiten.
`,
    fr: `
<b>Principe de l’échographie (principe de mesure)</b><br><br>

L’échographie repose sur la mesure du temps nécessaire à une onde ultrasonore pour pénétrer dans le corps et revenir sous forme d’écho.<br><br>

<b>Principe de base :</b><br>
La sonde émet des impulsions ultrasonores. Ces ondes sont réfléchies par les tissus et reviennent vers la sonde.<br><br>

<b>Mesure de la profondeur :</b><br>
La profondeur d’un organe est calculée grâce au temps de retour de l’écho. Plus le temps est long, plus la structure est profonde.<br><br>

<b>Idée de formule :</b><br>
Distance = (vitesse du son × temps) / 2<br>
(le facteur 2 correspond à l’aller-retour de l’onde)<br><br>

<b>Formation de l’image :</b><br>
L’appareil combine de nombreux points de mesure pour créer une image en deux dimensions.<br><br>

<b>Exemple : cœur (échocardiographie)</b><br>
Dans le cas du cœur, on observe des mouvements rapides en temps réel. L’échographie permet de voir la contraction et la relaxation du cœur.<br><br>

On peut ainsi analyser :<br>
• le mouvement des valves cardiaques<br>
• le flux sanguin<br>
• le rythme cardiaque en temps réel<br><br>

C’est essentiel pour diagnostiquer les maladies cardiaques.
`
  }
},

{
  id: "types",
  title: {
    de: "05 Arten der Echographie",
    fr: "05 Types d’échographie"
  },
  content: {
    de: `
<b>Arten der Echographie</b><br><br>

Die Echographie wird in verschiedenen medizinischen Bereichen eingesetzt. Je nach Anwendung werden unterschiedliche Sonden und Frequenzen verwendet, um optimale Bilder zu erhalten.<br><br>

<b>1. Echokardiographie (Herzuntersuchung)</b><br><br>

Die Echokardiographie dient zur Untersuchung des Herzens in Echtzeit.<br><br>

<b>Sonden:</b><br>
• Phased-Array-Sonde (meist zwischen 1–5 MHz)<br>
Diese Sonde ist klein und ermöglicht es, zwischen den Rippen zu arbeiten und das Herz gut zu erreichen.<br><br>

<b>Warum diese Sonde?</b><br>
Das Herz liegt tief im Brustkorb und bewegt sich schnell. Deshalb braucht man eine Sonde mit guter Eindringtiefe und schneller Bildaufnahme.<br><br>

<b>Was wird untersucht?</b><br>
• Herzklappen<br>
• Herzkontraktion<br>
• Blutfluss (auch mit Doppler möglich)<br><br>

<b>2. Schwangerschafts-Echographie</b><br><br>

Diese Untersuchung dient der Beobachtung des Fötus im Mutterleib.<br><br>

<b>Sonden:</b><br>
• Konvexsonde (ca. 2–6 MHz)<br>
Diese Sonde hat eine große Tiefe und eignet sich für den Bauchraum.<br><br>

<b>Warum diese Sonde?</b><br>
Der Fötus liegt tief im Körper und man braucht gute Eindringtiefe, aber trotzdem ausreichende Bildqualität.<br><br>

<b>Was wird untersucht?</b><br>
• Entwicklung des Fötus<br>
• Herzschlag des Babys<br>
• Organentwicklung<br><br>

<b>3. Abdominale Echographie (Bauchraum)</b><br><br>

Diese Untersuchung betrifft Organe wie Leber, Nieren, Milz oder Gallenblase.<br><br>

<b>Sonden:</b><br>
• Konvexsonde (2–5 MHz)<br>
oder bei oberflächlichen Strukturen<br>
• Linearsonde (7–12 MHz)<br><br>

<b>Warum diese Sonden?</b><br>
Tiefe Organe brauchen niedrige Frequenzen für bessere Eindringtiefe, oberflächliche Strukturen hohe Frequenzen für bessere Auflösung.<br><br>

<b>Was wird untersucht?</b><br>
• Leber<br>
• Nieren<br>
• Gallensteine<br>
• Flüssigkeitsansammlungen<br><br>

<b>Weitere Arten der Echographie</b><br><br>

Es gibt noch viele andere Anwendungen, zum Beispiel:<br>
• Gefäßsonographie (Doppler)<br>
• Schilddrüsen-Echographie<br>
• Muskel- und Gelenksonographie<br>
• Notfallsonographie (FAST-Scan)<br><br>

Diese werden hier nicht im Detail erklärt, da sie sehr spezialisiert sind.
`,
    fr: `
<b>Types d’échographie</b><br><br>

L’échographie est utilisée dans de nombreux domaines médicaux. Selon l’application, différentes sondes et fréquences sont utilisées pour obtenir la meilleure image possible.<br><br>

<b>1. Échocardiographie (cœur)</b><br><br>

L’échocardiographie permet d’observer le cœur en temps réel.<br><br>

<b>Sonde utilisée :</b><br>
• Sonde phased-array (1–5 MHz)<br>
Elle est petite et permet de passer entre les côtes pour atteindre le cœur.<br><br>

<b>Pourquoi cette sonde ?</b><br>
Le cœur est profond et en mouvement rapide, il faut donc une bonne pénétration et une acquisition rapide des images.<br><br>

<b>Examens :</b><br>
• valves cardiaques<br>
• contraction du cœur<br>
• flux sanguin (Doppler)<br><br>

<b>2. Échographie de grossesse</b><br><br>

Elle permet de suivre le développement du fœtus.<br><br>

<b>Sonde utilisée :</b><br>
• Sonde convexe (2–6 MHz)<br>
Elle permet d’explorer en profondeur la cavité abdominale.<br><br>

<b>Pourquoi cette sonde ?</b><br>
Le fœtus est situé profondément dans le corps, il faut donc une bonne pénétration des ultrasons.<br><br>

<b>Examens :</b><br>
• développement du fœtus<br>
• battements du cœur<br>
• organes du bébé<br><br>

<b>3. Échographie abdominale</b><br><br>

Elle sert à examiner les organes abdominaux comme le foie, les reins ou la vésicule biliaire.<br><br>

<b>Sondes utilisées :</b><br>
• sonde convexe (2–5 MHz)<br>
• sonde linéaire (7–12 MHz pour structures superficielles)<br><br>

<b>Pourquoi ces sondes ?</b><br>
Les organes profonds nécessitent des basses fréquences, tandis que les structures superficielles nécessitent une meilleure résolution.<br><br>

<b>Examens :</b><br>
• foie<br>
• reins<br>
• calculs biliaires<br>
• liquides anormaux<br><br>

<b>Autres types d’échographie</b><br><br>

Il existe aussi d’autres examens comme :<br>
• échographie Doppler vasculaire<br>
• échographie de la thyroïde<br>
• échographie musculo-squelettique<br>
• échographie d’urgence (FAST)<br><br>

Ces types ne sont pas détaillés ici car ils sont plus spécialisés.
`
  }
},

  {
  id: "conclusion",
  title: {
    de: "06 Fazit",
    fr: "06 Conclusion"
  },
  content: {
    de: `
<b>Fazit</b><br><br>

Die Echographie zeigt, wie physikalische Prinzipien direkt in der Medizin genutzt werden können.<br><br>

Sie verbindet einfache Ultraschallwellen mit komplexer Bildentstehung und ermöglicht so eine sichere Untersuchung des Körpers ohne Eingriff.<br><br>

Besonders wichtig ist, dass die Qualität der Bilder von vielen Faktoren abhängt, wie der Impedanz der Gewebe und der richtigen Wahl der Sonde.<br><br>

Insgesamt ist die Echographie ein sehr präzises, schnelles und unverzichtbares Werkzeug in der modernen Diagnostik.
`,
    fr: `
<b>Conclusion</b><br><br>

L’échographie montre comment des principes physiques simples peuvent être utilisés en médecine.<br><br>

Elle transforme des ondes ultrasonores en images utiles pour examiner le corps sans intervention.<br><br>

La qualité des images dépend de plusieurs facteurs comme l’impédance des tissus et le choix de la sonde.<br><br>

Dans l’ensemble, l’échographie est un outil essentiel, rapide et très précis pour le diagnostic médical.
`
  }
},
];
function showTheory() {
  resetScreens();
  document.getElementById("theoryScreen").style.display = "block";

  let menuHTML = "";

  theoryContent.forEach(item => {
    menuHTML += `
      <button onclick="openDetail('${item.id}')">
        ${item.title[lang]}
      </button><br>
    `;
  });

  document.getElementById("theoryMenu").innerHTML = menuHTML;
}

function openDetail(id) {
  resetScreens();
  document.getElementById("theoryDetailScreen").style.display = "block";

  let item = theoryContent.find(x => x.id === id);

  document.getElementById("detailTitle").innerText =
    item.title[lang];

document.getElementById("detailContent").innerHTML =
  item.content[lang];
}

function backToTheory() {
  showTheory();
}
