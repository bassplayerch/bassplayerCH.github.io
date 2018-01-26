
var navigationButton = document.getElementById('navi-toggle');

var navigationLinks = document.querySelectorAll('.navigation__link');
var closeMenu = function () {
    if (navigationButton.checked){
    navigationButton.checked = false;
    }
}
navigationLinks.forEach(function (button) {
    button.addEventListener('click', closeMenu)
});

function scrollTo(element) {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: element.offsetTop
    });
  }

var welcomeButton = document.querySelector('.btn-container a');
welcomeButton.addEventListener('click', function(){
    scrollTo(document.getElementById('about'));
});