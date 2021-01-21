// ==UserScript==
// @name         ReSi-MissionHelper
// @version      1.0.0
// @description  Einsatzhelfer
// @author       Ron31
// @include      https://rettungssimulator.online/mission/*
// @grant        none
// ==/UserScript==

(async function() {
    if (!sessionStorage.aVehicleCategories || JSON.parse(sessionStorage.aVehicleCategories).lastUpdate < (new Date().getTime() - 60 * 1000 * 60)) {
        await $.getJSON('/api/vehicleCategories').done(data => sessionStorage.setItem('aVehicleCategories', JSON.stringify({ lastUpdate: new Date().getTime(), value: data})));
    }
    const aVehicleCategories = JSON.parse(sessionStorage.aVehicleCategories).value;

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
            vehicle.innerText = aVehicleCategories[key].name;
            tr.appendChild(number);
            tr.appendChild(vehicle)
            tbody.appendChild(tr);
        }
        table.appendChild(tbody);
    }
})();