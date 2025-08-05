const api = 'https://yuuashura-api.vercel.app';


// menyimpan elemen-elemen yang akan digunakan
// untuk menghindari pemanggilan DOM berulang-ulang
const elements = {
    title: document.getElementById('chapter-title'),
    infoDetails: document.getElementById('chapter-info-details'),
    imagesContainer: document.getElementById('chapter-images'),
    additionalDesc: document.getElementById('additional-description'),
    top: {
        prev: document.getElementById('top-prev-button'),
        next: document.getElementById('top-next-button'),
        all: document.getElementById('top-all-chapters-button')
    },
    bottom: {
        prev: document.getElementById('bottom-prev-button'),
        next: document.getElementById('bottom-next-button'),
        all: document.getElementById('bottom-all-chapters-button')
    }
};


let lastScroll = window.scrollY;

const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    let currentScroll = window.scrollY;
    if(currentScroll > lastScroll){
        header.classList.add('scrolled');
    }else{
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});



// fungsi untuk menghapus gambar komik
function clearContainer(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}




// fungsi fetching api untuk memuat chapter berdasarkan endpoint
async function loadChapter(apiEndpoint, isPopState = false) {
    setLoadingState(true);
    window.scrollTo(0, 0);

    try {
        const response = await fetch(api + apiEndpoint);
        if (!response.ok) {
            throw new Error(`${response.status}`);
        }
        const data = await response.json();
        buildPage(data);
        if (!isPopState) {
            const newUrl = `?${apiEndpoint}`;
            const newTitle = data.chapterInfo.Judul;
            window.history.pushState({ endpoint: apiEndpoint }, newTitle, newUrl);
        }
    } catch (error) {
        console.error("Fetch error:", error);
        clearContainer(elements.imagesContainer);
        const errorP = document.createElement('p');
        errorP.className = 'loading-placeholder';
        errorP.style.color = '#ff6464';
        errorP.textContent = 'Gagal memuat chapter. Silakan coba lagi.';
        elements.imagesContainer.appendChild(errorP);
        elements.title.textContent = "Gagal Memuat";

    } finally {
        setLoadingState(false);
    }
}


// FUNGSI UNTUK MEMBUAT GAMBAR CHAPTER DAN INFORMASI CHAPTER
function buildPage(data) {
    document.title = data.chapterInfo.Judul;
    elements.title.textContent = data.chapterInfo.Judul;

    clearContainer(elements.infoDetails);
    const descP = document.createElement('p');
    const descStrong = document.createElement('p');
    descStrong.textContent = 'Deskripsi: ';
    descP.appendChild(descStrong);
    descP.appendChild(document.createTextNode(data.description));

    const rilisP = document.createElement('p');
    const rilisStrong = document.createElement('p');
    rilisStrong.textContent = 'Tanggal Rilis: ';
    rilisP.appendChild(rilisStrong);
    rilisP.appendChild(document.createTextNode(data.chapterInfo['Tanggal Rilis']));
    elements.infoDetails.appendChild(descP);
    elements.infoDetails.appendChild(rilisP);
    clearContainer(elements.imagesContainer);

    // FRAGMENT TU KAYAK WADAH ATAU DIV UNTUK MENAMPUNG GAMBAR
    // JADI KITA BISA MENAMBAHKAN GAMBAR TANPA MEMBUAT DOM BERULANG-ULANG
    const fragment = document.createDocumentFragment();

    data.images.forEach(image => {
        const imgElement = document.createElement('img');
        imgElement.src = image.src;
        imgElement.alt = image.alt;
        imgElement.loading = 'lazy';
        fragment.appendChild(imgElement);
    });
    elements.imagesContainer.appendChild(fragment);
    elements.additionalDesc.textContent = data.additionalDescription;
    updateNavigation(data.navigation, data.mangaInfo);
}

// FUNGSI UNTUK MEMPERBARUI NAVIGASI CHAPTER
function updateNavigation(navData, mangaInfo) {
    [elements.top.all, elements.bottom.all].forEach(btn => btn.href = `detail-komik.html?param=${mangaInfo.slug}`);
    updateNavButton(elements.top.prev, navData.prevChapter);
    updateNavButton(elements.bottom.prev, navData.prevChapter);
    updateNavButton(elements.top.next, navData.nextChapter);
    updateNavButton(elements.bottom.next, navData.nextChapter);
}

// FUNGSI UNTUK MEMPERBARUI TOMBOL NAVIGASI
function updateNavButton(button, chapterData) {
    if (chapterData && chapterData.apiLink) {
        button.disabled = false;
        button.textContent = button.id.includes('next') ? `Chapter ${chapterData.chapter} ›` : `‹ Chapter ${chapterData.chapter}`;
        button.onclick = () => loadChapter(chapterData.apiLink);
    } else {
        button.disabled = true;
        button.textContent = button.id.includes('next') ? 'Akhir ›' : '‹ Awal';
        button.onclick = null;
    }
}

// FUNGSI UNTUK MENAMPILKAN STATUS LOADING
function setLoadingState(isLoading) {
    if (isLoading) {
        elements.title.textContent = 'Memuat Chapter...';
        clearContainer(elements.imagesContainer);
        const loadingP = document.createElement('p');
        loadingP.className = 'loading-placeholder';
        loadingP.textContent = 'Mengambil data...';
        elements.imagesContainer.appendChild(loadingP);
        clearContainer(elements.infoDetails);
    }
}

// EVENT LISTENER UNTUK MENGATUR PERUBAHAN URL SAAT CHAPTER DIMUAT
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.endpoint) {
        loadChapter(e.state.endpoint, true);
    }
});

// EVENT LISTENER UNTUK MEMUAT CHAPTER SAAT HALAMAN DIMUAT
document.addEventListener('DOMContentLoaded', () => {
    const endpointFromUrl = window.location.search.slice(1);
    const initialEndpoint = endpointFromUrl;
    window.history.replaceState({ endpoint: initialEndpoint }, '', `?${initialEndpoint}`);
    loadChapter(initialEndpoint, true);
});