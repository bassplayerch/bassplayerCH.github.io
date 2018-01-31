
var ready = function (fn) {
    if (typeof fn !== 'function') return;
    if (document.readyState === 'complete') {
        return fn();
    }
    document.addEventListener('DOMContentLoaded', fn, false);

};
(function(root,smoothScroll){"use strict";if(typeof define==="function"&&define.amd){define(smoothScroll)}else if(typeof exports==="object"&&typeof module==="object"){module.exports=smoothScroll()}else{root.smoothScroll=smoothScroll()}})(this,function(){"use strict";if(typeof window!=="object")return;if(document.querySelectorAll===void 0||window.pageYOffset===void 0||history.pushState===void 0){return}var getTop=function(element,start){if(element.nodeName==="HTML")return-start;return element.getBoundingClientRect().top+start};var easeInOutCubic=function(t){return t<.5?4*t*t*t:(t-1)*(2*t-2)*(2*t-2)+1};var position=function(start,end,elapsed,duration){if(elapsed>duration)return end;return start+(end-start)*easeInOutCubic(elapsed/duration)};var smoothScroll=function(el,duration,callback,context){duration=duration||500;context=context||window;var start=context.scrollTop||window.pageYOffset;if(typeof el==="number"){var end=parseInt(el)}else{var end=getTop(el,start)}var clock=Date.now();var requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(fn){window.setTimeout(fn,15)};var step=function(){var elapsed=Date.now()-clock;if(context!==window){context.scrollTop=position(start,end,elapsed,duration)}else{window.scroll(0,position(start,end,elapsed,duration))}if(elapsed>duration){if(typeof callback==="function"){callback(el)}}else{requestAnimationFrame(step)}};step()};var linkHandler=function(ev){if(!ev.defaultPrevented){ev.preventDefault();if(location.hash!==this.hash)window.history.pushState(null,null,this.hash);var node=document.getElementById(this.hash.substring(1));if(!node)return;smoothScroll(node,500,function(el){location.replace("#"+el.id)})}};document.addEventListener("DOMContentLoaded",function(){var internal=document.querySelectorAll('a[href^="#"]:not([href="#"])'),a;for(var i=internal.length;a=internal[--i];){a.addEventListener("click",linkHandler,false)}});return smoothScroll});

ready(function () {
    var welcomeButton = document.querySelector('.btn-container a.btn');

    //debounce
    var debounce = function (func, delay) {
        var inDebounce
        return function () {
            var context = this
            var args = arguments
            clearTimeout(inDebounce)
            inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
    }

    //smoothScroll
    function scrollTo(element) {
        // element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.smoothScroll(element, 700);



    }


    //navigation
    var navigationButton = document.getElementById('navi-toggle');
    var navigationLinks = document.querySelectorAll('.navigation__link');
    var closeMenu = function () {
        if (navigationButton.checked) {
            navigationButton.checked = false;
            navigationLinks.forEach(function (link) {
                link.classList.add('disabled');
            });
        }
    }
    navigationLinks.forEach(function (button) {
        button.addEventListener('click', closeMenu)
    });


    //scrollupbutton
    var scrollUpButton = document.querySelector('.scroll-up-button');
    scrollUpButton.addEventListener('click', function () {
        scrollTo(document.getElementById('header'));

    });

    window.addEventListener('scroll', debounce(function () {
        if (window.pageYOffset <= 110) {
            scrollUpButton.classList.remove('visible');
        } else {
            scrollUpButton.classList.add('visible');

        }
        if (window.innerWidth >= 960) {
            var navBarDesktop = document.querySelector('.desktop-navigation');
            if (window.pageYOffset <= 110) {
                navBarDesktop.classList.remove('visible');
                welcomeButton.classList.remove('visible');
            } else {
                navBarDesktop.classList.add('visible');
                welcomeButton.classList.add('visible');

            }
        }

    }, 10));

    //navigation desktop
    var desktopNavLinks = document.querySelectorAll('.desktop-navigation__link');
    desktopNavLinks.forEach(function (navLink) {
        navLink.addEventListener('click', function (e) {
            e.preventDefault();
            scrollTo(document.getElementById(navLink.getAttribute('data-target')));

        });
    });

    //cards
    var cardFrontButtons = document.querySelectorAll('.card .card__button--front');
    var cardBackButtons = document.querySelectorAll('.card .card__button--back');
    var flipFront = function (e) {
        e.preventDefault();
        this.parentNode.parentNode.parentNode.classList.add('active');
        setTimeout(function () {
            document.querySelector('.about-container').classList.add('visible');
        }, 200)
    }
    var flipBack = function (e) {
        e.preventDefault();
        this.parentNode.parentNode.parentNode.classList.remove('active');
        setTimeout(function () {
            document.querySelector('.about-container').classList.remove('visible');
        }, 200)
    }
    cardFrontButtons.forEach(function (cardButton) {
        cardButton.addEventListener('click', flipFront.bind(cardButton));
    });
    cardBackButtons.forEach(function (cardButton) {
        cardButton.addEventListener('click', flipBack.bind(cardButton));
    });
    welcomeButton.addEventListener('click', function (e) {
        e.preventDefault();
        scrollTo(document.getElementById('about'));
    });



});