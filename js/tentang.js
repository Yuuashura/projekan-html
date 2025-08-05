

//================== RESPONSIVE MOBILE ====================
function initMobileNavigation() {
    const mobileMenuToggle = document.getElementById("mobileMenuToggle");
    const mobileNavOverlay = document.getElementById("mobileNavOverlay");
    const mobileNavClose = document.getElementById("mobileNavClose");
    const filterSidebar = document.querySelector(".filter-sidebar");

    if (!mobileMenuToggle || !mobileNavOverlay || !mobileNavClose) {
        return;
    }

    mobileMenuToggle.addEventListener("click", () => {
        filterSidebar.classList.toggle('active');
        mobileMenuToggle.classList.toggle("active");
        mobileNavOverlay.classList.toggle("active");
        document.body.style.overflow = mobileNavOverlay.classList.contains(
            "active"
        )
            ? "hidden"
            : "auto";
    });

    mobileNavClose.addEventListener("click", () => {
        mobileMenuToggle.classList.remove("active");
        mobileNavOverlay.classList.remove("active");
        filterSidebar.classList.remove('active');

        document.body.style.overflow = "auto";
    });

    mobileNavOverlay.addEventListener("click", (e) => {
        if (e.target === mobileNavOverlay) {
            mobileMenuToggle.classList.remove("active");
            mobileNavOverlay.classList.remove("active");
            filterSidebar.classList.remove('active');

            document.body.style.overflow = "auto";
        }
    });

    const navLinks = mobileNavOverlay.querySelectorAll(".nav a");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenuToggle.classList.remove("active");
            mobileNavOverlay.classList.remove("active");
            filterSidebar.classList.remove('active');
            document.body.style.overflow = "auto";
        });
    });


    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove("active");
            mobileNavOverlay.classList.remove("active");
            filterSidebar.classList.remove('active');

            document.body.style.overflow = "auto";
        }
    });
}

// ==========================================================


// ===================  SEARCH  ====================
const form = document.querySelector('.cari');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    lakukanPencarian();
});
function lakukanPencarian() {
    const kataKunci = document.getElementById('searchInput').value.trim();
    window.location.href = `search.html?q=${encodeURIComponent(kataKunci)}`;
    console.log('Kata kunci pencarian:', kataKunci);
}
//=====================================================================



document.addEventListener('DOMContentLoaded', () => {
    initMobileNavigation();
})


