const envelope = document.getElementById("envelope");
const birthdayCard = document.getElementById("birthdayCard");

envelope.addEventListener("click", () => {

    // Abrir sobre
    envelope.classList.add("open");

    // Esperar a que termine parte de la animación
    setTimeout(() => {

        birthdayCard.classList.add("visible");

        // Desplazar suavemente hacia la carta
        setTimeout(() => {
            birthdayCard.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 300);

    }, 700);

});