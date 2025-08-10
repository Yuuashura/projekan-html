const params = window.location.search.substring(1);

const baseApi = "https://yuuashura-api.vercel.app";
const apiComment = "https://komentar2.vercel.app/api/komentar";
const komikData = {};
const mainCOntainer = document.querySelector(".main-container");
const aside = document.querySelector("aside");
const header = document.querySelector("header");
const containerSearch = document.querySelector(".cari");
const theme = document.querySelector("#theme");
const comment = document.querySelector("#comment");
const name = document.querySelector("#name");
const submitComment = document.querySelector("#submitComment");
const containerSending = document.querySelector(".procces-sending");
const commentContainer = document.querySelector("#comment-list");
const divSmiliar = document.querySelector('.similar-comic-list');
const sending = proccesSending();
const suksesSending = createSuccessMessage();
const failedSending = createFailedMessage();

let bool = 0;


    // ===================  SEARCH  ====================
    containerSearch.addEventListener('submit', function (event) {
        event.preventDefault();
        lakukanPencarian();
    });
    function lakukanPencarian() {
        const kataKunci = document.getElementById('searchInput').value.trim();
        window.location.href = `search.html?q=${encodeURIComponent(kataKunci)}`;
        console.log('Kata kunci pencarian:', kataKunci);
    }
    //=====================================================================




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
// ======================================================================



// MENGAMBIL DATA KOMIK DARI API ========================================
async function getData() {
  mainCOntainer.appendChild(createLoader());
  try {
    const response = await fetch(`${baseApi}${params}`);
    const data = await response.json();
    komikData.thumbnail = data.thumbnail;
    komikData.info = data.info;
    komikData.alternativeTitle = data.alternativeTitle;
    komikData.sinopsis = data.sinopsis;
    komikData.genres = data.genres;
    komikData.chapters = data.chapters;
    komikData.title = data.title;
    komikData.similiar = data.similarKomik;
    mainCOntainer.removeChild(document.querySelector(".loader"));
    getComment();
    leftData();
    rightData();
    createSimilarComicCard();
  } catch (error) {
    console.log("error response", error);
  }
}


// DATA YANG KIRI JIKA DI WINDOWS
function leftData() {
  //left column
  const leftColumn = document.createElement("div");
  leftColumn.className = "left-column";
  const thumb = document.createElement("img");
  thumb.className = "thumbnail";
  thumb.src = komikData.thumbnail;
  thumb.alt = komikData.title;
  const infoTitle = document.createElement("h2");
  infoTitle.textContent = "Informasi Komik";
  const infoContainer = document.createElement("div");
  infoContainer.className = "info-details-container";
  infoContainer.id = "info-details";
  mainCOntainer.appendChild(leftColumn);
  leftColumn.appendChild(thumb);
  leftColumn.appendChild(infoTitle);
  leftColumn.appendChild(infoContainer);
  for (const key in komikData.info) {
    const infoItem = document.createElement("div");
    infoItem.className = "info-item";
    const label = document.createElement("span");
    label.className = "label";
    label.textContent = key;
    const value = document.createElement("span");
    value.className = "value";
    value.textContent = komikData.info[key];
    infoItem.appendChild(label);
    infoItem.appendChild(value);
    infoContainer.appendChild(infoItem);
  }
}


