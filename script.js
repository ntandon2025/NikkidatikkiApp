document.getElementById('usernameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var username = document.getElementById('username').value;
    if(username) {
        document.getElementById('gameLinks').style.display = 'block';
        // You can also do more with the username, like storing it for later use
    }
});
document.addEventListener("DOMContentLoaded", function() {
    const starlightBackground = document.querySelector('.starlight-background');
    const stars = 100; // Adjust the number of stars here
    const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange']; // Disco colors

    for (let i = 0; i < stars; i++) {
        let star = document.createElement('div');
        star.className = 'star';
        star.style.top = Math.random() * 100 + '%';
        star.style.left = Math.random() * 100 + '%';

        // Assign random color from the array
        let colorIndex = Math.floor(Math.random() * colors.length);
        star.style.backgroundColor = colors[colorIndex];

        starlightBackground.appendChild(star);
    }
});
function togglePasswordVisibility() {
    var passwordInput = document.getElementById('password');
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        event.target.textContent = 'Hide';
    } else {
        passwordInput.type = 'password';
        event.target.textContent = 'Show';
    }
}
