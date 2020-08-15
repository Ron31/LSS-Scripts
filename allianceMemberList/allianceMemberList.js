// ==UserScript==
// @name         allianceMemberList
// @version      1.0
// @description  Better use of the Buttons in the member List
// @author       Ron31
// @match        https://www.leitstellenspiel.de/verband/mitglieder/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    let btns = Array.from(document.querySelectorAll('div[id^="rights_"] a'));

    btns.forEach(btn => {
        btn.addEventListener('click', event => {
            event.preventDefault();
            btn.parentElement.childNodes.forEach(dBtn => {
                dBtn.classList.add('disabled');
            })
        })
    })
})();