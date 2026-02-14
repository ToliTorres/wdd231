import { places } from "../data/discover.mjs";

const container = document.getElementById("discoverCards");

places.forEach(place => {

    const card = document.createElement("article");
    card.classList.add("discover-card");

    card.innerHTML = `
<h2>${place.name}</h2>
<figure>
<img src="${place.image}" alt="${place.name}" loading="lazy">
</figure>
<address>${place.address}</address>
<p>${place.description}</p>
<button>Learn More</button>
`;

    container.appendChild(card);

});


// LAST VISIT MESSAGE
const visitMsg = document.getElementById("visitMessage");

const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
    visitMsg.textContent = "Welcome! Let us know if you have any questions.";
}
else {

    const diffDays = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (diffDays < 1) {
        visitMsg.textContent = "Back so soon! Awesome!";
    }
    else if (diffDays === 1) {
        visitMsg.textContent = "You last visited 1 day ago.";
    }
    else {
        visitMsg.textContent = `You last visited ${diffDays} days ago.`;
    }

}

localStorage.setItem("lastVisit", now);
