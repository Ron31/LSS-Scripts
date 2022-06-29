/*
 * Copyright (c) 2022 by Ron31
 * Scripts for the browser-side of the ReSi-Scripts
 * Script Version: 1.4
 * Last Update: 2022-06-29
 */

let missionSpeedSVG = document.querySelector('#mission-speed-pause');
missionSpeedSVG.style.display = null;
let div = missionSpeedSVG.parentElement;
missionSpeedSVG.classList.remove('frame-opener');
div.onclick = () => speedModal();   // Open the modal

if(ReSi.settings.missionGenerationSpeed !== 0) {
    setIconToPlay()
} else {
    div.id = 'dropdown-notification';
}

ControlCenter.setMissionSpeed = (missionSpeed) => {
    missionSpeedSVG = document.querySelector('svg#mission-speed-pause');
    if(parseInt(missionSpeed) === 0) {
        missionSpeedSVG.remove();
        div.id = 'dropdown-notification';
        let i = document.createElement('i');
        i.className = 'fas fa-pause';
        i.id = 'mission-speed-pause';
        //i.setAttribute("frame", "1/2/4/4");
        //i.setAttribute("frame-url", "/settings");
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
    i.className = 'fas fa-play';
    i.id = 'mission-speed-pause';
    //i.setAttribute("frame", "1/2/4/4");
    //i.setAttribute("frame-url", "/settings");
    div.appendChild(i);
}

async function speedModal() {
    return new Promise(resolve => {
        let selector = $('body');
        if (self !== top) selector = $('body', parent.document);

        selector.append(`
      <div class='modal-overlay'>
        <div class='modal'>
          <div class="modal-title">
            ` + 'Spielgeschwindigkeit wählen' + `
          </div>
          <div class="modal-button-group mission-speed">
                    <button class="button button-round save-mission-speed button-gray " value="0" seconds="0" data-tooltip="Einsatzgenerierung pausieren"><svg class="svg-inline--fa fa-pause icon-no-margin" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="pause" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"></path></svg><!-- <i class="fas fa-pause icon-no-margin"></i> --></button>
                    <button class="button button-round save-mission-speed button-success " value="1" seconds="30" data-tooltip="Einsatzgenerierung etwa alle 30 Sekunden"> 30 sec</button>
                    <button class="button button-round save-mission-speed button-success " value="2" seconds="60" data-tooltip="Einsatzgenerierung etwa einmal pro Minute"> 1 min</button>
                    <button class="button button-round save-mission-speed button-success " value="3" seconds="120" data-tooltip="Einsatzgenerierung etwa alle 2 Minuten"> 2 min</button>
                    <button class="button button-round save-mission-speed button-success " value="4" seconds="300" data-tooltip="Einsatzgenerierung etwa alle 5 Minuten"> 5 min</button>
                    <button class="button button-round save-mission-speed button-success " value="5" seconds="600" data-tooltip="Einsatzgenerierung etwa alle 10 Minuten"> 10 min</button>
                    <button class="button button-round save-mission-speed button-success " value="6" seconds="1200" data-tooltip="Einsatzgenerierung etwa alle 20 Minuten"> 20 min</button>
                    <button class="button button-round save-mission-speed button-success " value="7" seconds="1800" data-tooltip="Einsatzgenerierung etwa alle 30 Minuten"> 30 min</button>
                </div>
        </div>
      </div>
    `);

        document.querySelector('.save-mission-speed[seconds="' + ReSi.settings.missionGenerationSpeed + '"]')?.classList.add('button-active');
        document.querySelector('.modal-button-group.mission-speed').addEventListener('click', buttonClicked);
        let overlay = selector.find('.modal-overlay');
        overlay.css('visibility', 'visible');

        if (self !== top) window.addEventListener('beforeunload', () => overlay.remove());

        function close() {
            document.querySelector('.modal-button-group.mission-speed').removeEventListener('click', buttonClicked);
            overlay.remove();
            resolve();
        }

        function buttonClicked(e) {
            if(e.target.classList.contains('save-mission-speed')) {
                let seconds = e.target.getAttribute('seconds');
                let value = e.target.getAttribute('value');
                callApi('/api/settings', {
                    'setting': 'missionGenerationSpeed',
                    'value': value
                });
                ControlCenter.setMissionSpeed(seconds);
                close();
            }
        }
    });
}