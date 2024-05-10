document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        const emailInput = document.querySelector('.form__input[name="email"]');
        const passwordInput = document.querySelector('.form__input[name="password"]'); // Corrected "Password" to "password"

        const email = emailInput.value;
        const password = passwordInput.value;

        // Send POST request to backend for user authentication
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid username/password combination');
            }
            return response.json();
        })
        .then(data => {
            // Redirect or show success message after successful login
            console.log(data); // You can redirect to a new page or update UI as needed
        })
        .catch(error => {
            // Display error message to the user
            setFormMessage(loginForm, "error", error.message);
        });
    });
});
