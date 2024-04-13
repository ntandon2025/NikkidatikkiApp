document.addEventListener("DOMContentLoaded", function() {
    const shapeSelect = document.getElementById('shapeSelect');
    const eyesSelect = document.getElementById('eyesSelect');
    const mouthSelect = document.getElementById('mouthSelect');
    const previewButton = document.getElementById('previewButton');
    const playerIconPreview = document.getElementById('playerIconPreview');
    const submitButton = document.getElementById('submitButton');


    function createIconComponent(className, parent) {
        const component = document.createElement('div');
        component.className = className;
        parent.appendChild(component);
    }

    function updateIconPreview() {
        playerIconPreview.innerHTML = ''; // Clear previous icon

        // Create shape
        const shapeClass = `icon-shape ${shapeSelect.value}`;
        if (shapeSelect.value) {
            createIconComponent(shapeClass, playerIconPreview);
        }

        // Create eyes within shape
        const eyesClass = `icon-eyes ${eyesSelect.value}`;
        if (eyesSelect.value) {
            createIconComponent(eyesClass, playerIconPreview);
        }

        // Create mouth within shape
        const mouthClass = `icon-mouth ${mouthSelect.value}`;
        if (mouthSelect.value) {
            createIconComponent(mouthClass, playerIconPreview);
        }

        playerIconPreview.style.display = 'block'; // Show the preview
    }

    previewButton.addEventListener('click', updateIconPreview);

function checkSelections() {
    // Check if all selections have been made
    if (shapeSelect.value && eyesSelect.value && mouthSelect.value) {
        submitButton.classList.add('green');
        submitButton.disabled = false; // Enable the button if it was disabled
    } else {
        submitButton.classList.remove('green');
        submitButton.disabled = true; // Optionally disable the button if not all selections are made
    }
}

// Event listeners to check selections whenever any dropdown changes
[shapeSelect, eyesSelect, mouthSelect].forEach(select => {
    select.addEventListener('change', checkSelections);
});

submitButton.addEventListener('click', function() {
    // Redirect to the account confirmation page
    window.location.href = 'accountconfirmationpage.html';
});

// Initial check in case values are pre-selected or persisted
checkSelections();
});