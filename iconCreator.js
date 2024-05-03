    const icons = [
        { src: "discoball.png", name: "Disco Ball", description: "Shine bright on the dance floor!" },
        { src: "discobear.png", name: "Disco Bear", description: "Get down with your bad self!" },
        { src: "discobird.png", name: "Disco Bird", description: "Flying high to the rhythm!" },
        { src: "discobird2.png", name: "Disco Bird 2", description: "Grooving on the wings of music!" },
        { src: "discodeer.png", name: "Disco Deer", description: "Prancing on the disco square!" },
        { src: "discogiraffe.png", name: "Disco Giraffe", description: "Reaching new heights of fun!" },
        { src: "discolion.png", name: "Disco Lion", description: "Roaring through the night!" },
        { src: "discominitiger.png", name: "Disco Mini Tiger", description: "Small but mighty on the dance floor!" },
        { src: "discootter.png", name: "Disco Otter 1", description: "Sliding into the discotheque!" },
        { src: "discootter2.png", name: "Disco Otter 2", description: "More fun, more waves!" },
        { src: "discotiger.png", name: "Disco Tiger", description: "Stalking the beats!" },
        { src: "discowolf.png", name: "Disco Wolf", description: "Howling to the disco ball!" },
        { src: "discobird3.png", name: "Disco Bird 3", description: "Third time's the charm!" },
        { src: "discocat.png", name: "Disco Cat", description: "Purring to the groovy tunes!" },
        { src: "discoporc.png", name: "Disco Porcii", description: "Snouting up the dance floor!" },
        { src: "discoflamingo.png", name: "Disco Flamingo", description: "Standing out with one leg up!" }
    ];
    let currentIconIndex = 0; // Index of the currently displayed icon

    // Function to update the icon display
    function updateIconDisplay() {
        const iconImage = document.getElementById('iconImage');
        const iconName = document.getElementById('iconName');
        const iconDetails = document.getElementById('iconDetails');
    
        const icon = icons[currentIconIndex];
        iconImage.src = icon.src;
        iconImage.alt = icon.name;
        iconName.textContent = icon.name;
        iconDetails.textContent = icon.description;
    }
    
    // Function to cycle through icons
    function cycleIcon(direction) {
        currentIconIndex += direction;
        if (currentIconIndex >= icons.length) {
            currentIconIndex = 0; // Loop back to the first icon if index exceeds length
        } else if (currentIconIndex < 0) {
            currentIconIndex = icons.length - 1; // Loop to the last icon if index goes below 0
        }
        updateIconDisplay();
    }
    
    document.addEventListener("DOMContentLoaded", function() {
        updateIconDisplay(); // Initialize the display with the first icon
    });
    document.addEventListener("DOMContentLoaded", function() {
        const iconImage = document.getElementById('iconImage');
        const submitButton = document.getElementById('submitButton');
    
        // Function to show the selected icon with a green border
        function confirmIconSelection() {
            iconImage.classList.add('confirmed-icon');
            // Delay redirect to allow user to see the confirmation
            setTimeout(function() {
                window.location.href = 'accountconfirmationpage.html';  // Change this to your actual confirmation page URL
            }, 2000);  // Adjust delay as needed, 2000 milliseconds = 2 seconds
        }
    
        // Event listener for the submit button
        submitButton.addEventListener('click', function() {
            confirmIconSelection();
        });
    });
    