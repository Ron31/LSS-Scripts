// ==UserScript==
// @name         pinThread
// @version      1.2
// @description  Pin a thread at the top
// @author       Ron31
// @match        https://www.leitstellenspiel.de/alliance_threads
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const pinBtnClass = 'pinThreadsBtn';
    const storageKey = 'forumPins';

    const threadlist = document.getElementById('alliance_thread_index_table');
    if (!threadlist) return;

    const styleobject = document.createElement('style');
    styleobject.innerText = 'body.dark tr.danger td { background-color: #a94442; }'
    document.head.appendChild(styleobject);

    const pinnedHolder = document.createElement('tbody');
    threadlist.insertBefore(
        pinnedHolder,
        threadlist.querySelector('tbody:nth-of-type(2)')
    );

    const pinnedThreadNodes = {};

    threadlist.addEventListener('click', e => {
        const btn = e.target.closest(`.${pinBtnClass}[thread-id]`);
        if (!btn) return;
        const field = btn.parentElement;
        if (!field) return;
        const threadId = field.parentElement
            .querySelector('td h5 a')
            .href.split('/')[4];
        const pinned = JSON.parse(window.localStorage.forumPins || '[]');
        if (pinned.includes(threadId))
            window.localStorage.setItem(
                storageKey,
                JSON.stringify(pinned.filter(pin => pin !== threadId))
            );
        else
            window.localStorage.setItem(
                storageKey,
                JSON.stringify([...pinned, threadId])
            );
        togglePinnedState(threadId);
    });

    const togglePinnedState = threadId => {
        let pinnedNode = pinnedThreadNodes[threadId];
        const titleNode = threadlist.querySelector(
            `tbody:nth-of-type(3) a[href="/alliance_threads/${threadId}"]`
        );
        const threadNode =
            titleNode?.parentElement.parentElement.parentElement;
        if (!pinnedNode) {
            if (!titleNode || !threadNode) return;
            pinnedThreadNodes[threadId] = threadNode.cloneNode(true);
            pinnedNode = pinnedThreadNodes[threadId];
            pinnedNode.classList.contains('success') && pinnedNode.classList.remove('success');
            pinnedNode.classList.add('danger');
            pinnedHolder.append(pinnedNode);
            threadNode.classList.toggle('hidden');
        } else {
            pinnedNode.classList.toggle('hidden');
            threadNode.classList.toggle('hidden');
        }
    };

    threadlist
        .querySelectorAll('tbody:nth-of-type(3) tr td:nth-of-type(1)')
        .forEach(field => {
            const pinBtn = document.createElement('button');
            pinBtn.classList.add('btn', 'btn-xs', 'btn-default', pinBtnClass);
            pinBtn.innerText = '📌';
            pinBtn.setAttribute(
                'thread-id',
                field.parentElement.querySelector('td h5 a').href.split('/')[4]
            );
            field.appendChild(pinBtn);
        });
    JSON.parse(window.localStorage[storageKey] || '[]').forEach(
        togglePinnedState
    );
})();
