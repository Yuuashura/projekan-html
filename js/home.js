// Menggunakan API proxy untuk mengatasi CORS atau data dummy
const api = "https://api.allorigins.win/raw?url="; // Proxy untuk mengatasi CORS
const originalAPI = "https://yuuashura-api.vercel.app/";

const containerPopular = document.querySelector("#items-popular");
const containerTerbaru = document.querySelector("#items-terbaru");

// Data dummy sebagai fallback jika API tidak dapat diakses
const dummyPopularData = [
    {
        title: "One Piece",
        thumbnail: "https://via.placeholder.com/240x150/8A2BE2/FFFFFF?text=One+Piece",
        apiDetailLink: "one-piece"
    },
    {
        title: "Naruto",
        thumbnail: "https://via.placeholder.com/240x150/8A2BE2/FFFFFF?text=Naruto",
        apiDetailLink: "naruto"
    },
    {
        title: "Attack on Titan",
        thumbnail: "https://via.placeholder.com/240x150/8A2BE2/FFFFFF?text=AOT",
        apiDetailLink: "attack-on-titan"
    },
    {
        title: "Demon Slayer",
        thumbnail: "https://via.placeholder.com/240x150/8A2BE2/FFFFFF?text=Demon+Slayer",
        apiDetailLink: "demon-slayer"
    },
    {
        title: "My Hero Academia",
        thumbnail: "https://via.placeholder.com/240x150/8A2BE2/FFFFFF?text=My+Hero+Academia",
        apiDetailLink: "my-hero-academia"
    }
];

const dummyTerbaruData = [
    {
        title: "Jujutsu Kaisen",
        thumbnail: "https://via.placeholder.com/170x120/8A2BE2/FFFFFF?text=JJK",
        type: "Manga",
        genre: "Action, Supernatural",
        updateTime: "2 jam lalu",
        latestChapterTitle: "Chapter 240",
        apiDetailLink: "jujutsu-kaisen",
        apiChapterLink: "jujutsu-kaisen-chapter-240"
    },
    {
        title: "Chainsaw Man",
        thumbnail: "https://via.placeholder.com/170x120/8A2BE2/FFFFFF?text=CSM",
        type: "Manga",
        genre: "Action, Horror",
        updateTime: "5 jam lalu",
        latestChapterTitle: "Chapter 150",
        apiDetailLink: "chainsaw-man",
        apiChapterLink: "chainsaw-man-chapter-150"
    },
    {
        title: "Tokyo Revengers",
        thumbnail: "https://via.placeholder.com/170x120/8A2BE2/FFFFFF?text=TR",
        type: "Manga",
        genre: "Action, Drama",
        updateTime: "1 hari lalu",
        latestChapterTitle: "Chapter 278",
        apiDetailLink: "tokyo-revengers",
        apiChapterLink: "tokyo-revengers-chapter-278"
    },
    {
        title: "Black Clover",
        thumbnail: "https://via.placeholder.com/170x120/8A2BE2/FFFFFF?text=BC",
        type: "Manga",
        genre: "Action, Magic",
        updateTime: "1 hari lalu",
        latestChapterTitle: "Chapter 372",
        apiDetailLink: "black-clover",
        apiChapterLink: "black-clover-chapter-372"
    }
];

const slidesData = [
    {
        link: "alya.html",
        bgImage: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/bg3.jpeg",
        chapter: "Chapter 112",
        title: "Alya Sometimes Hides Her Feelings in Russian",
        description: "Orang tua perlu tahu bahwa Alya Sometimes Hides Her Feelings in Russian adalah drama sekolah menengah tentang dua teman sekelas yang berusaha mencari tahu perasaan mereka satu sama lain...",
        genres: ["Comedy", "Romance", "School", "Slice of Life"],
        cover1: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/alya-cover.jpeg",
        cover2: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/alya-cover2.jpeg"
    },
    {
        link: "otonari-no-tenshi-sama.html",
        bgImage: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/mahiru-bg.jpg",
        chapter: "Chapter 66",
        title: "Otonari No Tenshi Sama",
        description: "Cerita ini mengikuti kehidupan seorang gadis yang selama ini dianggap biasa-biasa saja dan tidak berarti oleh...",
        genres: ["Romance", "Comedy", "School Life", "Slice Of Life"],
        cover1: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/mahiru-cover1.jpeg",
        cover2: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/mahiru-cover2.jpeg"
    },
    {
        link: "my-kisah.html",
        bgImage: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/waguri-bg.jpeg",
        chapter: "Chapter 157",
        title: "Kaoru Hana Wa Rin To Saku",
        description: "Kaoru hidup dengan ketegasan yang menjadi ciri khasnya, dimana dia selalu menunjukkan sikap kuat dan tegas dalam setiap langkahnya. Kehidupan sehari-harinya...",
        genres: ["Comedy", "Drama", "Romance", "Shounen"],
        cover1: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/waguri-cover1.jpeg",
        cover2: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/waguri-cover2.jpeg"
    }
];

let idxSekarang = 0;
let autoplayInterval;

function createLoader() {
    const loader = document.createElement("div");
    loader.className = "loader";
    return loader;
}

function removeElement(parent, child) {
    if (parent && child && parent.contains(child)) {
        parent.removeChild(child);
    }
}

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

    sliderItemsContainer.style.position = 'relative';
    sliderItemsContainer.style.height = 'inherit';

    sliderParent.appendChild(prevButton);
    sliderParent.appendChild(sliderItemsContainer);
    sliderParent.appendChild(nextButton);

    startAutoplay();
    
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
    
    slides[idxSekarang].style.opacity = '0';
    idxSekarang = (idxSekarang + 1) % slides.length;
    
    setTimeout(() => {
        slides[idxSekarang].style.opacity = '1';
    }, 100);
}

