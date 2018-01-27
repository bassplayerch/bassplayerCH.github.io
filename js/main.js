
var ready = function (fn) {
    if (typeof fn !== 'function') return;
    if (document.readyState === 'complete') {
        return fn();
    }
    document.addEventListener('DOMContentLoaded', fn, false);

};

ready(function () {

    //debounce
    var debounce = function(func, delay) {
        var inDebounce
        return function() {
          var context = this
          var args = arguments
          clearTimeout(inDebounce)
          inDebounce = setTimeout(() => func.apply(context, args), delay)
        }
      }

    //smoothScroll
    function scrollTo(element) {
        element.scrollIntoView({behavior: "smooth", block: "start"});
   
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

    window.addEventListener('scroll', debounce(function() {
        if (window.pageYOffset <= 110){
            scrollUpButton.classList.remove('visible');
        } else {
            scrollUpButton.classList.add('visible');

        }
        if (window.innerWidth >= 960){
            var navBarDesktop = document.querySelector('.desktop-navigation');
           if (window.pageYOffset <= 110){
               navBarDesktop.classList.remove('visible');
           } else {
            navBarDesktop.classList.add('visible');
           }
        }

      }, 10));

    //navigation desktop
    var desktopNavLinks = document.querySelectorAll('.desktop-navigation__link');
    desktopNavLinks.forEach(function(navLink){
      navLink.addEventListener('click', function(e){
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
    var welcomeButton = document.querySelector('.btn-container a.btn');
    welcomeButton.addEventListener('click', function (e) {
        e.preventDefault();
        scrollTo(document.getElementById('about'));
    });



});