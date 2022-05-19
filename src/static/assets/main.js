"use strict";

function main() {

    const askQuestion = document.querySelector(".ask-question");
    const form = document.querySelector("form");
    const sendingConfirmation = document.querySelector(".sending-confirmation");


    askQuestion.addEventListener("click", onClickAsk);
    form.addEventListener("submit", onSubmit);

    function onClickAsk() {
        form.style.display = "flex";
        sendingConfirmation.style.display = "none";
    }

    async function onSubmit(event) {

        event.preventDefault();

        let data = new FormData(form);

        let response = await fetch("/", {
            method: "POST",
            body: data
        });

        if (response.status === 200) {
            form.style.display = "none";
            sendingConfirmation.style.display = "flex";
        }
    }

}

main();