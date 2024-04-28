
    document.addEventListener("DOMContentLoaded", function() {
        const gamertag = document.getElementById('gamertag');
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const signupForm = document.getElementById('signupForm');
        const showCriteriaButton = document.getElementById('showCriteriaButton');
        const criteriaInfo = document.getElementById('criteriaInfo');
    
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
    
        // Update UI error messages
        function updateErrorMessages() {
            validateGamertag();
            validatePassword();
            validateConfirmPassword();
        }
    
        // Event listeners for real-time validation
        gamertag.addEventListener('input', validateGamertag);
        password.addEventListener('input', validatePassword);
        confirmPassword.addEventListener('input', validateConfirmPassword);
    
        // Toggle password criteria information
        showCriteriaButton.addEventListener('click', function() {
            if (criteriaInfo.style.display === "none" || !criteriaInfo.style.display) {
                criteriaInfo.style.display = "block";
                showCriteriaButton.textContent = "Hide Criteria";
            } else {
                criteriaInfo.style.display = "none";
                showCriteriaButton.textContent = "Show Criteria";
            }
        });
    
        // Form submission
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault();
            // Validate all fields
            const isGamertagValid = validateGamertag();
            const isPasswordValid = validatePassword();
            const isConfirmPasswordValid = validateConfirmPassword();
    
            // Check if all validations are true
            if (isGamertagValid && isPasswordValid && isConfirmPasswordValid) {
                // Data is valid, proceed to submit the form
                fetch('/.netlify/functions/create-account', {
                    method: 'POST',
                    body: JSON.stringify({
                        gamertag: gamertag.value,
                        password: password.value // Make sure to hash passwords in the function
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
                    // Redirect to another page or show a success message
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            } else {
                // Data is not valid, do not submit the form
                // Error messages would already be visible from the validation functions
                console.error('Validation failed.');
            }
        });
    });
    