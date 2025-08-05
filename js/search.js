const baseApi = "https://yuuashura-api.vercel.app/";


document.querySelector(".cari").style.opacity = "0";
document.querySelector(".cari").style.zIndex = "-100";

const searchInput = document.querySelector(".cariKey");
const searchButton = document.getElementById("searchButton");
const resultsContainer = document.getElementById("search-results");
const pageTitle = document.getElementById("pageTitle");

let hasilkomik = [];

function displayResults(results) {
    resultsContainer.textContent = "";

    if (!results || results[0].slug === "") {
        const notFound = document.createElement("div");
        notFound.className = "status-message";
        notFound.textContent = "Komik tidak ditemukan. Coba kata kunci lain.";
        resultsContainer.appendChild(notFound);
        return;
    }

    results.forEach((item, index) => {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.style.animationDelay = `${index * 0.1}s`;

        const link = document.createElement("a");
        link.href = `detail-komik.html?${item.href}`;

        const img = document.createElement("img");
        img.src = item.thumbnail;
        img.alt = item.title;

        const info = document.createElement("div");
        info.className = "result-info";

        const title = document.createElement("h3");
        title.textContent = item.title;

        const desc = document.createElement("p");
        desc.textContent = item.description + "...";

        const genre = document.createElement("span");
        genre.className = "genre-tag";
        genre.textContent = item.genre;

        const type = document.createElement("span");
        type.className = "red";
        type.textContent = item.type;

        info.appendChild(title);
        info.appendChild(desc);
        info.appendChild(genre);
        info.appendChild(type);

        link.appendChild(img);
        link.appendChild(info);
        resultItem.appendChild(link);
        resultsContainer.appendChild(resultItem);
    });
}

function createLoader() {
    const loader = document.createElement("div");
    loader.className = "loader";
    return loader;
}

async function getDataComic(param) {
    resultsContainer.textContent = "";
    resultsContainer.appendChild(createLoader());

    const res = await fetch(`${baseApi}search?q=${param}`);
    const data = await res.json();
    hasilkomik = data.data;

    resultsContainer.removeChild(document.querySelector(".loader"));
    displayResults(hasilkomik);
}

function performSearch(query) {
    const lower = query.toLowerCase().trim();
    const newUrl = `search.html?q=${encodeURIComponent(lower)}`;
    window.history.replaceState(null, '', newUrl);

    getDataComic(lower);
}

searchButton.addEventListener("click", () => performSearch(searchInput.value));
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") performSearch(searchInput.value);
});


  // RESPONSIFE MOBILE ====================================================================
  function initMobileNavigation() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const mobileNavClose = document.getElementById('mobileNavClose');

    if (!mobileMenuToggle || !mobileNavOverlay || !mobileNavClose) {
      return;
    }

    // Menampilkan menu saat tombol toggle diklik
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      mobileNavOverlay.classList.toggle('active');
      document.body.style.overflow = mobileNavOverlay.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Menutup menu saat tombol close diklik
    mobileNavClose.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('active');
      mobileNavOverlay.classList.remove('active');
      document.body.style.overflow = 'auto';
    });


    // Menutup menu saat overlay diklik -- klik dimana saja
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) {
        mobileMenuToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });


    // Menutup menu saat tautan diklik
    const navLinks = mobileNavOverlay.querySelectorAll('.nav a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });


    // memastikan menu tertutup saat ukuran layar lebih besar dari 768px
    // untuk menghindari masalah saat mengubah ukuran jendela
    // setelah membuka menu di hp
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        mobileMenuToggle.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
// ===============================================================================================

document.addEventListener("DOMContentLoaded", () => {
    initMobileNavigation(); 
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    const decoded = decodeURIComponent(query || "");
    searchInput.value = decoded;
    performSearch(decoded);
});