let userName = document.querySelector('#name');
let email = document.querySelector('#email');
let phone = document.querySelector('#phone');
let age = document.querySelector('#age');
let password = document.querySelector('#password');
let repassword = document.querySelector('#repassword');
let registerButton = document.querySelector('#submit');

userName.addEventListener('input', validateForm);
email.addEventListener('input', validateForm);
phone.addEventListener('input', validateForm);
age.addEventListener('input', validateForm);
password.addEventListener('input', validateForm);
repassword.addEventListener('input', validateForm);

function validateForm() {
    if (validateUserName() && validateEmail() && validatePhone() && validateAge() && validatePassword()) {
        registerButton.classList.remove('disabled');
    } else {
        registerButton.classList.add('disabled');
    }
}

if (registerButton) {
    registerButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent form submission for demonstration purposes
        register();
    });
}

function register() {
    if (validateUserName() && validateEmail() && validatePhone() && validateAge() && validatePassword()) {
        clearForm();
        registerButton.classList.remove('disabled');
    } else {
        registerButton.classList.add('disabled');
    }
}

function hideError(element) {
    let tooltipInstance = bootstrap.Tooltip.getInstance(element);
    if (tooltipInstance) {
        tooltipInstance.dispose();
    }
    element.removeAttribute('data-bs-original-title');
}

function clearForm() {
    userName.value = '';
    email.value = '';
    phone.value = '';
    age.value = '';
    password.value = '';
    repassword.value = '';
}

function showError(element, message) {
    element.setAttribute('data-bs-original-title', message);
    let tooltipInstance = bootstrap.Tooltip.getInstance(element);
    if (!tooltipInstance) {
        tooltipInstance = new bootstrap.Tooltip(element);
    }
    tooltipInstance.show();
}

function validateUserName() {
    let userNameValue = userName ? userName.value : '';
    if (!/^[a-zA-Z]{4,}$/.test(userNameValue)) {
        showError(userName, 'Username must be at least 4 letters long');
        return false;
    }
    hideError(userName);
    return true;
}

function validateEmail() {
    let emailValue = email ? email.value : '';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
        showError(email, 'Invalid email format');
        return false;
    }
    hideError(email);
    return true;
}

function validatePhone() {
    let phoneValue = phone ? phone.value : '';
    if (!/^01[0-2,5]{1}[0-9]{8}$/.test(phoneValue)) {
        showError(phone, 'Phone number must be in Egyptian format');
        return false;
    }
    hideError(phone);
    return true;
}

function validateAge() {
    let ageValue = age ? age.value : '';
    if (parseInt(ageValue) <= 11) {
        showError(age, 'Age must be more than 11');
        return false;
    }
    hideError(age);
    return true;
}

function validatePassword() {
    let passwordValue = password ? password.value : '';
    let repasswordValue = repassword ? repassword.value : '';
    if (passwordValue.length <= 6) {
        showError(password, 'Password must be more than 6 characters');
        return false;
    }

    if (passwordValue !== repasswordValue) {
        showError(repassword, 'Passwords do not match');
        return false;
    }
    hideError(password);
    hideError(repassword);
    return true;
}

// Initialize tooltips using Bootstrap's method
document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl);
});
