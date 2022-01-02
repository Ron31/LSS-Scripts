// ==UserScript==
// @name         ReSi-GeoJSON
// @version      1.0
// @description  geoJSON on map
// @author       Ron31
// @match        https://rettungssimulator.online/*
// @grant        none
// ==/UserScript==

(async function() {
    'use strict';

    let geoData;
    if(!geoData) {
        geoData = await (await fetch('https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/4_kreise/2_hoch.geo.json')).json();
    }
    L.geoJSON(geoData, {style: {fillOpacity: 0.05, color: '#3388ff', weight: 1}}).addTo(mymap);
    })();
