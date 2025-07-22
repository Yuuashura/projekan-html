const params = window.location.search.substring(1);
const baseApi = "https://yuuashura-api.vercel.app"

async function getKomik() {
    const response = await fetch(`${baseApi}${params}`);
    const data = await response.json();
    console.log(data);
    
}


addEventListener('DOMContentLoaded', () => {
    getKomik();
});