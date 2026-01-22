// Responsive menu
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('navMenu');

menuBtn.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuBtn.textContent = nav.classList.contains('open') ? 'X' : '☰';
});

// Footer dates
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent =
    document.lastModified;