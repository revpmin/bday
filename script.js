const envelope = document.getElementById("envelope");
const birthdayCard = document.getElementById("birthdayCard");

const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");

// Bandera para saber si ya arrancamos la música por primera vez
let musicStarted = false;

// -----------------------------------------------------------
// 1. Clic en cualquier parte de la pantalla → reproducir música
// -----------------------------------------------------------
function startMusicOnce() {
    // Solo la primera vez
    if (musicStarted) return;

    birthdayMusic.play()
        .then(() => {
            console.log("Música reproduciéndose");
            musicStarted = true;
            musicButton.textContent = "♫";
            // Una vez iniciada, quitamos el listener global
            document.removeEventListener("click", startMusicOnce);
        })
        .catch((error) => {
            console.error("Error al reproducir la música:", error);
            // No marcamos musicStarted para permitir reintentar
        });
}

document.addEventListener("click", startMusicOnce);

// -----------------------------------------------------------
// 2. Clic en el sobre → abrir carta + asegurar música
// -----------------------------------------------------------
envelope.addEventListener("click", function () {
    // Abrir sobre
    envelope.classList.add("open");

    // Intentar reproducir la música (por si el clic global no lo hizo aún)
    if (!musicStarted) {
        birthdayMusic.play()
            .then(() => {
                console.log("Música reproduciéndose desde el sobre");
                musicStarted = true;
                musicButton.textContent = "♫";
                document.removeEventListener("click", startMusicOnce);
            })
            .catch((error) => {
                console.error("Error al reproducir la música:", error);
            });
    }

    // Mostrar carta
    setTimeout(() => {
        birthdayCard.classList.add("visible");

        setTimeout(() => {
            birthdayCard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 300);
    }, 700);
});

// -----------------------------------------------------------
// 3. Botón de música → pausar / reanudar
// -----------------------------------------------------------
musicButton.addEventListener("click", function (event) {
    // Evita que el clic del botón dispare el listener global
    event.stopPropagation();

    if (birthdayMusic.paused) {
        birthdayMusic.play();
        musicButton.textContent = "♫";
    } else {
        birthdayMusic.pause();
        musicButton.textContent = "▶";
    }
});