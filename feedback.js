document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('feedbackForm');
    if (!form) {
        console.error("Form not found on the page.");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('https://mazemirage-8df3b36e748f.herokuapp.com/submit-feedback', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Server response:", data);
            displayFeedbackMessage(data.message, data.status === 'success');
        })
        .catch(error => {
            console.error('Submission error:', error);
            displayFeedbackMessage("Failed to submit feedback. Please try again.", false);
        });
    });

    function displayFeedbackMessage(message, isSuccess) {
        const messageBox = document.getElementById('thank-you-message');
        if (!messageBox) {
            console.error("Thank you message box not found.");
            return;
        }
        messageBox.innerHTML = `<p>${message}</p>`;
        messageBox.style.color = isSuccess ? 'green' : 'red';
        messageBox.style.display = 'block';

        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 5000); // Optionally hide the message after 5 seconds
    }
});
