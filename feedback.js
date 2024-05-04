document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('feedbackForm');
    form.onsubmit = function(e) {
        e.preventDefault(); // Prevent default form submission
        const formData = new FormData(form);

        fetch('submit-feedback.php', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                displayFeedbackMessage(data.message, true);
            } else {
                displayFeedbackMessage(data.message, false);
            }
        })
        .catch(error => console.error('Error:', error));
    };

    function displayFeedbackMessage(message, isSuccess) {
        const messageBox = document.getElementById('feedback-message');
        messageBox.style.display = 'block';
        messageBox.innerHTML = `<p>${message}</p>`;
        messageBox.style.color = isSuccess ? 'green' : 'red'; // Change text color based on success or error

        // Show thank you message and hide feedback message
        const thankYouMessage = document.getElementById('thank-you-message');
        thankYouMessage.style.display = 'block';
        messageBox.style.display = 'none';

        // Optionally, hide the thank you message after some time
        setTimeout(() => {
            thankYouMessage.style.display = 'none';
        }, 5000); // 5000 milliseconds = 5 seconds
    }
});
