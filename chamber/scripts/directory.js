const membersContainer = document.querySelector('#members');
const gridBtn = document.querySelector('#gridView');
const listBtn = document.querySelector('#listView');

const url = 'data/members.json';

async function getMembers() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.members);
}

function displayMembers(members) {
    membersContainer.innerHTML = '';

    members.forEach(member => {
        const card = document.createElement('section');
        card.classList.add('member-card');

        card.innerHTML = `
        <img src="images/${member.image}" alt="${member.name}" loading="lazy" loading="lazy" fetchpriority="high">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
        <p>Membership Level: ${member.membership}</p>
        `;

        membersContainer.appendChild(card);
    });
}

// Toggle views
gridBtn.addEventListener('click', () => {
    membersContainer.classList.add('grid');
    membersContainer.classList.remove('list');
});

listBtn.addEventListener('click', () => {
    membersContainer.classList.add('list');
    membersContainer.classList.remove('grid');
});

getMembers();
