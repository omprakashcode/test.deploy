/**
 * Login page - Email and Password validation
 */

const loginForm = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');

// Email validation - RFC 5322 compliant regex (simplified for common cases)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password validation rules
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REQUIRE_UPPERCASE = true;
const PASSWORD_REQUIRE_LOWERCASE = true;
const PASSWORD_REQUIRE_NUMBER = true;

function validateEmail(email) {
    const trimmed = email.trim();
    if (!trimmed) {
        return 'Email is required';
    }
    if (!emailRegex.test(trimmed)) {
        return 'Please enter a valid email address (e.g. user@example.com)';
    }
    return '';
}

function validatePassword(password) {
    if (!password) {
        return 'Password is required';
    }
    if (password.length < PASSWORD_MIN_LENGTH) {
        return `Password must be at least ${PASSWORD_MIN_LENGTH} characters`;
    }
    if (PASSWORD_REQUIRE_UPPERCASE && !/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter';
    }
    if (PASSWORD_REQUIRE_LOWERCASE && !/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter';
    }
    if (PASSWORD_REQUIRE_NUMBER && !/\d/.test(password)) {
        return 'Password must contain at least one number';
    }
    return '';
}

function showError(element, message, inputElement) {
    element.textContent = message;
    element.style.display = message ? 'block' : 'none';
    if (inputElement) {
        inputElement.classList.toggle('error', !!message);
    }
}

function validateForm() {
    const emailMsg = validateEmail(emailInput.value);
    const passwordMsg = validatePassword(passwordInput.value);

    showError(emailError, emailMsg, emailInput);
    showError(passwordError, passwordMsg, passwordInput);

    return !emailMsg && !passwordMsg;
}

// Real-time validation on blur
emailInput.addEventListener('blur', function () {
    const msg = validateEmail(emailInput.value);
    showError(emailError, msg, emailInput);
});

passwordInput.addEventListener('blur', function () {
    const msg = validatePassword(passwordInput.value);
    showError(passwordError, msg, passwordInput);
});

// Form submission
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Validation passed - in a real app this would send to a backend
    alert('Login successful! (Demo - no backend configured)');
});
