export async function fetchTechniques(container) {

    try {

        const res = await fetch("data/techniques.json");
        const data = await res.json();

        const fragment = document.createDocumentFragment();

        data.forEach(item => {

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${item.title}</h3>
                <p>Category: ${item.category}</p>
                <p>Duration: ${item.duration}</p>
                <p>Benefit: ${item.benefit}</p>
            `;

            fragment.appendChild(card);
        });

        container.appendChild(fragment);

    } catch (err) {
        console.error(err);
    }
}