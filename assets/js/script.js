
// Simple carousel auto-change (for hero image placeholders)
let carouselIndex = 0;
const slides = document.querySelectorAll('.hero-slide');
function showSlide(i){
  slides.forEach(s=>s.style.display='none');
  if(slides[i]) slides[i].style.display='block';
}
function nextSlide(){
  carouselIndex = (carouselIndex+1) % slides.length;
  showSlide(carouselIndex);
}
if(slides.length>0){
  showSlide(0);
  setInterval(nextSlide, 4000);
}

// Product modal
function openProduct(id){
  const modal = document.getElementById('productModal');
  const data = window.PRODUCTS.find(p=>p.id===id);
  if(!data) return;
  document.getElementById('modalTitle').innerText = data.name;
  document.getElementById('modalImg').src = data.image;
  document.getElementById('modalDesc').innerText = data.desc;
  document.getElementById('modalNutrition').innerText = data.nutrition;
  document.getElementById('modalPrice').innerText = data.price;
  document.getElementById('modalWhatsapp').href = 'https://wa.me/6285246232785?text=Halo%20ForestDessert%2C%20saya%20mau%20pesan%20'+encodeURIComponent(data.name);
  modal.style.display = 'flex';
}
function closeModal(){ document.getElementById('productModal').style.display='none'; }

// Chart (nutrisi)
function renderChart(){
  const ctx = document.getElementById('nutrisiChart');
  if(!ctx) return;
  new Chart(ctx, {
    type:'bar',
    data:{
      labels:['Gula','Protein','Karbohidrat','Vitamin','Mineral'],
      datasets:[{label:'Kandungan per 100g',data:[12,5,30,10,8]}]
    },
    options:{responsive:true, maintainAspectRatio:false}
  });
}
document.addEventListener('DOMContentLoaded',()=>{
  renderChart();
  // mount products cards
  const grid = document.getElementById('productGrid');
  if(grid && window.PRODUCTS){
    grid.innerHTML = window.PRODUCTS.map(p=>`
      <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <div class="meta"><h3>${p.name}</h3><div class="price">${p.price}</div></div>
        <p style="color:#5a4a4a">${p.short}</p>
        <div class="actions">
          <button class="small-btn detail" onclick="openProduct(${p.id})">Detail</button>
          <a class="small-btn buy" href="${p.orderLink}" target="_blank">Order</a>
        </div>
      </div>`).join('');
  }
});

