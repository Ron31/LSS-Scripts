// ==UserScript==
// @name         pinThread
// @version      1.1D
// @description  Pin a thread at the top
// @author       Ron31
// @match        https://www.leitstellenspiel.de/alliance_threads
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const togglePinnedState = threadId => {
        const pin = document.querySelector(`#alliance_thread_index_table tbody tr.danger td h5 a[href="/alliance_threads/${threadId}"]`);
        const oElement = document.querySelector(`#alliance_thread_index_table tbody tr td h5 a[href="/alliance_threads/${threadId}"]`);
        if (pin) {
            if (pin.parentElement.parentElement.parentElement.classList.contains('hidden')){
                pin.parentElement.parentElement.parentElement.classList.remove('hidden');
                oElement.parentElement.parentElement.parentElement.classList.add('hidden');
                console.log('remove hidden');
            } else {
                pin.parentElement.parentElement.parentElement.classList.add('hidden');
                oElement.parentElement.parentElement.parentElement.classList.remove('hidden');
                console.log('add hidden');
            }
        } else {
            oElement.parentElement.parentElement.parentElement.classList.add('hidden');
            const row = document.createElement('tr');
            row.classList.add('danger');
            row.innerHTML = oElement.parentElement.parentElement.parentElement.innerHTML;
            document.querySelector('#alliance_thread_index_table').lastElementChild.firstElementChild.before(row);
        }
    };

    const pinned = JSON.parse(window.localStorage.forumPins || '[]');

    pinned.forEach(togglePinnedState());
    document.querySelectorAll('#alliance_thread_index_table tbody:nth-of-type(2) tr td:nth-of-type(1)').forEach((field) => {
        const pinBtn = document.createElement('button');
        pinBtn.classList.add('btn', 'btn-xs', 'btn-default');
        pinBtn.innerText = '📌';
        pinBtn.addEventListener('click', () => {
            const pinned = JSON.parse(window.localStorage.forumPins || '[]');
            if(pinned.includes(field.parentElement.querySelector('td h5 a').href.split('/')[4])) {
                let newPinned = pinned.filter(pin =>  pin !== field.parentElement.querySelector('td h5 a').href.split('/')[4]);
                window.localStorage.setItem('forumPins', JSON.stringify(newPinned));
            } else {
                pinned.push(field.parentElement.querySelector('td h5 a').href.split('/')[4]);
                window.localStorage.setItem('forumPins', JSON.stringify(pinned));
            }
        });
        togglePinnedState(field.parentElement.querySelector('td h5 a').href.split('/')[4]);
        field.appendChild(pinBtn);
    })
})();

