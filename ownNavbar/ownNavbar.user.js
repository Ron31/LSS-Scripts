// ==UserScript==
// @name         ownNavbar
// @version      1.0
// @description  Make your own navbar
// @author       Ron31
// @match        https://www.leitstellenspiel.de/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const standardElementSelectors = ['#news', '#menu_profile', '#menu_alliance', '#navigation_top', '#coins_top', '[href="/messages"]', '[href="/freunde"]', '[href="https://forum.leitstellenspiel.de/"]']; /*Hier müsste man für NL und UK/US/AU anpassen*/
    const showStandardElements = ["#menu_alliance"]; /*Hier alle selectors (von oben) rein, die nicht ausgeblendet werden sollen*/
    const ownElements = [
        {
            url: '#',
            imgSrc: '/images/alliance.svg',
            text: 'Allianz',
            appendLeft: false,
            childrens: [
                {
                    url: '/verband',
                    openLightbox: true,
                    imgSrc: '',
                    text: 'Verband',
                },
                {
                    url: '/verband',
                    openLightbox: true,
                    imgSrc: '',
                    text: 'Verband',
                },
            ],
        },
    ];

    standardElementSelectors.forEach(selector => !showStandardElements.includes(selector) && document.querySelector(`#navbar-main-collapse .navbar-right li a${selector}`)?.parentElement.classList.add('hidden'));
    ownElements.forEach(ownElement => {
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');
        aElement.setAttribute('role', 'button');
        aElement.setAttribute('href', ownElement.url);
        aElement.innerText = ownElement.text;
        const bElement = document.createElement('b');
        bElement.classList.add('caret');
        aElement.appendChild(bElement);
        let ulElement;
        if(ownElement.childrens[0]) {
            liElement.classList.add('dropdown');
            aElement.classList.add('dropdown-toogle');
            aElement.setAttribute('data-toggle', 'dropdown');
            ulElement = document.createElement('ul');
            ulElement.classList.add('dropdown-menu');
            ulElement.setAttribute('role', 'menu');
            ownElement.childrens.forEach((ownChildElement) => {
                const liChildElement = document.createElement('li');
                liChildElement.setAttribute('role', 'presentation');
                const aChildElement = document.createElement('a');
                ownChildElement.openLightbox && aChildElement.classList.add('lightbox-open');
                aChildElement.setAttribute('href', ownChildElement.url);
                aChildElement.innerText = ownChildElement.text;
                liChildElement.appendChild(aChildElement);
                ulElement.appendChild(liChildElement);
            });
        };
        liElement.appendChild(aElement);
        ulElement && liElement.appendChild(ulElement);
        document.querySelector('#navbar-main-collapse .navbar-right').appendChild(liElement);
    })
})();