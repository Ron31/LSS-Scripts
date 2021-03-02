// ==UserScript==
// @name         LSS-Forum-Liker
// @version      1.0.0
// @description  Forum-Liker
// @author       A random giraffe
// @include      https://forum.leitstellenspiel.de/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var usersLike = [
        12149,
        11704,
        7794,
        98,
        12828
    ];
    var usersHighlight = [
        6320,
        7019,
        9694,
        8631
    ];
    setTimeout(() => {
        var authorLikeSelector = usersLike.map(user => `.messageAuthor .messageAuthorContainer .userLink[data-user-id="${user}"]`).join(',');
        var authorHighlightSelector = usersHighlight.map(user => `.messageAuthor .messageAuthorContainer .userLink[data-user-id="${user}"]`).join(',');
        var highlight = post => post.style.color = 'yellow';
        var posts = {
            like: [],
            highlight: [],
        };
        Array.from(document.querySelectorAll('.wbbPost.message')).forEach(post => {
            if (post.querySelector(authorLikeSelector)) posts.like.push(post);
            else if (post.querySelector(authorHighlightSelector)) posts.highlight.push(post);
        });
        posts.like.forEach(post => {
            setTimeout(() => {
                post.querySelector('.messageFooterButtons .wcfLikeButton a.button:not(.active)')?.click()
            }, posts.like.indexOf(post) * 100)
        });
        posts.highlight.forEach(post => post.querySelector('.messageFooterButtons .wcfLikeButton a.button:not(.active)') && highlight(post));
    }, 2000)
})();
