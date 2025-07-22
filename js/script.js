window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        containerSearch.classList.add('cariScroll');
    } else {
        header.classList.remove('scrolled');
        containerSearch.classList.remove('cariScroll');
    }
});
