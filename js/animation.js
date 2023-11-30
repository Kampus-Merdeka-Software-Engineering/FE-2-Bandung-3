// script animasi scrolling navbar, tapi masih gamau WKWOWKWOWK
let navbar = document.querySelector('.top-nav');
    document.addEventListener('scroll' , () => {
        if(window.top.scrollY > 10) {
            navbar.classList.add('scroll');
        } else{
            navbar.classList.remove('scroll');
            navbar.style.transition = '.4s ease';
        }
    })