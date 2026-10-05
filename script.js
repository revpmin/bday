const envelope = document.getElementById("envelope");
const birthdayCard = document.getElementById("birthdayCard");

const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");



envelope.addEventListener("click", function () {

    // Abrir sobre
    envelope.classList.add("open");

    // Reproducir canción
    birthdayMusic.play()
        .then(() => {
            console.log("Música reproduciéndose");
            musicButton.textContent = "♫";
        })
        .catch((error) => {
            console.error("Error al reproducir la música:", error);
        });

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



musicButton.addEventListener("click", function (event) {

    // Muy importante:
    // evita que el clic del botón se interprete
    // como un clic en el resto de la página
    event.stopPropagation();

    if (birthdayMusic.paused) {

        birthdayMusic.play();

        musicButton.textContent = "♫";

    } else {

        birthdayMusic.pause();

        musicButton.textContent = "▶";

    }

});