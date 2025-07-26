const header = document.querySelector("header");
const theme = document.querySelector("#theme");





theme.addEventListener('click', () => {
    document.body.classList.toggle('light');
    const headerElement = document.querySelector('header');
    headerElement.classList.toggle('light');
    // console.log(headerElement);
    document.querySelector('.header-popular').classList.toggle('light')
})


// HEADER KETIKA DI SCROLL
      window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
          header.classList.add("scrolled");
          containerSearch.classList.add("cariScroll");
        } else {
          header.classList.remove("scrolled");
          containerSearch.classList.remove("cariScroll");
        }
      });