const params = window.location.search.substring(1);
const baseApi = "https://yuuashura-api.vercel.app"
let chapters = []
let chapter1st = []
let chapter2nd = []
let genre = []
let info = []
let komikSerupa = []
let title;
let description;
let thumbnail;

async function getKomik() {
    const response = await fetch(`${baseApi}${params}`);
    const data = await response.json();


    console.log(data);
    
    description = data.sinopsis;
    title = data.title;
    chapters = data.chapters;
}


addEventListener('DOMContentLoaded', () => {
    getKomik();
});