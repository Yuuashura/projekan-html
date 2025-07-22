const api = "https://api.allorigins.win/raw?url="; //ALLOW CORS
const baseApi = "https://yuuashura-api.vercel.app";

const containerPopular = document.querySelector("#items-popular");
const containerTerbaru = document.querySelector("#items-terbaru");
const containerManga = document.querySelector("#manga-rekomendasi");
const containerManhwa = document.querySelector("#manhwa-rekomendasi");
const containerManhua = document.querySelector("#manhua-rekomendasi");
const header = document.querySelector("header");
const containerSearch = document.querySelector(".cari");

const slidesData = [
    // {
    //     link: "alya.html",
    //     bgImage: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/bg3.jpeg",
    //     chapter: "Chapter 112",
    //     title: "Alya Sometimes Hides Her Feelings in Russian",
    //     description: "Orang tua perlu tahu bahwa Alya Sometimes Hides Her Feelings in Russian adalah drama sekolah menengah tentang dua teman sekelas yang berusaha mencari tahu perasaan mereka satu sama lain...",
    //     genres: ["Comedy", "Romance", "School", "Slice of Life"],
    //     cover1: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/alya-cover.jpeg",
    //     cover2: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/alya-cover2.jpeg"
    // },
    // {
    //     link: "otonari-no-tenshi-sama.html",
    //     bgImage: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/mahiru-bg.jpg",
    //     chapter: "Chapter 66",
    //     title: "Otonari No Tenshi Sama",
    //     description: "Cerita ini mengikuti kehidupan seorang gadis yang selama ini dianggap biasa-biasa saja dan tidak berarti oleh...",
    //     genres: ["Romance", "Comedy", "School Life", "Slice Of Life"],
    //     cover1: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/mahiru-cover1.jpeg",
    //     cover2: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/mahiru-cover2.jpeg"
    // },
    {
        link: "my-kisah.html",
        bgImage: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/waguri-bg.jpeg",
        chapter: "Chapter 157",
        title: "Kaoru Hana Wa Rin To Saku",
        description: "Kaoru hidup dengan ketegasan yang menjadi ciri khasnya, dimana dia selalu menunjukkan sikap kuat dan tegas dalam setiap langkahnya. Kehidupan sehari-harinya...",
        genres: ["Comedy", "Drama", "Romance", "Shounen"],
        cover1: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/waguri-cover2.jpeg",
        cover2: "https://raw.githubusercontent.com/Yuuashura/projekan-html/refs/heads/main/assets/waguri-cover1.jpeg"
    }
];

let idxSekarang = 0;
let autoplayInterval;



// HEADER KETIKA DI SCROLL
window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
        containerSearch.classList.add('cariScroll');
    } else {
        header.classList.remove('scrolled');
        containerSearch.classList.remove('cariScroll');
    }
});


// MEMBUAT LOADING 
function createLoader() {
    const loader = document.createElement("div");
    loader.className = "loader";
    return loader;
}

// MENGHAPUS ELEMENT 
function removeElement(parent, child) {
    if (parent && child && parent.contains(child)) {
        parent.removeChild(child);
    }
}


// UNTUK MENAMPILKAN ERROR 
function tampilkanError(container, message) {
    const errorDiv = document.createElement('div');
    errorDiv.style.textAlign = 'center';
    errorDiv.style.padding = '20px';
    errorDiv.style.color = '#ff6b6b';
    const errorText = document.createElement('p');
    errorText.textContent = message;
    errorDiv.appendChild(errorText);
    container.appendChild(errorDiv);
}

// INI SLIDER NYA YANG   SEGEDE GABAN ITU 
function buildSlider(mainSlider, data) {
    const sliderParent = document.getElementById(mainSlider);

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
        link.style.opacity = index === 0 ? '1' : '0'; // tenary wakkk
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

        // buat nampilin genre, ARRAY NYA BEDA JUMLAH PAK PUSING SAYA MAH
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
    // sliderItemsContainer.style.display = 'none';

    // sliderParent.appendChild(prevButton);
    sliderParent.appendChild(sliderItemsContainer);
    // sliderParent.appendChild(nextButton);

    startAutoplay();

    prevButton.addEventListener('click', () => {
        slideSebelum();
        resetAutoplay();
    });

    nextButton.addEventListener('click', () => {
        slideSesudah();
        resetAutoplay();
    });
}

