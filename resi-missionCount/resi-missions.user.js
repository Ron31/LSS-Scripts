// ==UserScript==
// @name         ReSi-MissionCount
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Counts missions
// @author       Ron31
// @match        https://rettungssimulator.online/
// @updateURL    https://github.com/Ron31/LSS-Scripts/raw/dev/resi-missionCount/resi-missions.user.js
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    if(!localStorage.aBuildings || JSON.parse(localStorage.aBuildings).lastUpdate < (new Date().getTime() - 5 * 1000 * 60)) await $.getJSON('/api/userBuildings').done(data => localStorage.setItem('aBuildings', JSON.stringify({lastUpdate: new Date().getTime(), value: data})) );
    const aBuildings = JSON.parse(localStorage.aBuildings).value;
    const f = (x) => Math.ceil(4 * Math.log2(x + 2)+ 0.05 * x) - 4;
    let dep = aBuildings.filter(x => GENERATING_BUILDING_IDS.includes(x.buildingType));

    let span = document.querySelector('#missions span');
    let missions = document.querySelectorAll('div.mission-list-mission');
    let t = document.createElement('span');
    t.innerHTML = '<span id="missionCount">' + missions.length + '</span>' + ' von ' + '<span id="missionCountPossible">' + f(dep.length) + '</span>';

    span.insertAdjacentElement('afterend', t);

    socket.on("newMission", () => {
        document.getElementById('missionCount').innerText = parseInt(document.getElementById('missionCount').innerText) + 1;
    });
    socket.on("finishMission", () =>{
        document.getElementById('missionCount').innerText = parseInt(document.getElementById('missionCount').innerText) - 1;
    });
    socket.on("departmentBuy", async () => {
        await $.getJSON('/api/userBuildings').done(data => localStorage.setItem('aBuildings', JSON.stringify({lastUpdate: new Date().getTime(), value: data})) );
        const aBuildings = JSON.parse(localStorage.aBuildings).value;
        dep = aBuildings.filter(x => GENERATING_BUILDING_IDS.includes(x.buildingType));
        document.querySelector('missionCountPossible').innerText = f(dep.length);
    })
})();
