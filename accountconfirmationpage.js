document.addEventListener("DOMContentLoaded", function() {
    const confirmBtn = document.querySelector('.confirm-btn');
    const dynamicContent = document.getElementById('dynamicContent');
    const creationDateSpan = document.getElementById('creationDate');

    function confirmAccount() {
        const userConfirmed = confirm("Are you sure you want to confirm your account? You will not be able to make changes once the account is created.");
        if (userConfirmed) {
            dynamicContent.innerHTML = '<p>Account confirmed! Welcome to the Mirage.</p><button id="enterMirageButton">Enter the Mirage</button>';
            document.getElementById('enterMirageButton').addEventListener('click', enterTheMirage);
            confirmBtn.style.display = 'none';
        }
    }

    function enterTheMirage() {
        window.location.href = 'home.html';
    }

    function displayCreationDate() {
        const currentDate = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        creationDateSpan.textContent = currentDate.toLocaleDateString('en-US', options);
    }

    displayCreationDate();
    confirmBtn.addEventListener('click', confirmAccount);

});