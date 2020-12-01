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
    const showStandardElements = ["#menu_profile", "#menu_alliance"]; /*Hier alle selectors (von oben) rein, die nicht ausgeblendet werden sollen*/
    const ownElements = [
        {
            url: '#', //let url # when using childrens for a dropdown
            imgSrc: '',
            text: 'LSSM',
            openLightbox: false,
            openNew: false,
            appendLeft: false,
            glyphicon: 'glyphicon glyphicon-ok-circle',
            childrens: [
                {
                    url: 'https://lss-manager.de/',
                    openLightbox: false,
                    openNew: true,
                    imgSrc: '',
                    text: 'Webseite',
                },
                {
                    url: 'https://docs.lss-manager.de/',
                    openLightbox: false,
                    openNew: true,
                    imgSrc: '',
                    text: 'Docs',
                },
                {
                    url: 'https://github.com/lss-manager/lss-manager-v3',
                    openLightbox: false,
                    openNew: true,
                    imgSrc: 'https://github.githubassets.com/pinned-octocat.svg',
                    text: 'Github',
                }
            ],
        },
        {
            url: 'https://discord.gg/RcTNjpB',
            imgSrc: 'https://discord.com/assets/f8389ca1a741a115313bede9ac02e2c0.svg',
            text: 'Discord',
            openLightbox: false,
            openNew: true,
            appendLeft: true,
            class: '',
        },
    ];

    let leftObject = document.querySelector('#navbar-main-collapse .navbar-right #news_li');

    standardElementSelectors.forEach(selector => !showStandardElements.includes(selector) && document.querySelector(`#navbar-main-collapse .navbar-right li a${selector}`)?.parentElement.classList.add('hidden'));
    ownElements.forEach(ownElement => {
        const liElement = document.createElement('li');
        const aElement = document.createElement('a');
        aElement.setAttribute('role', 'button');
        aElement.setAttribute('href', ownElement.url);
        ownElement.openLightbox && aElement.classList.add('lightbox-open');
        !ownElement.openLightbox && ownElement.openNew && aElement.setAttribute('target', '_blank');
        if(ownElement.imgSrc) {
            aElement.innerHTML = `<img alt="${ownElement.text}" class="navbar-icon" src="${ownElement.imgSrc}" title="${ownElement.text}"><span class="visible-xs">${ownElement.text}</span>`
        } else if (ownElement.glyphicon) {
            aElement.innerHTML = `<span class="${ownElement.glyphicon}"></span> ${ownElement.text}`;
        } else {
            aElement.innerText = ownElement.text;
        }

        let ulElement;
        if(ownElement.childrens[0]) {
            const bElement = document.createElement('b');
            bElement.classList.add('caret');
            aElement.appendChild(bElement);
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
                !ownChildElement.openLightbox && ownChildElement.openNew && aElement.setAttribute('target', '_blank');
                aChildElement.setAttribute('href', ownChildElement.url);
                if(ownChildElement.imgSrc) {
                    aChildElement.innerHTML = `<img class="icon" src="${ownChildElement.imgSrc}" width="24" height="24"> ${ownChildElement.text}`
                } else {
                    aChildElement.innerText = ownChildElement.text;
                }
                liChildElement.appendChild(aChildElement);
                ulElement.appendChild(liChildElement);
            });
        }
        liElement.appendChild(aElement);
        ulElement && liElement.appendChild(ulElement);
        if(ownElement.appendLeft) {
                leftObject.parentNode.insertBefore(liElement, leftObject);
                leftObject = liElement;
        } else {
            document.querySelector('#navbar-main-collapse .navbar-right').appendChild(liElement);
        }
    })
})();