document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('feedbackForm');
    if (!form) {
        console.error("Form not found on the page.");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        displayFeedbackMessage();
        setTimeout(() => {
            location.reload(); // Refresh the page after 5 seconds
        }, 5000);
    });

    function displayFeedbackMessage() {
        const messageBox = document.getElementById('thank-you-message');
        if (messageBox) {
            messageBox.style.display = 'block';
        } else {
            console.error("Thank you message box not found.");
        }
    }
});
