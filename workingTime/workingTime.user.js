// ==UserScript==
// @name         workingTimeVehicle
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Shows the working Time of the vehicle in the building.
// @author       Ron31
// @match        https://www.leitstellenspiel.de/buildings/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const VEHICLE_TABLE_HEADS = Array.from(document.querySelectorAll('#vehicle_table thead tr th'));
    const get_vehicle_table_column_position = key => VEHICLE_TABLE_HEADS.map(x => x.innerText).indexOf(key);
    const get_vehicle_table_column_values = column => Array.from(document.querySelectorAll(`#vehicle_table tbody tr td:nth-child(${column + 1})`));
    let allVehicleName = get_vehicle_table_column_values(get_vehicle_table_column_position("Name"));
    allVehicleName.forEach(name => {
        let workingTimeBr = document.createElement('br');
        name.appendChild(workingTimeBr);
        let workingTimeText = document.createElement('small');
        let time = ["8:00", "20:00"];
        workingTimeText.innerText = "Dienstzeit: " + time[0] + " - " + time[1];
        name.appendChild(workingTimeText);
    })
})();