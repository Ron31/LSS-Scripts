// ==UserScript==
// @name         ReSi-MissionHelper
// @version      1.0.0
// @description  Einsatzhelfer
// @author       Ron31
// @include      https://rettungssimulator.online/mission/*
// @grant        none
// ==/UserScript==

(async function() {
    //let mission_specs_cache;
    let style = document.createElement('style');
    style.innerText = '.card-headline.card-headline-info{background-color:#2196f3;color:#fff}.card';
    document.head.appendChild(style);
    let missionID = document.querySelector('.detail-title').getAttribute('missionid');
    await $.ajax({
        url: "/api/missions",
        dataType: "json",
        type : "GET",
        data: {
            "id": missionID
        },
        success : function(r) {
            console.log(r);
            showPanel(r);
        }
    });

    function showPanel(r) {
        let helper = document.createElement('div');
        helper.classList.add('card', 'missionHelper');
        helper.innerHTML = '<div class="card-headline card-headline-info">Benötigte Mittel</div><div class="card-body"><table id="missionHelper-' + missionID + '"></table></div>';
        let d = document.querySelector('.alarmed-vehicles');
        d.insertAdjacentElement('afterbegin', helper);
        let table = document.querySelector('table#missionHelper-' + missionID);
        let tbody = document.createElement('tbody');
        let key, value;
        for ([key, value] of Object.entries(r.neededVehicles)) {
            let tr = document.createElement('tr');
            let number = document.createElement('td');
            number.innerText = value;
            let vehicle = document.createElement('td');
            vehicle.innerText = key;
            tr.appendChild(number);
            tr.appendChild(vehicle)
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
    }
})();
