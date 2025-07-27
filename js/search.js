// Contoh di dalam file js/search.js
const form = document.querySelector('.cari'); // atau bisa pakai ID

form.addEventListener('submit', function(event) {
  event.preventDefault(); // MENCEGAH halaman refresh/pindah
  
  lakukanPencarian(); 
});

function lakukanPencarian() {
  const kataKunci = document.getElementById('searchInput').value.trim();
  console.log('Kata kunci pencarian:', kataKunci);
}

