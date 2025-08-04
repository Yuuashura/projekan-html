document.addEventListener('DOMContentLoaded', () => {
    const genreSelect = document.getElementById('genre-select');
    const comicContainer = document.getElementById('comic-container');
    const paginationControls = document.getElementById('pagination-controls');
    const prevButton = document.getElementById('prev-page-btn');
    const nextButton = document.getElementById('next-page-btn');
    const pageInfo = document.getElementById('page-info');

    const baseApi = 'https://yuuashura-api.vercel.app';
    let allGenres = [];

    // --- FUNGSI BARU UNTUK MENAMPILKAN KARTU YANG LEBIH LENGKAP ---
    function displayComics(comics) {
        // comicContainer.removeChild(document.querySelector('.loader'));
        comicContainer.textContent = '';
        if (!comics || comics.length === 0) {
            const pesanAwal = document.createElement('p');
            pesanAwal.textContent = 'Tidak komik yang ditemukan';
            pesanAwal.classList.add('status-message');
            comicContainer.appendChild(pesanAwal);
            return;
        }
        comics.forEach(comic => {
            const cardLink = document.createElement('a');
            cardLink.className = 'card-link';
            cardLink.href = `detail-komik.html?${comic.apiMangaLink}`;
            // card.style.animationDelay = "0.2s";

            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            const thumbnailDiv = document.createElement('div');
            thumbnailDiv.className = 'card-thumbnail';
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = comic.thumbnail;
            thumbnailImg.alt = `Sampul ${comic.title}`;
            thumbnailImg.loading = 'lazy';
            const typeBadge = document.createElement('span');
            typeBadge.className = 'card-badge';
            typeBadge.textContent = comic.type;
            thumbnailDiv.appendChild(thumbnailImg);
            thumbnailDiv.appendChild(typeBadge);
            const contentDiv = document.createElement('div');
            contentDiv.className = 'card-content';
            const titleH3 = document.createElement('h3');
            titleH3.textContent = comic.title;
            const descriptionP = document.createElement('p');
            descriptionP.className = 'card-description';
            descriptionP.textContent = comic.description;
            const genreP = document.createElement('p');
            genreP.className = 'card-info';
            const genreStrong = document.createElement('span');
            genreStrong.textContent = 'Genre: ';
            genreP.appendChild(genreStrong);
            genreP.appendChild(document.createTextNode(comic.genre));
            const additionalInfoP = document.createElement('p');
            additionalInfoP.className = 'card-info';
            const infoStrong = document.createElement('span');
            infoStrong.textContent = 'Info: ';
            additionalInfoP.appendChild(infoStrong);
            additionalInfoP.appendChild(document.createTextNode(comic.additionalInfo));
            const updateStatusP = document.createElement('p');
            updateStatusP.className = 'card-info';
            const updateStrong = document.createElement('span');
            updateStrong.textContent = 'Update: ';
            updateStatusP.appendChild(updateStrong);
            updateStatusP.appendChild(document.createTextNode(comic.updateStatus));
            const chaptersDiv = document.createElement('div');
            chaptersDiv.className = 'card-chapters';
            const firstChapterLink = document.createElement('a');
            firstChapterLink.href = `detail-komik.html?${comic.apiMangaLink}`;
            firstChapterLink.textContent = `Awal: ${comic.chapters.first.chapter}`;
            const latestChapterLink = document.createElement('a');
            latestChapterLink.href = `detail-komik.html?${comic.apiMangaLink}`;
            latestChapterLink.textContent = `Terbaru: ${comic.chapters.latest.chapter}`;
            chaptersDiv.appendChild(firstChapterLink);
            chaptersDiv.appendChild(latestChapterLink);
            contentDiv.appendChild(titleH3);
            contentDiv.appendChild(descriptionP);
            contentDiv.appendChild(genreP);
            contentDiv.appendChild(additionalInfoP);
            contentDiv.appendChild(updateStatusP);
            contentDiv.appendChild(chaptersDiv);
            cardDiv.appendChild(thumbnailDiv);
            cardDiv.appendChild(contentDiv);
            cardLink.appendChild(cardDiv);
            comicContainer.appendChild(cardLink);
        });
    }

    async function fetchComics(genre, page) {
        comicContainer.textContent = '';
        const loader = document.createElement('div');
        loader.classList.add("loader");
        comicContainer.appendChild(loader);
        paginationControls.style.display = 'flex';
        const url = `${baseApi}/genre/${genre}/${page}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Gagal mengambil data komik');

            const jsonData = await response.json();
            displayComics(jsonData.data);
            updatePagination(page, jsonData.hasNextPage);

        } catch (error) {
            console.error("Error fetching comics:", error);
            comicContainer.textContent = '';
            const pesanAwal = document.createElement('p');
            pesanAwal.textContent = 'Gagal Memuat Data Komik';
            pesanAwal.classList.add('status-message');
            comicContainer.appendChild(pesanAwal);

            paginationControls.style.display = 'none';
        }
    }

    function updatePagination(currentPage, hasNextPage) {
        pageInfo.textContent = `Halaman ${currentPage}`;
        prevButton.disabled = currentPage <= 1;
        nextButton.disabled = !hasNextPage;
    }

    function updateURL(genre, page) {
        const newUrl = `pustaka.html?genre=${genre}&page=${page}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }

    async function handlePageLoad() {
        await fetchAllGenres();

        const params = new URLSearchParams(window.location.search);
        const genre = params.get('genre');
        const page = parseInt(params.get('page')) || 1;

        populateGenreFilter(genre);

        if (genre) {
            fetchComics(genre, page);
        } else {
            const pesanAwal = document.createElement('p');
            pesanAwal.textContent = 'Pilih genre terlebih dahulu';
            pesanAwal.classList.add('status-message');
            comicContainer.appendChild(pesanAwal);
            paginationControls.style.display = 'none';
        }
    }

    async function fetchAllGenres() {
        try {
            const response = await fetch(`${baseApi}/genre-all`);
            if (!response.ok) throw new Error('Gagal mengambil daftar genre');
            allGenres = await response.json();
        } catch (error) {
            console.error("Error fetching genres:", error);
            const failedSelect = document.createElement('option');
            failedSelect.value = "";
            failedSelect.textContent = "Gagal memuat genre";
            genreSelect.appendChild(failedSelect);
        }
    }

    function populateGenreFilter(selectedGenre) {
        genreSelect.removeChild(document.querySelector('#default-option'));
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.textContent = "Pilih Genre";
        genreSelect.appendChild(defaultOption);

        allGenres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre.slug;
            option.textContent = genre.title;
            if (genre.slug === selectedGenre) {
                option.selected = 1; //turen on yg sedang di pilih
            }
            genreSelect.appendChild(option);
        });
    }

    genreSelect.addEventListener('change', (event) => {
        const selectedGenre = event.target.value;
        if (selectedGenre) {
            updateURL(selectedGenre, 1);
            fetchComics(selectedGenre, 1);
        }
    });

    nextButton.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        const genre = params.get('genre');
        let page = parseInt(params.get('page')) || 1;
        page++;
        updateURL(genre, page);
        fetchComics(genre, page);
    });

    prevButton.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        const genre = params.get('genre');
        let page = parseInt(params.get('page')) || 1;
        if (page > 1) {
            page--;
            updateURL(genre, page);
            fetchComics(genre, page);
        }
    });





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


    //======================================================================
    // RESPONSIFE MOBILE 
    //=====================================================================
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
            if (window.innerWidth > 900) {
                mobileMenuToggle.classList.remove('active');
                mobileNavOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    }

    initMobileNavigation();

    //==================================================================




    window.addEventListener('popstate', handlePageLoad);

    handlePageLoad();
});
