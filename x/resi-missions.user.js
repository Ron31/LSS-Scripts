// ==UserScript==
// @name         ReSi-MissionCount
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Counts missions
// @author       Ron31
// @match        https://rettungssimulator.online/
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    if(!localStorage.aBuildings || JSON.parse(localStorage.aBuildings).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)) await $.getJSON('/api/userBuildings').done(data => localStorage.setItem('aBuildings', JSON.stringify({lastUpdate: new Date().getTime(), value: data})) );
    const aBuildings = JSON.parse(localStorage.aBuildings).value;
    const f = (x) => Math.ceil(4 * Math.log2(x + 2)+ 0.05 * x) - 4;
    const dep = aBuildings.filter(x => [1, 3, 5, 6].includes(x.buildingType));

    let span = document.querySelector('#missions  span');
    let missions = document.querySelectorAll('div.mission-list-mission');
    let t = document.createElement('span');
    t.innerHTML = '<span id="Ron31ml">' + missions.length + '</span>' + ' von ' + '<span id="Ron31mlb">' + f(dep.length) + '</span>';

    span.insertAdjacentElement('afterend', t);

    socket.on("newMission", () => {
        document.getElementById('Ron31ml').innerText = parseInt(document.getElementById('Ron31ml').innerText) + 1;
    });
    socket.on("finishMission", () =>{
        document.getElementById('Ron31ml').innerText = parseInt(document.getElementById('Ron31ml').innerText) - 1;
    });
})();
