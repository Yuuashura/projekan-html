const api = "https://yuuashura-api.vercel.app/";
const containerPopular = document.querySelector("#items-popular");
const containerTerbaru = document.querySelector("#items-terbaru");
const slidesData = [
    {
        link: "alya.html",
        bgImage: "/assets/bg3.jpeg",
        chapter: "Chapter 112",
        title: "Alya Sometimes Hides Her Feelings in Russian",
        description: "Orang tua perlu tahu bahwa Alya Sometimes Hides Her Feelings in Russian adalah drama sekolah menengah tentang dua teman sekelas yang berusaha mencari tahu perasaan mereka satu sama lain...",
        genres: ["Comedy", "Romance", "School", "Slice of Life"],
        cover1: "/assets/alya-cover.jpeg",
        cover2: "/assets/alya-cover3.jpeg"
    },
    {
        link: "otonari-no-tenshi-sama.html",
        bgImage: "/assets/mahiru-bg.jpg",
        chapter: "Chapter 66",
        title: "Otonari No Tenshi Sama",
        description: "Cerita ini mengikuti kehidupan seorang gadis yang selama ini dianggap biasa-biasa saja dan tidak berarti oleh...",
        genres: ["Romance", "Comedy", "School Life", "Slice Of Life"],
        cover1: "/assets/mahiru-cover1.jpeg",
        cover2: "/assets/mahiru-cover2.jpeg"
    },
    {
        link: "my-kisah.html",
        bgImage: "/assets/waguri-bg.jpeg",
        chapter: "Chapter 157",
        title: "Kaoru Hana Wa Rin To Saku",
        description: "Kaoru hidup dengan ketegasan yang menjadi ciri khasnya, dimana dia selalu menunjukkan sikap kuat dan tegas dalam setiap langkahnya. Kehidupan sehari-harinya...",
        genres: ["Comedy", "Drama", "Romance", "Shounen"],
        cover1: "/assets/waguri-cover1.jpeg",
        cover2: "/assets/waguri-cover2.jpeg"
    }
];

// Variable untuk autoplay
let currentSlideIndex = 0;
let autoplayInterval;

// Replace the buildSlider function in your home.js file with this updated version:

function buildSlider(containerId, data) {
    const sliderParent = document.getElementById(containerId);
    const prevButton = document.createElement('button');
    prevButton.id = 'prev-btn';
    prevButton.className = 'btn-slide';
    prevButton.textContent = '<';

    const nextButton = document.createElement('button');
    nextButton.id = 'next-btn';
    nextButton.className = 'btn-slide';
    nextButton.textContent = '>';

    const sliderItemsContainer = document.createElement('div');
    sliderItemsContainer.className = 'slider-items';

    data.forEach((slideData, index) => {
        console.log(data);
        
        const link = document.createElement('a');
        link.href = slideData.link;
        link.className = 'update-container';
        link.style.backgroundImage = `url('${slideData.bgImage}')`;
        
        link.style.opacity = index === 0 ? '1' : '0';
        link.style.transition = 'opacity 0.5s ease-in-out';
        link.style.position = 'absolute';
        link.style.width = '100%';
        link.style.height = '100%';

        const filter = document.createElement('div');
        filter.className = 'filter';

        const leftUp = document.createElement('div');
        leftUp.className = 'left-up';

        const chapter = document.createElement('p');
        chapter.className = 'chapter';
        chapter.textContent = slideData.chapter;

        const title = document.createElement('h1');
        title.textContent = slideData.title;

        const keterangan = document.createElement('div');
        keterangan.className = 'keterangan';
        const pKeterangan = document.createElement('p');
        pKeterangan.textContent = slideData.description;
        keterangan.appendChild(pKeterangan);

        const genres = document.createElement('div');
        genres.className = 'genres';
        slideData.genres.forEach(genreText => {
            const pGenre = document.createElement('p');
            pGenre.textContent = genreText;
            genres.appendChild(pGenre);
        });
        
        const readingNow = document.createElement('div');
        readingNow.className = 'reading-now';
        const aReadingNow = document.createElement('a');
        aReadingNow.href = slideData.link;
        aReadingNow.textContent = 'Start Read';
        readingNow.appendChild(aReadingNow);

        const rightUp = document.createElement('div');
        rightUp.className = 'right-up';

        const img1 = document.createElement('img');
        img1.src = slideData.cover1;
        img1.alt = `${slideData.title} Cover`;
        img1.className = 'cov1';

        const img2 = document.createElement('img');
        img2.src = slideData.cover2;
        img2.alt = `${slideData.title} Cover Hover`;
        img2.className = 'cov2';

        // Susun elemen-elemen menjadi satu kesatuan
        leftUp.appendChild(chapter);
        leftUp.appendChild(title);
        leftUp.appendChild(keterangan);
        leftUp.appendChild(genres);
        leftUp.appendChild(readingNow);
        
        rightUp.appendChild(img1);
        rightUp.appendChild(img2);

        filter.appendChild(leftUp);
        filter.appendChild(rightUp);

        link.appendChild(filter);

        sliderItemsContainer.appendChild(link);
    });

    // REMOVED: Fixed height setting - let CSS handle responsive heights
    // sliderItemsContainer.style.height = '500px';
    
    // Set position relative untuk container
    sliderItemsContainer.style.position = 'relative';
    // Use CSS height instead of hardcoded JavaScript height
    sliderItemsContainer.style.height = 'inherit';

    sliderParent.appendChild(prevButton);
    sliderParent.appendChild(sliderItemsContainer);
    sliderParent.appendChild(nextButton);

    // Inisialisasi autoplay
    startAutoplay();
    
    // Event listeners untuk tombol
    prevButton.addEventListener('click', () => {
        previousSlide();
        resetAutoplay();
    });
    
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
}

