// Read URL Parameters
const params = new URLSearchParams(window.location.search);

const fields = [
    'fname',
    'lname',
    'email',
    'phone',
    'business',
    'timestamp'
];

fields.forEach(field => {
    const element = document.getElementById(field);
    if (element) {
        let value = params.get(field);

        // Optional: format timestamp nicely
        if (field === 'timestamp' && value) {
            value = new Date(value).toLocaleString();
        }

        element.textContent = value ?? '—';
    }
});

// Back Button
function goBack() {
    window.history.back();
}