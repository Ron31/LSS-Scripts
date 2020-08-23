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
    const roles = {
            "admin": "Verbands-Admin",
            "coadmin": "Verbands-Co-Admin",
            "finance": "Finanzminister",
            "sprechwunsch_admin": "Sprechwunsch-Admin",
            "aufsichtsrat": "Aufsichtsrat",
            "schooling": "Lehrgangsmeister"
    }
    const holders = Array.from(document.querySelectorAll('td div[id^="rights_"]'));

    holders.forEach(holder => {
        const roleHolder = holder.parentElement?.parentElement?.querySelector(
            'td:nth-of-type(2) small'
        );
        if(!roleHolder) return;
        const rights = Array.from(holder.querySelectorAll('a[href$="/0"]')).map(a => roles[a.pathname.match(/(?<=\/verband\/)[^/]*/)?.[0] || '']);
        holder.addEventListener('click', event => {
            event.preventDefault();
            const target = event.target;
            if(!target || target.tagName !== 'A') return;
            target.removeAttribute('data-confirm');
            if (target.getAttribute('href')?.split('/')[2] === 'kick' && !confirm('Rauswerfen?')) return;
            Array.from(target.parentElement?.children || []).forEach(
                childBtn => {
                    childBtn.classList.add('disabled');
                }
            );
            fetch(target?.getAttribute('href')).then(data => {
                if(data.status !== 200) return;
                const href = target.getAttribute('href')?.split('/');
                if (!href) return;
                if (href[2] === 'kick') {
                    return target?.parentElement?.parentElement?.parentElement?.classList.add(
                        'hidden'
                    );
                } else {
                    const set = href[4] === '1';
                    if (set) {
                        target.classList.replace('btn-success', 'btn-danger');
                        href[4] = '0';
                        target.textContent =
                            target.textContent?.replace("setzen", "entfernen") || '';
                        rights.push(
                            roles[
                            target.pathname.match(
                                /(?<=\/verband\/)[^/]*/
                            )?.[0] || ''
                                ]
                        );
                    } else {
                        target.classList.replace('btn-danger', 'btn-success');
                        href[4] = '1';
                        target.textContent =
                            target.textContent?.replace("entfernen", "setzen") || '';
                        rights.splice(
                            rights.findIndex(
                                r =>
                                    r ===
                                    roles[
                                    target.pathname.match(
                                        /(?<=\/verband\/)[^/]*/
                                    )?.[0] || ''
                                        ]
                            ),
                            1
                        );
                    }

                    if (rights.includes(roles['admin']))
                        roleHolder.textContent = roles['admin'];
                    else roleHolder.textContent = rights.sort().join(', ');

                    target.setAttribute('href', href.join('/'));
                    Array.from(target.parentElement?.children || []).forEach(
                        childBtn => {
                            childBtn.classList.remove('disabled');
                        }
                    );
                }
            })
        })
    })
})();