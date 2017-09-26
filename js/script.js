var hamburgerIcon = document.getElementById('hamburgerIcon');
var sideBar = document.querySelector('#navBar .navigation');
var navLinks = document.querySelectorAll('#navBar ul li');

var openMenu = function () {
    hamburgerIcon.classList.toggle('open');
    sideBar.classList.toggle('sideBarOpen');
};

hamburgerIcon.addEventListener('click', openMenu);
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener('click', function () {
        sideBar.classList.toggle('sideBarOpen');
        hamburgerIcon.classList.toggle('open');


    });
}
// document.addEventListener('scroll', function () {
//     var news = document.getElementById('news');
//     console.log(window.scrollY, news.offsetTop);
//     console.log('')
//     if (window.scrollY === news.offsetTop) {
//         alert('asda');
//     }
// });