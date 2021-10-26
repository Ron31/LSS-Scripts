// ==UserScript==
// @name         ReSi-Heatmap
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  heatmap
// @author       Ron31
// @match        https://rettungssimulator.online/
// @updateURL    https://github.com/Ron31/LSS-Scripts/raw/dev/resi-heatmap/heatmap.user.js
// @grant        none
// ==/UserScript==
(async function() {
    const ofBuildingTypes = [1,3,5,6];
    const radius = 4000; //in metres
    const color = "red"; //CSS Colors & Hex Colors
    const opacity = 0.05; //Fill opacity.

    Object.keys(departmentMarkers).forEach((buildingMarker) => {
        if(ofBuildingTypes.includes(document.querySelector(".card[userdepartmentid='" + buildingMarker + "']").getAttribute("buildingtype"))) return;
        let i = L.circle(departmentMarkers[buildingMarker]._latlng, {
            color: color,
            fillColor: color,
            fillOpacity: opacity,
            weight: 1,
            radius: radius
        })
        i.addTo(mymap);
    })



})();