function previousSlide() {
    const slides = document.querySelectorAll('.update-container');
    
    slides[idxSekarang].style.opacity = '0';
    idxSekarang = (idxSekarang - 1 + slides.length) % slides.length;
    
    setTimeout(() => {
        slides[idxSekarang].style.opacity = '1';
    }, 100);
}

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

function resetAutoplay() {
    clearInterval(autoplayInterval);
    startAutoplay();
}

function pauseAutoplayOnHover() {
    const slider = document.getElementById('main-slider');
    
    slider.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startAutoplay();
    });
}

function initMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');

    if (!mobileMenuToggle || !mobileNavOverlay || !mobileNavClose) {
        return;
    }

    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mobileNavOverlay.classList.toggle('active');
        document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : 'auto';
    });

    mobileNavClose.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });

    mobileNavOverlay.addEventListener('click', (e) => {
        if (e.target === mobileNavOverlay) {
            mobileMenuToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    const navLinks = mobileNavOverlay.querySelectorAll('.nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mobileMenuToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
}

// Fungsi untuk fetch dengan retry dan fallback
async function fetchWithFallback(url, fallbackData) {
    const maxRetries = 2;
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.warn(`Attempt ${attempt + 1} failed:`, error.message);
            attempt++;
            
            if (attempt >= maxRetries) {
                console.log('API tidak dapat diakses, menggunakan data dummy');
                return fallbackData;
            }
            
            // Wait sebelum retry
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

async function komikTop() {
    const loader = createLoader();
    containerPopular.appendChild(loader);

    try {
        // Coba beberapa alternatif API
        let data;
        
        try {
            // Method 1: Direct API call
            data = await fetchWithFallback(`${originalAPI}rekomendasi`, dummyPopularData);
        } catch (error) {
            try {
                // Method 2: Using proxy
                data = await fetchWithFallback(`${api}${encodeURIComponent(originalAPI + 'rekomendasi')}`, dummyPopularData);
            } catch (proxyError) {
                // Method 3: Use dummy data
                data = dummyPopularData;
            }
        }

        removeElement(containerPopular, loader);

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
            
            // Handle image load error
            thumbnailImage.onerror = function() {
                this.src = 'https://via.placeholder.com/240x150/8A2BE2/FFFFFF?text=No+Image';
            };

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
        console.error("Gagal memuat Komik Popular:", error);
        removeElement(containerPopular, loader);
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.style.textAlign = 'center';
        errorDiv.style.padding = '20px';
        errorDiv.style.color = '#ff6b6b';
        
        const errorText = document.createElement('p');
        errorText.textContent = 'Gagal memuat komik popular. Silakan refresh halaman.';
        errorDiv.appendChild(errorText);
        
        containerPopular.appendChild(errorDiv);
    }
}

async function komikTerbaru() {
    const loader = createLoader();
    containerTerbaru.appendChild(loader);

    try {
        let data;
        
        try {
            // Method 1: Direct API call
            data = await fetchWithFallback(`${originalAPI}terbaru-2`, dummyTerbaruData);
        } catch (error) {
            try {
                // Method 2: Using proxy
                data = await fetchWithFallback(`${api}${encodeURIComponent(originalAPI + 'terbaru-2')}`, dummyTerbaruData);
            } catch (proxyError) {
                // Method 3: Use dummy data
                data = dummyTerbaruData;
            }
        }

        removeElement(containerTerbaru, loader);

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
            
            // Handle image load error
            thumbnailImage.onerror = function() {
                this.src = 'https://via.placeholder.com/170x120/8A2BE2/FFFFFF?text=No+Image';
            };

            const infoContainer = document.createElement("div");
            infoContainer.className = "card-terbaru-info";

            const titleHeader = document.createElement("h3");
            titleHeader.className = "judul-terbaru";
            titleHeader.textContent = manga.title;

            const infoParagraph = document.createElement("p");
            infoParagraph.textContent = `${manga.type} • ${manga.genre} • ${manga.updateTime}`;

            const chapterLink = document.createElement("a");
            chapterLink.className = "chapter-terbaru";
            chapterLink.href = manga.apiChapterLink || '#';
            chapterLink.textContent = manga.latestChapterTitle;

            logoContainer.appendChild(thumbnailImage);
            a.appendChild(logoContainer);
            cardTerbaru.appendChild(a);
            
            infoContainer.appendChild(titleHeader);
            infoContainer.appendChild(infoParagraph);
            infoContainer.appendChild(chapterLink);
            cardTerbaru.appendChild(infoContainer);
            
            containerTerbaru.appendChild(cardTerbaru);
        });
    } catch (error) {
        console.error("Gagal memuat Komik Terbaru:", error);
        removeElement(containerTerbaru, loader);
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.style.textAlign = 'center';
        errorDiv.style.padding = '20px';
        errorDiv.style.color = '#ff6b6b';
        
        const errorText = document.createElement('p');
        errorText.textContent = 'Gagal memuat komik terbaru. Silakan refresh halaman.';
        errorDiv.appendChild(errorText);
        
        containerTerbaru.appendChild(errorDiv);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    buildSlider('main-slider', slidesData);
    setTimeout(pauseAutoplayOnHover, 100);
    initMobileNavigation();
    
    // Load comic data
    komikTop();
    komikTerbaru();
});