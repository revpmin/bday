const envelope = document.getElementById("envelope");
const birthdayCard = document.getElementById("birthdayCard");
const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

let musicStarted = false;

function tryPlayMusic(source = "global") {
    if (musicStarted) return;

    // Desmutear y resetear volumen por si acaso
    birthdayMusic.muted = false;
    if (birthdayMusic.volume === 0) birthdayMusic.volume = 1;

    const attempt = birthdayMusic.play();

    if (attempt !== undefined) {
        attempt
            .then(() => {
                console.log(`✅ Música iniciada desde: ${source}`);
                musicStarted = true;
                musicButton.textContent = "♫";
                window.removeEventListener("click", globalClickHandler, true);
                window.removeEventListener("touchstart", globalClickHandler, true);
            })
            .catch((err) => {
                console.warn(`⚠️ Play rechazado desde ${source}:`, err.name);
            });
    }
}

function globalClickHandler(e) {
    // Ignoramos clics en el botón de música (él se maneja solo)
    if (e.target === musicButton || musicButton.contains(e.target)) return;
    tryPlayMusic("global");
}

// Listener global en fase de captura (funciona aunque haya stopPropagation)
window.addEventListener("click", globalClickHandler, true);
// Soporte para móviles
window.addEventListener("touchstart", globalClickHandler, true);

// Clic en el sobre
envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    tryPlayMusic("envelope");

    setTimeout(() => {
        birthdayCard.classList.add("visible");
        setTimeout(() => {
            birthdayCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
    }, 700);
});

// Botón de música: pausa / reanuda
musicButton.addEventListener("click", (event) => {
    event.stopPropagation();
    if (birthdayMusic.paused) {
        birthdayMusic.play();
        musicButton.textContent = "♫";
    } else {
        birthdayMusic.pause();
        musicButton.textContent = "▶";
    }
});