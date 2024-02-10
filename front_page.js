document.getElementById('createButton').addEventListener('click', function() {
    // Get the values entered by the user
    let levelTime = parseInt(document.getElementById('levelTime').value);
    let breakTime = parseInt(document.getElementById('breakTime').value);

    if (isNaN(levelTime) || levelTime <= 0) {
        alert('Please enter a valid time for the level.');
        return; // Stop execution if level time is not provided
    }

    // Redirect to the main page with the selected values as query parameters
    window.location.href = `index.html?levelTime=${levelTime}&breakTime=${breakTime}`;
});
