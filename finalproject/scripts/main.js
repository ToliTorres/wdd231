import { fetchTechniques } from "./fetchdata.js";
import { saveFavorite } from "./storage.js";
import { setupModal } from "./modal.js";


const quoteEl = document.querySelector("#quote");
const saveBtn = document.querySelector("#saveQuote");
const container = document.querySelector("#techniquesContainer");

// MENU
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");

if (toggle && nav) {
    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        nav.classList.toggle("show");
    });
}

// LOAD QUOTE (only if exists)
async function loadQuote() {

    if (!quoteEl) return;

    try {
        const res = await fetch("data/techniques.json");
        const data = await res.json();
        quoteEl.textContent = data[0].title;

    } catch (error) {
        console.error("Quote error:", error);
    }
}

loadQuote();

// SAVE FAVORITE
if (saveBtn && quoteEl) {
    saveBtn.addEventListener("click", () => {
        saveFavorite(quoteEl.textContent);
    });
}

// LOAD TECHNIQUES
if (container) {
    fetchTechniques(container);
}

// MODAL
setupModal();

// Timer
const timerBtn = document.querySelector("#startTimer");
const display = document.querySelector("#timerDisplay");
const selector = document.querySelector("#timeSelector");

let interval;

// Sound
const sound = new Audio();
sound.src = "sound/breathing.mp3";
sound.preload = "auto";

function updateDisplay(timeValue) {
    const minutes = Math.floor(timeValue / 60);
    const seconds = timeValue % 60;

    display.textContent =
        `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

// Initial
updateDisplay(selector?.value || 900);

timerBtn?.addEventListener("click", async () => {

    try {
        await sound.play();
        sound.pause();
        sound.currentTime = 0;
    } catch (err) {
        console.log("Audio permission error:", err);
    }

    clearInterval(interval);

    let time = Number(selector.value);
    updateDisplay(time);

    interval = setInterval(() => {

        time--;
        updateDisplay(time);

        if (time <= 0) {
            clearInterval(interval);

            sound.currentTime = 0;
            sound.play().catch(err => console.log(err));
        }

    }, 1000);
});