(function () {
    var form = document.getElementById('login-form');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var emailError = document.getElementById('email-error');
    var passwordError = document.getElementById('password-error');
    var formMessage = document.getElementById('form-message');
    var submitBtn = document.getElementById('submit-btn');

    var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function clearErrors() {
        emailError.textContent = '';
        passwordError.textContent = '';
        emailInput.classList.remove('input-error');
        passwordInput.classList.remove('input-error');
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }

    function validateEmail(value) {
        if (!value.trim()) {
            return 'Email address is required.';
        }
        if (!EMAIL_REGEX.test(value.trim())) {
            return 'Please enter a valid email address.';
        }
        return '';
    }

    function validatePassword(value) {
        if (!value) {
            return 'Password is required.';
        }
        if (value.length < 8) {
            return 'Password must be at least 8 characters.';
        }
        return '';
    }

    function validate() {
        var emailMsg = validateEmail(emailInput.value);
        var passwordMsg = validatePassword(passwordInput.value);

        if (emailMsg) {
            emailError.textContent = emailMsg;
            emailInput.classList.add('input-error');
        }
        if (passwordMsg) {
            passwordError.textContent = passwordMsg;
            passwordInput.classList.add('input-error');
        }

        return !emailMsg && !passwordMsg;
    }

    function setLoading(loading) {
        submitBtn.disabled = loading;
        submitBtn.textContent = loading ? 'Signing in...' : 'Sign In';
    }

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
    }

    /* Inline re-validation clears errors as the user types */
    emailInput.addEventListener('input', function () {
        if (emailError.textContent) {
            var msg = validateEmail(emailInput.value);
            emailError.textContent = msg;
            emailInput.classList.toggle('input-error', !!msg);
        }
    });

    passwordInput.addEventListener('input', function () {
        if (passwordError.textContent) {
            var msg = validatePassword(passwordInput.value);
            passwordError.textContent = msg;
            passwordInput.classList.toggle('input-error', !!msg);
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();

        if (!validate()) {
            return;
        }

        setLoading(true);

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailInput.value.trim(),
                password: passwordInput.value
            })
        })
        .then(function (response) {
            return response.json().then(function (data) {
                return { ok: response.ok, status: response.status, data: data };
            });
        })
        .then(function (result) {
            if (result.ok) {
                showMessage('Login successful! Redirecting\u2026', 'success');
                setTimeout(function () {
                    window.location.href = (result.data && result.data.redirect)
                        ? result.data.redirect
                        : 'index.html';
                }, 1000);
            } else {
                var errorMsg = (result.data && result.data.message)
                    ? result.data.message
                    : 'Invalid email or password. Please try again.';
                showMessage(errorMsg, 'error');
            }
        })
        .catch(function () {
            showMessage('Unable to connect. Please check your connection and try again.', 'error');
        })
        .finally(function () {
            setLoading(false);
        });
    });
}());
