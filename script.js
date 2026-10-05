const envelope = document.getElementById("envelope");
const birthdayCard = document.getElementById("birthdayCard");
const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

let musicStarted = false;

// --- Intento de reproducción (una sola vez) ---
function attemptPlay() {
    if (musicStarted) return;

    // Reset por si acaso
    birthdayMusic.muted = false;
    if (birthdayMusic.volume === 0) birthdayMusic.volume = 1;

    const p = birthdayMusic.play();

    if (p !== undefined) {
        p.then(() => {
            console.log("✅ Música iniciada");
            musicStarted = true;
            musicButton.textContent = "♫";
            // Quitamos el listener global una vez logrado
            document.removeEventListener("click", attemptPlay, true);
            document.removeEventListener("touchstart", attemptPlay, true);
            document.removeEventListener("keydown", attemptPlay, true);
        }).catch((err) => {
            console.warn("⚠️ Play rechazado:", err.name, err.message);
            // No marcamos como iniciado → permitimos reintento en próximo clic
        });
    }
}

// --- Listeners globales en fase de CAPTURA (para Chrome) ---
document.addEventListener("click", attemptPlay, true);
document.addEventListener("touchstart", attemptPlay, true);
document.addEventListener("keydown", attemptPlay, true); // también teclado

// --- Clic en el sobre: abrir carta + intentar música ---
envelope.addEventListener("click", () => {
    envelope.classList.add("open");
    attemptPlay(); // por si el listener global no corrió

    setTimeout(() => {
        birthdayCard.classList.add("visible");
        setTimeout(() => {
            birthdayCard.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
    }, 700);
});

// --- Botón de música: pausar / reanudar ---
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