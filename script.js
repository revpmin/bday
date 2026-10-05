const envelope = document.getElementById("envelope");
const birthdayCard = document.getElementById("birthdayCard");

const birthdayMusic = document.getElementById("birthdayMusic");
const musicButton = document.getElementById("musicButton");


envelope.addEventListener("click", () => {

    // Iniciar música
    birthdayMusic.play()
        .then(() => {
            musicButton.textContent = "♫";
        })
        .catch((error) => {
            console.log("No se pudo reproducir la música:", error);
        });


    // Abrir sobre
    envelope.classList.add("open");


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



musicButton.addEventListener("click", (event) => {

    // Evita que el clic afecte al resto de la página
    event.stopPropagation();

    if (birthdayMusic.paused) {

        birthdayMusic.play();

        musicButton.textContent = "♫";
        musicButton.setAttribute(
            "aria-label",
            "Pausar música"
        );

    } else {

        birthdayMusic.pause();

        musicButton.textContent = "▶";
        musicButton.setAttribute(
            "aria-label",
            "Reproducir música"
        );

    }

});