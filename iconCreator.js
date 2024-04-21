document.addEventListener("DOMContentLoaded", function() {
    // Get all icons and the submit button from the page
    const icons = document.querySelectorAll('.profile-icon');
    const submitButton = document.getElementById('submitButton');

    // Initially disable the submit button
    submitButton.disabled = true;

    // Function to handle icon click events
    icons.forEach(icon => {
        icon.onclick = function() {
            // Remove 'selected' class from all icons
            icons.forEach(img => img.classList.remove('selected'));
            // Add 'selected' class to clicked icon
            this.classList.add('selected');
            // Enable and update the submit button
            submitButton.disabled = false;
            submitButton.classList.remove('red');
            submitButton.classList.add('green');
        };
    });

    // Setup submit button click event
    submitButton.onclick = function() {
        if (!this.disabled) {
            const selectedIcon = document.querySelector('.profile-icon.selected');
            alert("You have selected " + selectedIcon.alt + " as your profile icon.");
            window.location.href = 'accountconfirmationpage.html'; // Change to your desired URL
        }
    };
});