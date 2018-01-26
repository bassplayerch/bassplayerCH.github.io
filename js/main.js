var navigationButton = document.getElementById('navi-toggle');

var navigationLinks = document.querySelectorAll('.navigation__link');
var closeMenu = function () {
    navigationButton.checked = false;
}
navigationLinks.forEach(function (button) {
    button.addEventListener('click', closeMenu)
});


//gallery
var currentImage = 1;
var totalImages = 5;
var image = document.querySelectorAll('.gallery__image');
var container = document.getElementsByClassName('gallery__container')[0];
var youtubeSection = document.querySelector('.section-youtube');
var smallImageGallery = document.querySelector('#youtube .gallery__image');
var popup = document.querySelector('.popup');


var openLightBox = function () {
    popup.classList.add('open');
}

var closePopup = function() {
    popup.classList.remove('open');
}

var changeImage = function () {
    var regex = /[0-9]*.jpg/;
    image.forEach(function (img) {
        img.src = img.src.replace(regex, currentImage + '.jpg');
    });

}

var decrementCurrentImage = function () {
    currentImage = currentImage > 1 ? currentImage - 1 : totalImages;
    changeImage();
}
var incrementCurrentImage = function (e) {
    currentImage = currentImage < totalImages ? currentImage + 1 : 1;
    changeImage();
}
var onArrowClick = function (e) {
    e.stopPropagation();
    if (e.path[0].className.indexOf('--left') !== -1) {
        decrementCurrentImage();
    } else {
        incrementCurrentImage();
    }

}

popup.addEventListener('click', closePopup);

smallImageGallery.addEventListener('click', openLightBox);
var galleryIcons = document.querySelectorAll('.gallery__icon');
galleryIcons.forEach(function (icon) {
    icon.addEventListener('click', onArrowClick)
});


