function showInfo() {
  document.getElementById("output").innerText =
  "Echographie nutzt Ultraschallwellen.";
} 
function quiz() {
  let answer = prompt("Was nutzt Echographie?");
  
  if (answer === "Ultraschall") {
    alert("Richtig!");
  } else {
    alert("Falsch! Die richtige Antwort ist Ultraschall.");
  }
}
