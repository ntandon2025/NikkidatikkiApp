document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('feedbackForm');
    if (!form) {
        console.error("Feedback form not found on the page.");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);

        // Optional: Log the FormData values for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        // Specify your Heroku backend endpoint
        const endpoint = 'https://mazemirage-8df3b36e748f.herokuapp.com/submit-feedback';

        fetch(endpoint, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            displayFeedbackMessage(data.message, data.status === 'success');
        })
        .catch(error => {
            console.error('Error:', error);
            displayFeedbackMessage("Failed to submit feedback. Please try again.", false);
        });
    });

    function displayFeedbackMessage(message, isSuccess) {
        const messageBox = document.getElementById('thank-you-message');
        if (!messageBox) {
            console.error("Message box element not found on the page.");
            return;
        }
        messageBox.innerHTML = `<p>${message}</p>`;
        messageBox.style.color = isSuccess ? 'green' : 'red';
        messageBox.style.display = 'block';

        setTimeout(() => {
            messageBox.style.display = 'none';
        }, 5000); // Hide message after 5 seconds
    }
});
