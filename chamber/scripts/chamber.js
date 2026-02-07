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

// Weather
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

// OpenWeatherMap API key used for academic purposes only
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=19.4326&lon=-99.1332&units=imperial&appid=88ba847e6326c3cf45cf54bea1301e65';

async function apiFetch() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayResults(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `${Math.round(data.main.temp)}&deg;F`;

    const icon = data.weather[0].icon;
    const desc = data.weather[0].description;

    // Only replace the icon if the API returns one
    if (icon) {
        weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        weatherIcon.alt = desc;
    }

    captionDesc.textContent = desc.charAt(0).toUpperCase() + desc.slice(1);
}

if (currentTemp && weatherIcon && captionDesc) {
    apiFetch();
}

// 3-Day Forecast
// OpenWeatherMap API key used for academic purposes only
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=19.4326&lon=-99.1332&units=imperial&appid=88ba847e6326c3cf45cf54bea1301e65';

async function apiForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayForecast(data) {
    const forecastList = data.list;
    const dailyForecast = [];

    forecastList.forEach(item => {
        if (item.dt_txt.includes("12:00:00") && dailyForecast.length < 3) {
            dailyForecast.push(item);
        }
    });

    dailyForecast.forEach((day, index) => {
        const dayElement = document.querySelector(`#day${index + 1}`);

        const date = new Date(day.dt_txt);
        const temp = Math.round(day.main.temp);
        const icon = day.weather[0].icon;
        const desc = day.weather[0].description;

        dayElement.innerHTML = `
            <strong>${date.toLocaleDateString('en-US', { weekday: 'short' })}</strong><br>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" width="50" height="50"><br>
            ${temp}&deg;F<br>
            ${desc.charAt(0).toUpperCase() + desc.slice(1)}
        `;
    });
}

if (document.querySelector('#day1')) {
    apiForecast();
}

// Join Page Logic
// Timestamp for join form
const timestampField = document.getElementById('timestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}

// Membership modals
window.openModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) modal.showModal();
};

window.closeModal = (id) => {
    const modal = document.getElementById(id);
    if (modal) modal.close();
};

// const modals = {
//     np: document.getElementById('npModal'),
//     bronze: document.getElementById('bronzeModal'),
//     silver: document.getElementById('silverModal'),
//     gold: document.getElementById('goldModal')
// };

// // Expose functions globally (for inline onclick)
// window.openModal = (level) => {
//     modals[level]?.showModal();
// };

// window.closeModal = (level) => {
//     modals[level]?.close();
// };
