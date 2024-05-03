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

    // Toggle password visibility
    toggleButton.addEventListener('click', function() {
        let isPasswordShown = password.type === 'password';
        password.type = confirmPassword.type = isPasswordShown ? 'text' : 'password';
        toggleButton.textContent = isPasswordShown ? 'Hide' : 'Show';
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
            continueButton.style.backgroundColor = "green"; // Set button color to green
            continueButton.disabled = false; // Enable the button if all validations pass
        } else {
            continueButton.style.backgroundColor = ""; // Reset to default
            continueButton.disabled = true; // Disable the button if validation fails
        }
    }

    // Real-time validation
    gamertag.addEventListener('input', updateButtonStyle);
    password.addEventListener('input', updateButtonStyle);
    confirmPassword.addEventListener('input', updateButtonStyle);

    // Form submission handling
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        if (validateGamertag() && validatePassword() && validateConfirmPassword() && !continueButton.disabled) {
            // Assuming you have a server endpoint set up correctly
            fetch('/.netlify/functions/create-account', {
                method: 'POST',
                body: JSON.stringify({
                    gamertag: gamertag.value,
                    password: password.value // Ensure passwords are hashed on the server
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                window.location.href = 'iconcreationpage.html'; // Redirect on success
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        } else {
            console.error('Validation failed.');
            continueButton.style.backgroundColor = ""; // Reset to default
            continueButton.disabled = true; // Keep the button disabled if not valid
        }
    });
});
