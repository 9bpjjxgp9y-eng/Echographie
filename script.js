let score = 0;

function showInfo() {
  document.getElementById("output").innerText =
  "Echographie nutzt Ultraschallwellen, um Bilder im Körper zu erzeugen.";
}

function quiz() {
  let answer = prompt("Was nutzt Echographie?");

  if (answer && answer.toLowerCase() === "ultraschall") {
    score++;
    alert("Richtig! Punktestand: " + score);
  } else {
    alert("Falsch! Richtige Antwort: Ultraschall. Punktestand: " + score);
  }
}