function slideSesudah() {
    const slides = document.querySelectorAll('.update-container');
    slides[idxSekarang].style.opacity = '0';
    idxSekarang = (idxSekarang + 1) % slides.length;
    setTimeout(() => {
        slides[idxSekarang].style.opacity = '1';
    }, 200);
}

function slideSebelum() {
    const slides = document.querySelectorAll('.update-container');
    slides[idxSekarang].style.opacity = '0';
    idxSekarang = (idxSekarang - 1 + slides.length) % slides.length;
    setTimeout(() => {
        slides[idxSekarang].style.opacity = '1';
    }, 200);
}

function startAutoplay() {
    autoplayInterval = setInterval(() => {
        slideSesudah();
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

//otak fetch di sini pak, 
async function fetchWithRetry(url) {
    const coba = 6;
    let percobaan = 0;
    while (percobaan < coba) {
        try {
            console.log(`Fetching ${url} (percobaan ${percobaan + 1})`);
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`GAGAL FETCH! status: ${response.status}`);
            }

            // mengembalikan data
            return await response.json();

        } catch (error) {
            console.log(`percobaan ${percobaan + 1} for ${url} failed:`, error.message);
            percobaan++;
            if (percobaan >= coba) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}



// PERINGKAT KOMIK 
async function komikTop() {
    const loader = createLoader();
    containerPopular.appendChild(loader);

    try {
        let data = await fetchWithRetry(`${baseApi}/rekomendasi`);
        let i = 0;

        let latestChapter = [];

        for (let index = 0; index < data.length; index++) {
            let data1 = await fetchWithRetry(`${baseApi}${data[index].apiDetailLink}`);

            latestChapter.push({
                latestChapter: data1.latestChapter.title,
                linkChapter : data1.latestChapter.apiLink
            });
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

            const descriptionContainer = document.createElement("div");
            descriptionContainer.className = "deskripsi-komik";

            const titleHeader = document.createElement("h3");
            titleHeader.textContent = manga.title;

            const chapterContainer = document.createElement("div");
            chapterContainer.className = "cont-ch";

            const chapterLink = document.createElement("a");
            chapterLink.className = "ch-rekomendasi";
            chapterLink.href = manga.apiChapterLink || `html/baca-komik.html?${latestChapter[i].linkChapter}`;
            chapterLink.textContent = latestChapter[i++].latestChapter;

            thumbnailContainer.appendChild(thumbnailImage);
            descriptionContainer.appendChild(titleHeader);
            card.appendChild(thumbnailContainer);
            card.appendChild(descriptionContainer);
            cardLink.appendChild(card);
            descriptionContainer.appendChild(chapterContainer);
            chapterContainer.appendChild(chapterLink);
            containerPopular.appendChild(cardLink);
        });
    } catch (error) {
        console.error("Gagal total memuat Komik Populer:", error);
        removeElement(containerPopular, loader);
        tampilkanError(containerPopular, 'Gagal memuat komik. Silakan coba muat ulang halaman.');
    }
}

// MANGA REKOMENDASI
async function mangaRekomendasi() {
    const loader = createLoader();
    containerManga.appendChild(loader);

    try {
        let data = await fetchWithRetry(`${baseApi}/komik-populer`);
        removeElement(containerManga, loader);
        data = data.manga.items;
        console.log(data);

        data.forEach((manga) => {

            const cardLink = document.createElement("a");
            cardLink.className = "card-link";
            cardLink.href = `/html/detail-komik.html?${manga.apiDetailLink}`;

            const cardDiv = document.createElement("div");
            cardDiv.className = "card";

            const logoContainer = document.createElement("div");
            logoContainer.className = "logo-komik bulat";

            const thumbnailImage = document.createElement("img");
            thumbnailImage.src = manga.thumbnail;
            thumbnailImage.alt = `Sampul ${manga.title}`;
            thumbnailImage.loading = "lazy";

            logoContainer.appendChild(thumbnailImage);

            const deskripsiContainer = document.createElement("div");
            deskripsiContainer.className = "deskripsi-komik";

            const titleHeader = document.createElement("h3");
            titleHeader.textContent = manga.title;

            const tagInfo = document.createElement("p");
            tagInfo.className = "tag-info";
            tagInfo.textContent = ` ${manga.genre}`;

            const chapterContainer = document.createElement("div");
            chapterContainer.className = "cont-ch";

            const chapterLink = document.createElement("a");
            chapterLink.className = "ch-rekomendasi";
            chapterLink.href = manga.apiChapterLink || '#';
            chapterLink.textContent = manga.latestChapter;

            chapterContainer.appendChild(chapterLink)

            deskripsiContainer.appendChild(titleHeader);
            deskripsiContainer.appendChild(tagInfo);
            deskripsiContainer.appendChild(chapterContainer);

            cardDiv.appendChild(logoContainer);
            cardDiv.appendChild(deskripsiContainer);

            cardLink.appendChild(cardDiv);

            containerManga.appendChild(cardLink);
          


        });
    } catch (error) {
        console.error("Gagal total memuat Komik Populer:", error);
        removeElement(containerManga, loader);
        tampilkanError(containerManga, 'Gagal memuat komik. Silakan coba muat ulang halaman.');
    }
}

// MANHWA REKOMENDASI
async function manhwaRekomendasi() {
    const loader = createLoader();
    containerManhwa.appendChild(loader);

    try {
        let data = await fetchWithRetry(`${baseApi}/komik-populer`);
        removeElement(containerManhwa, loader);
        data = data.manhwa.items;
        console.log(data);

        data.forEach((manga) => {

            const cardLink = document.createElement("a");
            cardLink.className = "card-link";
            cardLink.href = `/html/detail-komik.html?${manga.apiDetailLink}`;

            const cardDiv = document.createElement("div");
            cardDiv.className = "card";

            const logoContainer = document.createElement("div");
            logoContainer.className = "logo-komik bulat";

            const thumbnailImage = document.createElement("img");
            thumbnailImage.src = manga.thumbnail;
            thumbnailImage.alt = `Sampul ${manga.title}`;
            thumbnailImage.loading = "lazy";

            logoContainer.appendChild(thumbnailImage);

            const deskripsiContainer = document.createElement("div");
            deskripsiContainer.className = "deskripsi-komik";

            const titleHeader = document.createElement("h3");
            titleHeader.textContent = manga.title;

            const tagInfo = document.createElement("p");
            tagInfo.className = "tag-info";
            tagInfo.textContent = ` ${manga.genre}`;

            const chapterContainer = document.createElement("div");
            chapterContainer.className = "cont-ch";

            const chapterLink = document.createElement("a");
            chapterLink.className = "ch-rekomendasi";
            chapterLink.href = manga.apiChapterLink || '#';
            chapterLink.textContent = manga.latestChapter;

            chapterContainer.appendChild(chapterLink)

            deskripsiContainer.appendChild(titleHeader);
            deskripsiContainer.appendChild(tagInfo);
            deskripsiContainer.appendChild(chapterContainer);

            cardDiv.appendChild(logoContainer);
            cardDiv.appendChild(deskripsiContainer);

            cardLink.appendChild(cardDiv);

            containerManhwa.appendChild(cardLink);
          


        });
    } catch (error) {
        console.error("Gagal total memuat Komik Populer:", error);
        removeElement(containerManga, loader);
        tampilkanError(containerManga, 'Gagal memuat komik. Silakan coba muat ulang halaman.');
    }
}



// MANHWA REKOMENDASI
async function manhuaRekomendasi() {
    const loader = createLoader();
    containerManhua.appendChild(loader);

    try {
        let data = await fetchWithRetry(`${baseApi}/komik-populer`);
        removeElement(containerManhua, loader);
        data = data.manhua.items;
        console.log(data);

        data.forEach((manga) => {

            const cardLink = document.createElement("a");
            cardLink.className = "card-link";
            cardLink.href = `/html/detail-komik.html?${manga.apiDetailLink}`;

            const cardDiv = document.createElement("div");
            cardDiv.className = "card";

            const logoContainer = document.createElement("div");
            logoContainer.className = "logo-komik bulat";

            const thumbnailImage = document.createElement("img");
            thumbnailImage.src = manga.thumbnail;
            thumbnailImage.alt = `Sampul ${manga.title}`;
            thumbnailImage.loading = "lazy";

            logoContainer.appendChild(thumbnailImage);

            const deskripsiContainer = document.createElement("div");
            deskripsiContainer.className = "deskripsi-komik";

            const titleHeader = document.createElement("h3");
            titleHeader.textContent = manga.title;

            const tagInfo = document.createElement("p");
            tagInfo.className = "tag-info";
            tagInfo.textContent = ` ${manga.genre}`;

            const chapterContainer = document.createElement("div");
            chapterContainer.className = "cont-ch";

            const chapterLink = document.createElement("a");
            chapterLink.className = "ch-rekomendasi";
            chapterLink.href = manga.apiChapterLink || '#';
            chapterLink.textContent = manga.latestChapter;

            chapterContainer.appendChild(chapterLink)

            deskripsiContainer.appendChild(titleHeader);
            deskripsiContainer.appendChild(tagInfo);
            deskripsiContainer.appendChild(chapterContainer);

            cardDiv.appendChild(logoContainer);
            cardDiv.appendChild(deskripsiContainer);

            cardLink.appendChild(cardDiv);

            containerManhua.appendChild(cardLink);
          


        });
    } catch (error) {
        console.error("Gagal total memuat Komik Populer:", error);
        removeElement(containerManga, loader);
        tampilkanError(containerManga, 'Gagal memuat komik. Silakan coba muat ulang halaman.');
    }
}



// NEWEST KOMIK
async function komikTerbaru() {
    const loader = createLoader();
    containerTerbaru.appendChild(loader);

    try {
        let data;
        try {
            data = await fetchWithRetry(`${baseApi}/terbaru-2`);
            
        } catch (directError) {
            console.warn("API langsung gagal, mencoba melalui proxy...", directError);
            data = await fetchWithRetry(`${api}${encodeURIComponent(baseApi + 'terbaru-2')}`);
        }

        removeElement(containerTerbaru, loader);

        data.forEach((manga) => {
            const cardTerbaru = document.createElement("div");
            cardTerbaru.className = "card-terbaru";

            const a = document.createElement("a");
            a.href = `/html/detail-komik.html?${manga.apiDetailLink}`;
            
            const atwice = document.createElement("a");
            atwice.href = `/html/detail-komik.html?${manga.apiDetailLink}`;

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
            chapterLink.href = manga.apiChapterLink || '#';
            chapterLink.textContent = manga.latestChapterTitle;

            logoContainer.appendChild(thumbnailImage);
            a.appendChild(logoContainer);
            cardTerbaru.appendChild(a);

            infoContainer.appendChild(titleHeader);
            infoContainer.appendChild(infoParagraph);
            infoContainer.appendChild(chapterLink);
            atwice.appendChild(infoContainer);
            cardTerbaru.appendChild(atwice);

            containerTerbaru.appendChild(cardTerbaru);
        });
    } catch (error) {
        console.error("Gagal total memuat Komik Terbaru:", error);
        removeElement(containerTerbaru, loader);
        tampilkanError(containerTerbaru, 'Gagal memuat komik terbaru. Silakan coba muat ulang halaman.');
    }
}


// CARI KOMIK 
async function searchKomik(value) {
    const endpoint = baseApi + "search?q=" + encodeURIComponent(value);
    const proxyUrl = api + endpoint;

    const containerSearch = document.getElementById("searchContainer");
    const oldResults = containerSearch.querySelectorAll(".container-search");
    oldResults.forEach(el => containerSearch.removeChild(el));

    let response = await fetch(proxyUrl);
    let comic = await response.json();
    let data = comic.data;

    data.forEach((manga) => {
        const searchCard = document.createElement("div");
        searchCard.className = "container-search";
        const img = document.createElement("img");
        img.src = manga.thumbnail;
        img.alt = `Sampul ${manga.title}`;
        const title = document.createElement("p");
        title.textContent = manga.title;
        const link = document.createElement("a");
        link.classList.add("search-a");
        link.href = `detail-komik.html?${manga.apiDetailLink}`;
        containerSearch.appendChild(searchCard);
        searchCard.appendChild(link);
        link.appendChild(img);
        link.appendChild(title);
    });
}

// Jalankan saat user mengetik di input
addEventListener('input', () => {
    const keyword = document.getElementById("searchInput").value.trim();
    if (keyword) {
        searchAnime(keyword);
    } else {

        const containerSearch = document.getElementById("searchContainer");
        const oldResults = containerSearch.querySelectorAll(".container-search");
        oldResults.forEach(el => containerSearch.removeChild(el));

    }
});

document.addEventListener('DOMContentLoaded', () => {
    buildSlider('main-slider', slidesData);
    setTimeout(pauseAutoplayOnHover, 1010);
    initMobileNavigation();
    komikTop();
    mangaRekomendasi();
    manhwaRekomendasi();
    manhuaRekomendasi();
    komikTerbaru();
});