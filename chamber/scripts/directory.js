// Members Directory
const membersContainer = document.querySelector('#members');
const gridBtn = document.querySelector('#gridView');
const listBtn = document.querySelector('#listView');

const spotlightContainer = document.querySelector('#spotlight-cards');
const url = 'data/members.json';

async function getMembersData() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        displayMembers(data.members);
        displaySpotlights(data.members);

    } catch (error) {
        console.error('Error loading members:', error);
    }
}

// Display members
function displayMembers(members) {
    if (!membersContainer) return;

    membersContainer.innerHTML = '';

    members.forEach((member, index) => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        card.innerHTML = `
            <img 
                src="images/${member.image}" 
                alt="${member.name} logo"
                ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
                width="160" 
                height="137"
            >
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p>Membership Level: ${member.membership}</p>
        `;

        membersContainer.appendChild(card);
    });
}

// Display Spotlights
function displaySpotlights(members) {
    if (!spotlightContainer) return;

    spotlightContainer.innerHTML = '';

    const eligible = members.filter(
        member => member.membership === 2 || member.membership === 3
    );

    const selected = eligible
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

    selected.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('spotlight-card');

        card.innerHTML = `
            <img 
                src="images/${member.image}" 
                alt="${member.name} logo"
                loading="lazy"
                width="160"
            >
            <h3>${member.name}</h3>
            <p>${member.description}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
            <p><strong>Membership:</strong> ${member.membership === 3 ? 'Gold' : 'Silver'}</p>
        `;

        spotlightContainer.appendChild(card);
    });
}

// View Toggles
if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
        membersContainer.classList.add('grid');
        membersContainer.classList.remove('list');
    });

    listBtn.addEventListener('click', () => {
        membersContainer.classList.add('list');
        membersContainer.classList.remove('grid');
    });
}

// Load Data
getMembersData();