function nextSlide() {
    const slides = document.querySelectorAll('.update-container');
    
    // Fade out slide saat ini
    slides[currentSlideIndex].setAttribute('style', slides[currentSlideIndex].getAttribute('style').replace(/opacity:\s*[^;]*/, 'opacity: 0'));
    
    // Update index
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    
    // Fade in slide berikutnya setelah delay singkat
    setTimeout(() => {
        slides[currentSlideIndex].setAttribute('style', slides[currentSlideIndex].getAttribute('style').replace(/opacity:\s*[^;]*/, 'opacity: 1'));
    }, 100);
}

function previousSlide() {
    const slides = document.querySelectorAll('.update-container');
    
    // Fade out slide saat ini
    slides[currentSlideIndex].setAttribute('style', slides[currentSlideIndex].getAttribute('style').replace(/opacity:\s*[^;]*/, 'opacity: 0'));
    
    // Update index
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    
    // Fade in slide sebelumnya setelah delay singkat
    setTimeout(() => {
        slides[currentSlideIndex].setAttribute('style', slides[currentSlideIndex].getAttribute('style').replace(/opacity:\s*[^;]*/, 'opacity: 1'));
    }, 100);
}

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        nextSlide();
    }, 5000); // 5 detik
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

// Pause autoplay saat mouse hover pada slider
function pauseAutoplayOnHover() {
    const slider = document.getElementById('main-slider');
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startAutoplay();
    });
}

// Mobile Navigation Functions
function initMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');

    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Close mobile menu
    mobileNavClose.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    // Close menu when clicking on overlay
    mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) {
            mobileMenuToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking nav links
    const navLinks = mobileNavOverlay.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildSlider('main-slider', slidesData);
    // Tambahkan pause on hover setelah slider dibuat
    setTimeout(pauseAutoplayOnHover, 100);
    // Initialize mobile navigation
    initMobileNavigation();
});

async function komikTop() {
    const loader = document.createElement("div");
    loader.className = "loader";
    containerPopular.appendChild(loader);
    try {
        const response = await fetch(`${api}/rekomendasi`);

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        containerPopular.removeChild(loader);

        data.forEach((manga) => {
            const cardLink = document.createElement("a");
            cardLink.className = "card-link";
            cardLink.href = `html/detail-komik.html?${manga.apiDetailLink}`;

            const card = document.createElement("div");
            card.className = "card";

            const thumbnailContainer = document.createElement("div");
            thumbnailContainer.className = "logo-komik";

            const thumbnailImage = document.createElement("img");
            thumbnailImage.src = manga.thumbnail;
            thumbnailImage.alt = `Sampul ${manga.title}`;
            thumbnailImage.loading = "lazy";

            const descriptionContainer = document.createElement("div");
            descriptionContainer.className = "deskripsi-komik";

            const titleHeader = document.createElement("h3");
            titleHeader.textContent = manga.title;

            thumbnailContainer.appendChild(thumbnailImage);
            descriptionContainer.appendChild(titleHeader);
            card.appendChild(thumbnailContainer);
            card.appendChild(descriptionContainer);
            cardLink.appendChild(card);
            containerPopular.appendChild(cardLink);
        });
    } catch (error) {
        console.error("Gagal memuat Komik:", error);
        containerPopular.removeChild = loader;
    }
}

//   K O M I K  T E R B A R U 
async function komikTerbaru() {
    const loader = document.createElement("div");
    loader.className = "loader";
    containerTerbaru.appendChild(loader);
    try {
        const response = await fetch(`${api}/terbaru-2`);
        const data = await response.json();
        console.log(data);
        if (!response.ok) {
            throw new Error(response.status);
        }
        containerTerbaru.removeChild(loader);

        data.forEach((manga) => {
            const cardTerbaru = document.createElement("div");
            cardTerbaru.className = "card-terbaru";

            const a = document.createElement("a");
            a.href = `detail-komik.html?${manga.apiDetailLink}`;

            const logoContainer = document.createElement("div");
            logoContainer.className = "logo-terbaru";

            const thumbnailImage = document.createElement("img");
            thumbnailImage.src = manga.thumbnail;
            thumbnailImage.alt = `Sampul ${manga.title}`;

            const infoContainer = document.createElement("div");
            infoContainer.className = "card-terbaru-info";

            const titleHeader = document.createElement("h3");
            titleHeader.className = "judul-terbaru";
            titleHeader.textContent = manga.title;

            const infoParagraph = document.createElement("p");
            infoParagraph.textContent = `${manga.type} • ${manga.genre}  ${manga.updateTime}`;

            const chapterLink = document.createElement("a");
            chapterLink.className = "chapter-terbaru";
            chapterLink.href = manga.apiChapterLink;
            chapterLink.textContent = manga.latestChapterTitle;

            cardTerbaru.appendChild(a);
            a.appendChild(logoContainer);
            logoContainer.appendChild(thumbnailImage);
            cardTerbaru.appendChild(infoContainer);
            infoContainer.appendChild(titleHeader);
            infoContainer.appendChild(infoParagraph);
            infoContainer.appendChild(chapterLink);
            containerTerbaru.appendChild(cardTerbaru);
        });
    } catch (error) {
        console.log("error");
    }
}
komikTop();
komikTerbaru();