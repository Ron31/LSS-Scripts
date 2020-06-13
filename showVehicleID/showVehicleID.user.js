// ==UserScript==
// @name         showVehicleID
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Shows Vehicle ID
// @author       Ron31
// @match        https://www.leitstellenspiel.de/vehicles/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let id = window.location.pathname.split('/')[2];

    const rowDiv = document.createElement('div');
    rowDiv.classList.add("row");
    const col1Div = document.createElement('div');
    col1Div.classList.add("col-xs-6");
    rowDiv.appendChild(col1Div);
    const strongText = document.createElement('strong');
    strongText.innerText = "ID";
    col1Div.appendChild(strongText);
    const col2Div = document.createElement('div');
    col2Div.classList.add("col-xs-6");
    col2Div.innerText = id;
    rowDiv.appendChild(col2Div);
    document.getElementById("vehicle_details").firstElementChild.appendChild(rowDiv);
})();