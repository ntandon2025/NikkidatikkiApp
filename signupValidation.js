document.addEventListener("DOMContentLoaded", function() {
    const gamertag = document.getElementById('gamertag');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const gamertagError = document.getElementById('gamertagError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const signupForm = document.getElementById('signupForm');
    const continueButton = document.getElementById('continueButton');
    const toggleButton = document.getElementById('togglePassword');
    const showCriteriaButton = document.getElementById('showCriteriaButton');
    const criteriaInfo = document.getElementById('criteriaInfo');

    // Toggle password visibility
    toggleButton.addEventListener('click', function() {
        const isPasswordShown = password.type === 'password';
        password.type = confirmPassword.type = isPasswordShown ? 'text' : 'password';
        toggleButton.textContent = isPasswordShown ? 'Hide' : 'Show';
    });

    // Show/Hide criteria popup
    showCriteriaButton.addEventListener('click', function() {
        criteriaInfo.style.display = criteriaInfo.style.display === 'block' ? 'none' : 'block';
    });

    // Validation functions
    function validateGamertag() {
        const regex = /^[A-Za-z\d]{5,12}$/;
        const hasThreeNumbers = /\d{3,}/.test(gamertag.value);
        gamertagError.textContent = !regex.test(gamertag.value) || !hasThreeNumbers
            ? "Gamertag must be 5-12 characters including 3 numbers."
            : "";
        return regex.test(gamertag.value) && hasThreeNumbers;
    }

    function validatePassword() {
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,12}$/;
        passwordError.textContent = !regex.test(password.value)
            ? "Password must be 5-12 characters with at least 1 uppercase letter and 1 number."
            : "";
        return regex.test(password.value);
    }

    function validateConfirmPassword() {
        confirmPasswordError.textContent = password.value !== confirmPassword.value
            ? "Passwords do not match."
            : "";
        return password.value === confirmPassword.value;
    }

    function updateButtonStyle() {
        if (validateGamertag() && validatePassword() && validateConfirmPassword()) {
            continueButton.style.backgroundColor = "green";
            continueButton.disabled = false;
        } else {
            continueButton.style.backgroundColor = "";
            continueButton.disabled = true;
        }
    }

    gamertag.addEventListener('input', updateButtonStyle);
    password.addEventListener('input', updateButtonStyle);
    confirmPassword.addEventListener('input', updateButtonStyle);

    // Handle form submission
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateGamertag() && validatePassword() && validateConfirmPassword()) {
            // Redirect to icon creation page
            window.location.href = 'iconcreationpage.html';
        } else {
            console.error('Validation failed.');
        }
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const continueButton = document.getElementById('continueButton');
    const gamertag = document.getElementById('gamertag');
    const password = document.getElementById('password');
    const iconSelect = document.getElementById('iconSelect'); // Ensure this is the dropdown or input field for selecting an icon

    continueButton.addEventListener('click', function() {
        const userGamertag = gamertag.value;
        const userPassword = password.value; // Storing password just for the transition, this should be handled securely
        const userIcon = iconSelect.value;
        
        localStorage.setItem('gamertag', userGamertag);
        localStorage.setItem('password', userPassword); // Consider security implications
        localStorage.setItem('icon', userIcon);

        window.location.href = 'accountConfirmation.html'; // Redirect to the confirmation page
    });
});
