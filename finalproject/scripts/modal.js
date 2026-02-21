export function setupModal() {

    const modal = document.querySelector("#exerciseModal");
    const openBtn = document.querySelector("#openModal");
    const closeBtn = document.querySelector("#closeModal");

    if (modal && openBtn) {
        openBtn.addEventListener("click", () => modal.showModal());
    }

    if (modal && closeBtn) {
        closeBtn.addEventListener("click", () => modal.close());
    }
}