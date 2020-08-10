// ==UserScript==
// @name         pinThread
// @version      1.0
// @description  Pin a thread at the top
// @author       Ron31
// @match        https://www.leitstellenspiel.de/alliance_threads
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const pinned = JSON.parse(window.localStorage.forumPins || '[]');

    pinned.forEach((pin) => {
        const test = document.querySelector(`#alliance_thread_index_table tbody tr td h5 a[href="/alliance_threads/${pin}"]`);
        test.parentElement.parentElement.parentElement.classList.add('hidden');

        const row = document.createElement('tr');
        row.classList.add('danger');
        row.innerHTML = test.parentElement.parentElement.parentElement.innerHTML;
        document.querySelector('#alliance_thread_index_table').lastElementChild.firstElementChild.before(row);
    });
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
        field.appendChild(pinBtn);
    })
})();