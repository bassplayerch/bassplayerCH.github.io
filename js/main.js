var navigationButton = document.getElementById('navi-toggle');

var navigationLinks = document.querySelectorAll('.navigation__link');
var closeMenu = function(){
    navigationButton.checked = false;
}
navigationLinks.forEach(function(button){
    button.addEventListener('click', closeMenu)
});