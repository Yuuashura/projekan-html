document.addEventListener('DOMContentLoaded', () => {
  const comicContainer = document.getElementById('comic-container');
  const paginationControls = document.getElementById('pagination-controls');
  const prevButton = document.getElementById('prev-page-btn');
  const nextButton = document.getElementById('next-page-btn');
  const pageInfo = document.getElementById('page-info');
  const api = 'https://yuuashura-api.vercel.app/pustaka';

  // =========== FUNGSI MENAMPILKAN KOMIK ==============
  function tampilkanKomik(comics) {
    comicContainer.textContent = '';
    if (!comics || comics.length === 0) {
      const message = document.createElement('p');
      message.className = 'status-message';
      message.textContent = 'Tidak ada komik yang ditemukan.';
      comicContainer.appendChild(message);
      return;
    }

    comics.forEach((comic) => {
      const cardLink = document.createElement('a');
      const card = document.createElement('div');
      const thumbnailContainer = document.createElement('div');
      const thumbnailImage = document.createElement('img');
      const badge = document.createElement('span');
      const contentContainer = document.createElement('div');
      const titleHeader = document.createElement('h3');
      const chapterParagraph = document.createElement('p');

      cardLink.className = 'card-link';
      cardLink.href = `detail-komik.html?${comic.detailUrl}`;
      card.className = 'card';
      thumbnailContainer.className = 'card-thumbnail';
      thumbnailImage.src = comic.thumbnail;
      thumbnailImage.alt = `Sampul ${comic.title}`;
      thumbnailImage.loading = 'lazy';
      badge.className = 'card-badge';
      badge.textContent = comic.type;
      contentContainer.className = 'card-content';
      titleHeader.textContent = comic.title;
      chapterParagraph.textContent = comic.latestChapter.title;
      chapterParagraph.className = 'card-chapters';

      thumbnailContainer.appendChild(thumbnailImage);
      thumbnailContainer.appendChild(badge);
      contentContainer.appendChild(titleHeader);
      card.appendChild(thumbnailContainer);
      card.appendChild(contentContainer);
      cardLink.appendChild(card);
      contentContainer.appendChild(chapterParagraph);
      comicContainer.appendChild(cardLink);
    });
  }
  // =========================================================

  // --- FUNGSI FETCH DATA ---
  async function fetchComics(page) {
    comicContainer.textContent = '';
    const loader = document.createElement('div');
    loader.className = 'loader';
    comicContainer.appendChild(loader);

    paginationControls.style.display = 'flex';
    const url = `${api}/${page}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Gagal mengambil data komik');

      const jsonData = await response.json();
      tampilkanKomik(jsonData.results);
      pagnation(page, jsonData.results.length > 0);
    } catch (error) {
      comicContainer.textContent = 'Gagal memuat data komik.';
      paginationControls.style.display = 'none';
    }
  }

  // --- FUNGSI PAGNATION ---
  function pagnation(currentPage, hasNextPage) {
    pageInfo.textContent = `Halaman ${currentPage}`;
    prevButton.disabled = currentPage <= 1;
    nextButton.disabled = !hasNextPage;
  }

  // --- FUNGSI UPDATE URL ---
  function updateURL(page) {
    const newUrl = `all-comics.html?page=${page}`;
    window.history.pushState({ path: newUrl }, 'Jembud', newUrl);
  }

  // --- FUNGSI HANDLER PAGE LOAD ---
  function handlePageLoad() {
    console.log('window.location.search:', window.location.search);
    const params = new URLSearchParams(window.location.search);
    const page = parseInt(params.get('page')) || 1;
    console.log('Current page:', page);
    fetchComics(page);
  }

  nextButton.addEventListener('click', () => {
    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get('page')) || 1;
    page++;
    updateURL(page);
    fetchComics(page);
     window.scrollTo(0, 0);
  });

  prevButton.addEventListener('click', () => {
    const params = new URLSearchParams(window.location.search);
    let page = parseInt(params.get('page')) || 1;
    if (page > 1) {
      page--;
      updateURL(page);
      fetchComics(page);
       window.scrollTo(0, 0);
    }
  });

  // --- FUNGSI HANDLER POPSTATE ---
  // Fungtion ini agar bisa membuat user menggunakan browser back dan forward
  window.addEventListener('popstate', handlePageLoad);
  handlePageLoad();
  // =========================================================




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

// =====================================================================

  // ===================  SEARCH  ==========================================
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


  initMobileNavigation();
});