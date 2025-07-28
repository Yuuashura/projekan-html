const baseApi = "https://yuuashura-api.vercel.app/";

window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

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

document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("q");
    const decoded = decodeURIComponent(query || "");
    searchInput.value = decoded;
    performSearch(decoded);
});