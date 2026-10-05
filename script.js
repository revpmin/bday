const envelope = document.getElementById("envelope");
const birthdayCard = document.getElementById("birthdayCard");

const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");


// =========================
// MÚSICA
// =========================

// Intentar iniciar la canción al cargar la página
window.addEventListener("load", () => {
    birthdayMusic.play().catch(() => {
        // El navegador bloqueó el autoplay.
        // Se podrá iniciar mediante el botón.
        musicButton.classList.add("needs-play");
    });
});


// Botón de música
musicButton.addEventListener("click", () => {

    if (birthdayMusic.paused) {

        birthdayMusic.play();

        musicButton.textContent = "♫";
        musicButton.setAttribute("aria-label", "Pausar música");

    } else {

        birthdayMusic.pause();

        musicButton.textContent = "▶";
        musicButton.setAttribute("aria-label", "Reproducir música");
    }

});


// =========================
// SOBRE
// =========================

envelope.addEventListener("click", () => {

    envelope.classList.add("open");

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