// DATA YANG KANAN JIKA DI WINDOWS
function rightData() {
  // Kolom Kanan
  const rightCulumn = document.createElement("div");
  rightCulumn.className = "right-column";
  const title = document.createElement("h1");
  title.id = "title";
  title.textContent = komikData.title;
  const alternativeTittle = document.createElement("h3");
  alternativeTittle.id = "alternative-title";
  alternativeTittle.textContent = komikData.alternativeTitle;
  const genresContainer = document.createElement("div");
  genresContainer.className = "genres";
  genresContainer.id = "genres";
  const synopsisTitle = document.createElement("h2");
  synopsisTitle.textContent = "Sinopsis";
  const synopsis = document.createElement("p");
  synopsis.id = "synopsis";
  synopsis.className = "synopsis";
  synopsis.textContent = komikData.sinopsis;
  const chapterTitle = document.createElement("h2");
  chapterTitle.textContent = "Daftar Chapter";
  const chapterList = document.createElement("div");
  chapterList.id = "chapter-list";

  // MEMASUKKAN SEMUA DATA
  mainCOntainer.appendChild(rightCulumn);
  rightCulumn.appendChild(title);
  rightCulumn.appendChild(alternativeTittle);
  rightCulumn.appendChild(genresContainer);
  rightCulumn.appendChild(synopsisTitle);
  rightCulumn.appendChild(synopsis);
  rightCulumn.appendChild(chapterTitle);
  rightCulumn.appendChild(chapterList);

  // print genre
  komikData.genres.forEach((genre) => {
    const span = document.createElement("span");
    span.className = "genre-tag";
    span.textContent = genre;
    genresContainer.appendChild(span);
  });

  //SEMUA CHAPTER
  komikData.chapters.forEach((chapter) => {
    const chapterDiv = document.createElement("div");
    chapterDiv.className = "chapter-item";
    const chapterLink = document.createElement("a");
    chapterLink.href = `baca-chapter.html?${chapter.apiLink}`;
    chapterLink.textContent = chapter.title;
    chapterLink.target = "_blank";
    const chapterDate = document.createElement("span");
    chapterDate.className = "chapter-date";
    chapterDate.textContent = chapter.date;
    chapterDiv.appendChild(chapterLink);
    chapterDiv.appendChild(chapterDate);
    chapterList.appendChild(chapterDiv);
  });
}


// Membuat elemen loader
function createLoader() {
  const loader = document.createElement("div");
  loader.className = "loader";
  return loader;
}

// MENGAMBIL KOMENTAR DARI API
async function getComment() {
  commentContainer.appendChild(createLoader());
  console.log(commentContainer);

  const response = await fetch(apiComment);
  const data = await response.json();
  console.log(data);
  let i = 0;
  data.forEach((item) => {
    const nama = item.email;
    const komentar = item.komentar;
    const timestamp = item.id;

    
    const tanggal = new Date(timestamp);
    const data = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const dateFormatted = tanggal.toLocaleDateString("id-ID", data);
  
    console.log(nama, dateFormatted, komentar);
    const commentItem = document.createElement("div");
    commentItem.className = "comment-item";
    const commentHeader = document.createElement("div");
    commentHeader.className = "comment-header";
    const commentAuthor = document.createElement("span");
    commentAuthor.className = "comment-author";
    commentAuthor.textContent = nama;
    const commentDate = document.createElement("span");
    commentDate.className = "comment-date";
    commentDate.textContent = dateFormatted;
    const commentText = document.createElement("p");
    commentText.className = "comment-text";
    commentText.textContent = komentar;
    commentHeader.appendChild(commentAuthor);
    commentHeader.appendChild(commentDate);
    commentItem.appendChild(commentHeader);
    commentItem.appendChild(commentText);
    commentContainer.appendChild(commentItem);
  });
  commentContainer.removeChild(document.querySelector(".loader"));
}

