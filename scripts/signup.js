var connection = new ActiveXObject("ADODB.Connection")
var connectionString = "Data Source = <localhost:3306>"


function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();

        setFormMessage(loginForm, "error", "Invalid username/password combination");
    });

    document.querySelectorAll(".form__input").forEach(inputElement => {
        inputElement.addEventListener("blur", e => {
            if (e.target.id === "signupUsername" && e.target.value.length > 0 && e.target.value.length < 10) {
                setInputError(inputElement, "Username must be at least 10 characters in length");
            }
        });

        inputElement.addEventListener("input", e => {
            clearInputError(inputElement);
        });
    });
});
function redirect_signup() {
    fetch('/signup', {
        method: 'GET',
        headers: {
            'Content-Type': 'text/html'
        }
    }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error))
}




// get the data from signup page
function getData() {
    const emailInput = document.querySelector('.form__input[name="Email"]');
    const firstNameInput = document.querySelector('.form__input[name="FName"]');
    const lastNameInput = document.querySelector('.form__input[name="Lname"]');
    const companyInput = document.querySelector('.form__input[name="Company"]');
    const passwordInput = document.querySelector('.form__input[name="Password"]');


    const email = emailInput.value;
    const firstName = firstNameInput.value;
    const lastName = lastNameInput.value;
    const company = companyInput.value;
    const password = passwordInput.value;
}