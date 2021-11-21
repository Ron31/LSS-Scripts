// ==UserScript==
// @name         ReSi-fmsFilter
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  filter FMS 5
// @author       Ron31
// @match        https://rettungssimulator.online/
// @updateURL    https://github.com/Ron31/LSS-Scripts/raw/dev/resi-fmsFilter/fmsfilter.user.js
// @grant        none
// ==/UserScript==
(async function() {
    let style = document.createElement('style');
    style.innerHTML = '#radio-container-others .radio-vehicle { display: none !important; }'
    document.head.appendChild(style);
})();