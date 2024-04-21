function selectIcon(selectedImage) {
    // Remove 'selected' class from all images
    document.querySelectorAll('.profile-icon').forEach(icon => {
        icon.classList.remove('selected');
    });

    // Add 'selected' class to clicked image
    selectedImage.classList.add('selected');

    // Enable and change color of the submit button
    const submitButton = document.getElementById('submitButton');
    submitButton.classList.add('green');
    submitButton.disabled = false; // Enable the button

    // Prepare button to submit
    submitButton.onclick = function() {
        alert("You have selected " + selectedImage.alt + " as your profile icon.");
        window.location.href = 'account-confirmation.html'; // Redirect URL
    };
}