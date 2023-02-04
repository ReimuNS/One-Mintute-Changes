"use strict";

function initializeChordSelect() {
    let button = document.getElementById("chordSelectButton");
    button.addEventListener("click", chordSelectButtonHandler);
}

function chordSelectButtonHandler() {
    const ch1 = document.getElementById("chordSelector1").value;
    const ch2 = document.getElementById("chordSelector2").value;

    if (ch1 !== "" && ch2 !== "") {
        localStorage.setItem(
            "selectedChords",
            JSON.stringify({"ch1": ch1, "ch2": ch2})
        );

        location.replace("/chord.html");
    }
}

document.addEventListener("DOMContentLoaded", initializeChordSelect);

