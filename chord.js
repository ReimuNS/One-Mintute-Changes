"use strict";

let transitionData;
let selectedChords;

function initializeChord() {
    loadTransitionData();

    let button = document.getElementById("transitionCountAddButton");
    button.addEventListener("click", transitionCountAddButtonHandler);

    setTransitionDataTable();
}

function loadTransitionData() {
    const transitionItem = localStorage.getItem("transitionData");
    if (transitionItem === null) {
        transitionData = {};
    }
    else {
        transitionData = JSON.parse(transitionItem);
    }

    const chordItem = localStorage.getItem("selectedChords");
    if (chordItem === null) {
        alert("Oops"); // TODO: better error reporting
        return;
    }

    selectedChords = JSON.parse(chordItem);

    document.getElementById("titleChord1").innerText = selectedChords.ch1;
    document.getElementById("titleChord2").innerText = selectedChords.ch2;
}

function saveTransitionData() {
    localStorage.setItem("transitionData", JSON.stringify(transitionData));
}

function addEntry(ch1, ch2, amount) {
    // Make sure they are stored in order so we don't store separate entries for A-D and D-A etc.
    let chords = [ch1, ch2];
    chords.sort();

    let transitionKey = chords.toString();

    if (!transitionData.hasOwnProperty(transitionKey)) {
        transitionData[transitionKey] = [];
    }

    const dateString = (new Date()).toLocaleString();
    transitionData[transitionKey].push({"date": dateString, "amount": amount});

    saveTransitionData();

    addToTransitionDataTable(amount, dateString);
}

function transitionCountAddButtonHandler() {
    let amount = document.getElementById("transitionCountInput").value;

    // TODO: error handling
    
    addEntry(selectedChords.ch1, selectedChords.ch2, parseInt(amount));
}

function createTableElement(amount, dateString) {
    let div = document.createElement("div");

    let amountElement = document.createElement("p");
    let dateElement = document.createElement("p");

    let amountText = document.createTextNode(amount.toString());
    let dateText = document.createTextNode(dateString);

    amountElement.appendChild(amountText);
    dateElement.appendChild(dateText);

    div.appendChild(amountElement);
    div.appendChild(dateElement);

    div.setAttribute("class", "transitionCountListElement");

    return div;
}

function addToTransitionDataTable(amount, dateString) {
    let listDiv = document.getElementById("transitionCountListDiv");
    let newElement = createTableElement(amount, dateString);

    listDiv.prepend(newElement);

}

function setTransitionDataTable() {
    let listDiv = document.getElementById("transitionCountListDiv");

    let chords = [selectedChords.ch1, selectedChords.ch2];
    chords.sort();

    const key = chords.toString();
    if (transitionData.hasOwnProperty(key)) {
        let newChildren = transitionData[key].map(x => {
            return createTableElement(x.amount, x.date);
        });
        newChildren.reverse(); // need to reverse so that most recent entries are displayed first

        listDiv.replaceChildren(...newChildren);
    }
    else {
        listDiv.replaceChildren();
    }
}

document.addEventListener("DOMContentLoaded", initializeChord);

