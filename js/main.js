$(document).ready(function () {
    console.log('loaded');
    $('a[href^=\\#]').on('click', function(e){
        console.log('clicked');
        var href = $(this).attr('href');
        console.log(href);
        $('html, body').animate({
            scrollTop:$(href).offset().top
        },'slow');
        e.preventDefault();
    });
    var hamburgerIcon = document.getElementById('hamburgerIcon');
    var sideBar = document.querySelector('.menuLinks');
    var navLinks = document.querySelectorAll('.menuLinks a');
    var menuLinks = document.querySelectorAll('.closeMenu');


    var openMenu = function () {
        hamburgerIcon.classList.toggle('open');
        var sideBarStyle = sideBar.style.display;
        sideBarStyle == "flex" ? sideBar.style.display = "none" : sideBar.style.display = "flex";
    };

    hamburgerIcon.addEventListener('click', openMenu);




    // for (var i = 0; i < navLinks.length; i++) {
    //     navLinks[i].addEventListener('click', function () {
    //         hamburgerIcon.classList.toggle('open');
    //     });
    // }

    for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener('click', function () {
            sideBar.style.display = "none";
            hamburgerIcon.classList.toggle('open');
        });
    }
});