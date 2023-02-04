"use strict";

function initializeBackButton() {
    let button = document.getElementById("backButton");
    button.addEventListener("click", backButtonHandler);
}

function backButtonHandler() {
    location.replace("/select.html");
}

document.addEventListener("DOMContentLoaded", initializeBackButton);

