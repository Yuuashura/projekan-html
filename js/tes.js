const params = window.location.search.substring(1);
const komikData = {};
const baseApi = 'https://yuuashura-api.vercel.app';

fetch(baseApi + params)
    .then(response => response.json())
    .then(data => {
        komikData.title = data.title;
        komikData.alternativeTitle = data.alternativeTitle;
        komikData.sinopsis = data.sinopsis;
        komikData.genres = data.genres;
        komikData.info = data.info;
        komikData.chapters = data.chapters;
        komikData.thumbnail = data.thumbnail;
        populateData();
    });


function populateData() {
    // Kolom Kiri
    document.getElementById('thumbnail').src = komikData.thumbnail;
    document.getElementById('thumbnail').alt = komikData.title;

    const infoTable = document.getElementById('info-table');
    komikData.info.forEach(data => {
        const row = infoTable.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        cell1.textContent = key;
        console.log(komikData.info[key]);
        cell2.textContent = komikData.info[key];
    })
    

    // Kolom Kanan
    document.getElementById('title').textContent = komikData.title;
    document.getElementById('alternative-title').textContent = komikData.alternativeTitle;
    document.getElementById('synopsis').textContent = komikData.sinopsis;

    const genresContainer = document.getElementById('genres');
    komikData.genres.forEach(genre => {
        const span = document.createElement('span');
        span.className = 'genre-tag';
        span.textContent = genre;
        genresContainer.appendChild(span);
    });

    const chapterList = document.getElementById('chapter-list');
    komikData.chapters.forEach(chapter => {
        const chapterDiv = document.createElement('div');
        chapterDiv.className = 'chapter-item';

        const chapterLink = document.createElement('a');
        chapterLink.href = chapter.originalLink;
        chapterLink.textContent = chapter.title;
        chapterLink.target = '_blank'; // Buka di tab baru

        const chapterDate = document.createElement('span');
        chapterDate.className = 'chapter-date';
        chapterDate.textContent = chapter.date;

        chapterDiv.appendChild(chapterLink);
        chapterDiv.appendChild(chapterDate);
        chapterList.appendChild(chapterDiv);
    });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', populateData);
