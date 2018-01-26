
var ready = function (fn) {
    if (typeof fn !== 'function') return;
    if (document.readyState === 'complete') {
        return fn();
    }
    document.addEventListener('DOMContentLoaded', fn, false);

};

ready(function () {

    //smoothScroll
    function scrollTo(element) {
        window.scroll({
            behavior: 'smooth',
            left: 0,
            top: element.offsetTop
        });
    }

    // slider
    var mySwiper = new Swiper('.swiper-container', {
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
        },
        direction: 'horizontal',
        loop: true,


        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },


    })

    //navigation
    var navigationButton = document.getElementById('navi-toggle');
    var navigationLinks = document.querySelectorAll('.navigation__link');
    var closeMenu = function () {
        if (navigationButton.checked) {
            navigationButton.checked = false;
            navigationLinks.forEach(function(link){
                link.classList.add('disabled');
            });
        }
    }
    navigationLinks.forEach(function (button) {
        button.addEventListener('click', closeMenu)
    });

    var welcomeButton = document.querySelector('.btn-container a');
    welcomeButton.addEventListener('click', function () {
        scrollTo(document.getElementById('about'));
    });

    //cards
    var cardFrontButtons = document.querySelectorAll('.card .card__button--front');
    var cardBackButtons = document.querySelectorAll('.card .card__button--back');
    var flipFront = function (e) {
        e.preventDefault();
        this.parentNode.parentNode.parentNode.classList.add('active');
        console.log(this);

    }
    var flipBack = function (e) {
        e.preventDefault();
        this.parentNode.parentNode.parentNode.classList.remove('active');

    }
    cardFrontButtons.forEach(function (cardButton) {
        cardButton.addEventListener('click', flipFront.bind(cardButton));
    });
    cardBackButtons.forEach(function (cardButton) {
        cardButton.addEventListener('click', flipBack.bind(cardButton));
    });



});