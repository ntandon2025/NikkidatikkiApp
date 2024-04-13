function togglePasswordVisibility() {
    const passwordSpan = document.getElementById('password');
    const isHidden = passwordSpan.innerText === '••••••••';
    passwordSpan.innerText = isHidden ? 'password123' : '••••••••'; // Toggle visibility
}

function confirmAccount() {
    const userConfirmed = confirm("Are you sure you want to confirm your account? You will not be able to make changes once the account is created.");
    if (userConfirmed) {
        // User confirmed, show the Enter the Mirage message
        const dynamicContent = document.getElementById('dynamicContent');
        dynamicContent.innerHTML = `
            <p>Account confirmed! Welcome to the Mirage.</p>
            <button onclick="enterTheMirage()">Enter the Mirage</button>
        `;
        // Optionally, hide the confirm button to prevent repeated clicks
        document.querySelector('.confirm-btn').style.display = 'none';
    }
}

function enterTheMirage() {
    // Redirect to the main page or show additional content
    window.location.href = 'home.html'; // Adjust the URL to your main page
}
