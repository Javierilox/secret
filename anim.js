// Sincronizar las letras con la canción
var audio = document.querySelector("audio");
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
/*var lyricsData = [
  { text: "Unmei da toka mirai toka", time: 2 },
  { text: "tte kotoba ga dore dake te o", time: 5 },
  { text: "nobasou to todokanai", time: 8 },
  { text: "basho de bokura koi o suru", time: 11 },
  { text: "tokei no hari mo futari o", time: 16 },
  { text: "yokome ni minagara susumu", time: 20 },
  { text: "sonna sekai o futari de", time: 24 },
  { text: "isshou iya, nanshou demo", time: 28 },
  { text: "ikinuite ikou", time: 32 }
];*/

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audio.currentTime);
  
  // Corrección en la lógica para que las líneas cambien exactamente cuando toca la siguiente
  var currentLine = lyricsData.find(
    (line, index) => {
      var nextLine = lyricsData[index + 1];
      return time >= line.time && (!nextLine || time < nextLine.time);
    }
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.5; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}

setInterval(updateLyrics, 1000);

// Función para ocultar el título 
function ocultarTitulo() {
  var titulo = document.querySelector(".titulo");
  if (titulo) {
    titulo.style.animation =
      "fadeOut 3s ease-in-out forwards"; /* Duración y función de temporización de la desaparición */
    setTimeout(function () {
      titulo.style.display = "none";
    }, 6000); // Espera 3 segundos antes de ocultar completamente
  }
}

// Llama a la función después de 12 segundos (12000 milisegundos) para no tapar la animación
setTimeout(ocultarTitulo, 12000);