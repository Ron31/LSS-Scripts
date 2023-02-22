// ==UserScript==
// @name         ReSi-Heatmap-NewBuilding
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  heatmap for new building
// @author       Ron31
// @updateURL    https://github.com/Ron31/LSS-Scripts/raw/dev/resi-heatmap/heatmap-new.user.js
// @match        https://rettungssimulator.online/
// @grant        none
// ==/UserScript==
(async function() {
    const radius = 4000; //in metres
    const typeToColor = {
        fireDepartment: "red",
        fireSchool: "red",
        emsDepartment: "yellow",
        emsDoctorDepartment: "yellow",
        emsSchool: "yellow",
        lpolDepartment: "blue",
        bpolDepartment: "blue",
        policeSchool: "blue",
        hospital: "green",
        controlCenter: "white",
    }
    const opacity = 0.05; //Fill opacity.

    const origPlaceDepartment = placeDepartment;
    placeDepartment = async function(pMarker, pType, pTooltip, platlng = false) {
        await origPlaceDepartment(pMarker, pType, pTooltip, platlng);



        let i = L.circle(newDepartment._latlng, {
            color: typeToColor[pType],
            fillColor: typeToColor[pType],
            fillOpacity: opacity,
            weight: 1,
            radius: radius
        })
        i.addTo(mymap);
        newDepartment.on("dragend", () => {
            i.setLatLng(newDepartment._latlng);
        });
        newDepartment.on("remove", () => {
            mymap.removeLayer(i);
        });
    };



})();