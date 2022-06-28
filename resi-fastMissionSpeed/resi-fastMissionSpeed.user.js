// ==UserScript==
// @name         ReSi-fastMissionSpeed
// @version      1.0
// @description  Fast switching to mission Speed Page
// @author       Ron31
// @match        https://beta.rettungssimulator.online/
// @match        https://rettungssimulator.online/
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';
    let missionSpeedSVG = document.querySelector('#mission-speed-pause');
    missionSpeedSVG.style.display = null;
    let div = missionSpeedSVG.parentElement;

    if(ReSi.settings.missionGenerationSpeed !== 0) {
        setIconToPlay()
    } else {
        div.id = 'dropdown-notification';
    }

    ControlCenter.setMissionSpeed = (missionSpeed) => {
        missionSpeedSVG = document.querySelector('svg#mission-speed-pause');
        if(missionSpeed === 0) {
            missionSpeedSVG.remove();
            div.id = 'dropdown-notification';
            let i = document.createElement('i');
            i.className = 'fas fa-pause frame-opener';
            i.id = 'mission-speed-pause';
            i.setAttribute("frame", "1/2/4/4");
            i.setAttribute("frame-url", "/settings");
            div.appendChild(i);
            ReSi.settings.missionGenerationSpeed = 0;
        } else {
            setIconToPlay()
            ReSi.settings.missionGenerationSpeed = missionSpeed;
        }
    }

    function setIconToPlay() {
        div.id = '';
        missionSpeedSVG.remove();
        let i = document.createElement('i');
        i.className = 'fas fa-play frame-opener';
        i.id = 'mission-speed-pause';
        i.setAttribute("frame", "1/2/4/4");
        i.setAttribute("frame-url", "/settings");
        div.appendChild(i);
    }
})();