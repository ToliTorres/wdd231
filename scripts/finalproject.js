// NAVIGATION
function initNav() {
    const btn = document.querySelector('#menuBtn');
    const nav = document.querySelector('#navMenu');

    if (btn && nav) {
        btn.addEventListener('click', () => {
            nav.classList.toggle('open');
        });
    }
}


// MODAL
function initModal() {
    const modal = document.querySelector('#modal');
    const close = document.querySelector('#closeModal');

    if (close && modal) {
        close.addEventListener('click', () => modal.close());
    }
}

function openModal(html) {
    const modal = document.querySelector('#modal');
    const content = document.querySelector('#modalContent');

    if (modal && content) {
        content.innerHTML = html;
        modal.showModal();
    }
}


// QUOTES FETCH
async function loadQuotes() {
    try {
        const res = await fetch('./data/quotes.json');
        const data = await res.json();

        const random = data[Math.floor(Math.random() * data.length)];
        const quoteEl = document.querySelector('#quoteText');

        if (quoteEl) {
            quoteEl.textContent = random.quote;
        }

    } catch (err) {
        console.error('Quote load error', err);
    }
}


// TECHNIQUES FETCH + RENDER
async function loadTechniques() {
    try {
        const res = await fetch('./data/techniques.json');
        const data = await res.json();

        const container = document.querySelector('#techniquesContainer');
        if (!container) return;

        container.innerHTML = data.map(item => `
        <div class="card">
            <h3>${item.name}</h3>
            <p>${item.benefit}</p>
            <button data-id="${item.id}">View</button>
        </div>
        `).join('');

        // Events
        container.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', e => {
                const id = e.target.dataset.id;
                const selected = data.find(t => t.id == id);

                if (selected) {
                    openModal(`
                        <h2>${selected.name}</h2>
                        <p>${selected.description}</p>
                        <p><strong>Duration:</strong> ${selected.duration}</p>
                    `);
                }
            });
        });

    } catch (err) {
        console.error('Technique load error', err);
    }
}


// APP INIT (REQUIRED TRY/CATCH ASYNC)
window.addEventListener('DOMContentLoaded', async () => {
    try {
        initNav();
        initModal();
        await loadQuotes();
        await loadTechniques();
    } catch (err) {
        console.error('Initialization error', err);
    }
});