// MEMBUAT CARD SMILIAR KOMIK DAN MEMASUKKAN KE DOM
function createSimilarComicCard() {
  komikData.similiar.forEach((k) => {
  const cardLink = document.createElement('a');
  cardLink.className = 'card-link';
  cardLink.href = `detail-komik.html?${k.apiLink}`;
  const card = document.createElement('div');
  card.className = 'card';
  const logoContainer = document.createElement('div');
  logoContainer.className = 'logo-komik';
  const thumbnailImage = document.createElement('img');
  thumbnailImage.src = k.thumbnail;
  thumbnailImage.alt = `Sampul ${k.title}`;
  const descriptionContainer = document.createElement('div');
  descriptionContainer.className = 'deskripsi-komik';
  const titleHeader = document.createElement('h3');
  titleHeader.textContent = k.title;
  const tagInfo = document.createElement('p');
  tagInfo.className = 'tag-info';
  tagInfo.textContent = `${k.genres} - ${k.type} - ${k.views}`;
  const synopsis = document.createElement('p');
  synopsis.className = 'synopsis';
  synopsis.textContent = k.synopsis;
  logoContainer.appendChild(thumbnailImage);
  descriptionContainer.appendChild(titleHeader);
  descriptionContainer.appendChild(tagInfo);
  descriptionContainer.appendChild(synopsis);
  card.appendChild(logoContainer);
  card.appendChild(descriptionContainer);
  cardLink.appendChild(card);
  divSmiliar.appendChild(cardLink);
})
}
// =================================================


// MENGAMBIL NAMA USER DARI LOCAL STORAGE
let jsonData = localStorage.getItem('user');
let nama = JSON.parse(jsonData)?.username;
if (nama){
  name.value = nama;
  name.disabled = true;
  name.style.cursor = "not-allowed";
}
// =================================================

// KODE UNTUK POST KOMENTAR KE API
document
  .querySelector(".comment-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      email: name.value,
      komentar: comment.value,
    };

    try {
      containerSending.appendChild(sending);
      const res = await fetch(apiComment, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if(!nama){
        name.value = "";
        comment.value = "";
      }else{
        name.value = nama;
        comment.value = "";
      }

      if (!res.ok) {

        containerSending.textContent = "";
        containerSending.appendChild(failedSending);
        setTimeout(() => {
          containerSending.removeChild(failedSending);
        }, 3000);
        throw new Error("Gagal mengirim komentar.");
      } else {
        containerSending.textContent = "";
        containerSending.appendChild(suksesSending);
        const allCommentItems =
          commentContainer.querySelectorAll(".comment-item");
        allCommentItems.forEach((item) => {
          commentContainer.removeChild(item);
        });
        getComment();
        console.log("sukses");
        setTimeout(() => {
          containerSending.removeChild(suksesSending);
        }, 3000);
      }
    } catch (err) {
      console.log(err);
    }
  });


// =================================================



// KODE UNTUK MENAMPILKAN PROSES SENDING KOMENTAR
function proccesSending() {
  const sendingContainer = document.createElement("div");
  sendingContainer.className = "sending";
  sendingContainer.id = "sending";
  const sendingText = document.createElement("span");
  sendingText.textContent = "";
  const loadingDotsContainer = document.createElement("div");
  loadingDotsContainer.className = "loading-dots";
  for (let i = 0; i < 3; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    loadingDotsContainer.appendChild(dot);
  }
  sendingContainer.appendChild(sendingText);
  sendingContainer.appendChild(loadingDotsContainer);
  return sendingContainer;
}
// =================================================


// KODE UNTUK MENAMPILKAN PESAN SUKSES
function createSuccessMessage() {
  const successContainer = document.createElement("div");
  successContainer.className = "sending";
  successContainer.id = "success";
  const successText = document.createElement("span");
  successText.textContent = "Komentar Berhasil Dikirim";
  successText.style.color = "lightgreen";
  successContainer.appendChild(successText);
  return successContainer;
}
// =================================================


// KODE UNTUK MENAMPILKAN PESAN GAGAL
function createFailedMessage() {
  const successContainer = document.createElement("div");
  successContainer.className = "sending";
  successContainer.id = "success";
  const successText = document.createElement("span");
  successText.textContent = "Komentar Gagal Dikirim";
  successText.style.color = "red";
  successContainer.appendChild(successText);
  return successContainer;
}
// =================================================



document.addEventListener("DOMContentLoaded", () => {
  initMobileNavigation();
  getData();
});