document.addEventListener("DOMContentLoaded", function() {
    const gamertag = document.getElementById('gamertag');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const continueButton = document.getElementById('continueButton');

    const gamertagError = document.getElementById('gamertagError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    function validateGamertag() {
        const regex = /^[A-Za-z\d]{5,12}$/;
        const hasThreeNumbers = /\d{3,}/.test(gamertag.value);
        if (!regex.test(gamertag.value) || !hasThreeNumbers) {
            gamertagError.textContent = "Gamertag must be 5-12 characters including 3 numbers.";
            return false;
        } else {
            gamertagError.textContent = "";
            return true;
        }
    }

    function validatePassword() {
        const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,12}$/;
        if (!regex.test(password.value)) {
            passwordError.textContent = "Password must be 5-12 characters with at least 1 uppercase letter and 1 number.";
            return false;
        } else {
            passwordError.textContent = "";
            return true;
        }
    }

    function validateConfirmPassword() {
        if (password.value !== confirmPassword.value) {
            confirmPasswordError.textContent = "Passwords do not match.";
            return false;
        } else {
            confirmPasswordError.textContent = "";
            return true;
        }
    }

    function updateContinueButtonState() {
        if (validateGamertag() && validatePassword() && validateConfirmPassword()) {
            continueButton.classList.add('active');
        } else {
            continueButton.classList.remove('active');
        }
    }

    gamertag.addEventListener('input', updateContinueButtonState);
    password.addEventListener('input', updateContinueButtonState);
    confirmPassword.addEventListener('input', updateContinueButtonState);
});
document.addEventListener("DOMContentLoaded", function() {
    const showCriteriaButton = document.getElementById('showCriteriaButton');
    const criteriaInfo = document.getElementById('criteriaInfo');

    showCriteriaButton.addEventListener('click', function() {
        if (criteriaInfo.style.display === "none" || !criteriaInfo.style.display) {
            criteriaInfo.style.display = "block";
            showCriteriaButton.textContent = "Hide Criteria";
        } else {
            criteriaInfo.style.display = "none";
            showCriteriaButton.textContent = "Show Criteria";
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const continueButton = document.getElementById('continueButton');

    continueButton.addEventListener('click', function() {
        // Check if the button is in the active (green) state
        if (continueButton.classList.contains('active')) {
            // Redirect to the player icon creation page
            window.location.href = 'iconcreationpage.html';
        } else {
            // Optionally alert the user to correct the form
            alert('Please ensure all criteria are met before continuing.');
        }
    });
});
document.getElementById('skipButton').addEventListener('click', function() {
    window.location.href = 'home.html'; // Direct to the home page 
});
