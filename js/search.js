// Contoh di dalam file js/search.js
const form = document.querySelector('.cari'); // atau bisa pakai ID

form.addEventListener('submit', function(event) {
  event.preventDefault(); // MENCEGAH halaman refresh/pindah
  
  // Panggil fungsi logika pencarian di sini
  lakukanPencarian(); 
});

function lakukanPencarian() {
  const kataKunci = document.getElementById('searchInput').value;
  
  console.log('Kata kunci pencarian:', kataKunci);
}

