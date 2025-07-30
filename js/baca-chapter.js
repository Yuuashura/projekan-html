const API_BASE_URL = 'https://yuuashura-api.vercel.app';

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

function clearContainer(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

function loadChapter(apiEndpoint, isPopState = false) {
    setLoadingState(true);
    window.scrollTo(0, 0);

    fetch(API_BASE_URL + apiEndpoint)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            buildPage(data);
            if (!isPopState) {
                const newUrl = `?${apiEndpoint}`;
                const newTitle = data.chapterInfo.Judul;
                window.history.pushState({ endpoint: apiEndpoint }, newTitle, newUrl);
            }
            // Panggil setLoadingState(false) di akhir blok sukses
            setLoadingState(false);
        })
        .catch(error => {
            console.error("Fetch error:", error);
            clearContainer(elements.imagesContainer);
            const errorP = document.createElement('p');
            errorP.className = 'loading-placeholder';
            errorP.style.color = '#ff6464';
            errorP.textContent = 'Gagal memuat chapter. Silakan coba lagi.';
            elements.imagesContainer.appendChild(errorP);
            elements.title.textContent = "Gagal Memuat";
            // Panggil juga setLoadingState(false) di akhir blok error
            setLoadingState(false);
        });
}

function buildPage(data) {
    document.title = data.chapterInfo.Judul;
    elements.title.textContent = data.chapterInfo.Judul;

    clearContainer(elements.infoDetails);
    const descP = document.createElement('p');
    const descStrong = document.createElement('strong');
    descStrong.textContent = 'Deskripsi: ';
    descP.appendChild(descStrong);
    descP.appendChild(document.createTextNode(data.description));

    const rilisP = document.createElement('p');
    const rilisStrong = document.createElement('strong');
    rilisStrong.textContent = 'Tanggal Rilis: ';
    rilisP.appendChild(rilisStrong);
    rilisP.appendChild(document.createTextNode(data.chapterInfo['Tanggal Rilis']));
    
    elements.infoDetails.appendChild(descP);
    elements.infoDetails.appendChild(rilisP);
    
    clearContainer(elements.imagesContainer);
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

function updateNavigation(navData, mangaInfo) {
    [elements.top.all, elements.bottom.all].forEach(btn => btn.href = `detail-komik.html?param=${mangaInfo.slug}`);
    updateNavButton(elements.top.prev, navData.prevChapter);
    updateNavButton(elements.bottom.prev, navData.prevChapter);
    updateNavButton(elements.top.next, navData.nextChapter);
    updateNavButton(elements.bottom.next, navData.nextChapter);
}

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

window.addEventListener('popstate', (e) => {
    if (e.state && e.state.endpoint) {
        loadChapter(e.state.endpoint, true);
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const endpointFromUrl = window.location.search.slice(1);
    const initialEndpoint = endpointFromUrl || '/baca-chapter/martial-peak/1';
    
    window.history.replaceState({ endpoint: initialEndpoint }, '', `?${initialEndpoint}`);
    
    loadChapter(initialEndpoint, true);
});