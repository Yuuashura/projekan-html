document.addEventListener('DOMContentLoaded', () => {
    // --- SELEKSI ELEMEN ---
    const comicContainer = document.getElementById('comic-container');
    const paginationControls = document.getElementById('pagination-controls');
    const prevButton = document.getElementById('prev-page-btn');
    const nextButton = document.getElementById('next-page-btn');
    const pageInfo = document.getElementById('page-info');
    const API_BASE_URL = 'https://yuuashura-api.vercel.app/pustaka';

    // --- FUNGSI TAMPILKAN KOMIK (TANPA INNERHTML) ---
    function displayComics(comics) {
        comicContainer.textContent = ''; // Cara aman untuk mengosongkan kontainer
        if (!comics || comics.length === 0) {
            const message = document.createElement('p');
            message.className = 'status-message';
            message.textContent = 'Tidak ada komik yang ditemukan.';
            comicContainer.appendChild(message);
            return;
        }

        comics.forEach((comic, index) => {
            const cardLink = document.createElement('a');
            cardLink.className = 'card-link';
            cardLink.href = `detail-komik.html?${comic.detailUrl}`;

            const card = document.createElement('div');
            card.className = 'card';

            const thumbnailContainer = document.createElement('div');
            thumbnailContainer.className = 'card-thumbnail';

            const thumbnailImage = document.createElement('img');
            thumbnailImage.src = comic.thumbnail;
            thumbnailImage.alt = `Sampul ${comic.title}`;
            thumbnailImage.loading = 'lazy';

            const badge = document.createElement('span');
            badge.className = 'card-badge';
            badge.textContent = comic.type;
            
            const contentContainer = document.createElement('div');
            contentContainer.className = 'card-content';

            const titleHeader = document.createElement('h3');
            titleHeader.textContent = comic.title;

            const chapterParagraph = document.createElement('p');
            chapterParagraph.textContent = comic.latestChapter.title;

            // Menyusun elemen (Appending)
            thumbnailContainer.appendChild(thumbnailImage);
            thumbnailContainer.appendChild(badge);
            
            contentContainer.appendChild(titleHeader);
            contentContainer.appendChild(chapterParagraph);

            card.appendChild(thumbnailContainer);
            card.appendChild(contentContainer);
            
            cardLink.appendChild(card);
            
            comicContainer.appendChild(cardLink);
        });
    }

    // --- FUNGSI FETCH DATA ---
    async function fetchComics(page) {
        comicContainer.textContent = '';
        const loader = document.createElement('div');
        loader.className = 'loader'; // Pastikan ada style untuk .loader
        comicContainer.appendChild(loader);
        
        paginationControls.style.display = 'flex';
        const url = `${API_BASE_URL}/${page}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Gagal mengambil data komik');
            
            const jsonData = await response.json();
            displayComics(jsonData.results);
            updatePagination(page, jsonData.results.length > 0);
        } catch (error) {
            console.error("Error fetching comics:", error);
            comicContainer.textContent = 'Gagal memuat data. Silakan coba lagi nanti.';
            paginationControls.style.display = 'none';
        }
    }

    // --- FUNGSI PAGINATION & URL ---
    function updatePagination(currentPage, hasNextPage) {
        pageInfo.textContent = `Halaman ${currentPage}`;
        prevButton.disabled = currentPage <= 1;
        nextButton.disabled = !hasNextPage;
    }

    function updateURL(page) {
        const newUrl = `all-comics.html?page=${page}`;
        window.history.pushState({ path: newUrl }, '', newUrl);
    }

    function handlePageLoad() {
        const params = new URLSearchParams(window.location.search);
        const page = parseInt(params.get('page')) || 1;
        fetchComics(page);
    }
    
    nextButton.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        let page = parseInt(params.get('page')) || 1;
        page++;
        updateURL(page);
        fetchComics(page);
    });

    prevButton.addEventListener('click', () => {
        const params = new URLSearchParams(window.location.search);
        let page = parseInt(params.get('page')) || 1;
        if (page > 1) {
            page--;
            updateURL(page);
            fetchComics(page);
        }
    });

    window.addEventListener('popstate', handlePageLoad);
    
    handlePageLoad();
    
    // --- FUNGSI NAVIGASI & SEARCH DARI PUSTAKA.HTML ---
    function initMobileNavigation() {
        // ... (seluruh kode fungsi initMobileNavigation dari pustaka.html bisa ditempel di sini)
    }

    function setupSearch() {
        // ... (seluruh kode fungsi lakukanPencarian dari pustaka.html bisa ditempel di sini)
    }

    initMobileNavigation();
    setupSearch();
});