// Initialize game variables
let lives = 3; // Number of attempts the player has
let score = 0; // Player's score
const colorOptions = []; // Array to hold color options for the player to choose from

// Get references to DOM elements
const rgbDisplay = document.getElementById('rgb-value'); // Element to display the RGB value
const colorOptionsContainer = document.getElementById('color-options'); // Container for color options
const resultDisplay = document.getElementById('result'); // Element to display the result of the guess
const livesDisplay = document.getElementById('lives'); // Element to display remaining lives
const replayButton = document.getElementById('replay-button'); // Button to replay the game

// Function to start the game
function startGame() {
    lives = 3; // Reset lives
    score = 0; // Reset score
    replayButton.classList.add('hidden'); // Hide the replay button at the start
    updateLivesDisplay(); // Update the lives display
    nextRound(); // Start the first round
}

// Function to generate a random RGB color
function getRandomColor() {
    const r = Math.floor(Math.random() * 256); // Random red value
    const g = Math.floor(Math.random() * 256); // Random green value
    const b = Math.floor(Math.random() * 256); // Random blue value
    return `rgb(${r}, ${g}, ${b})`; // Return the RGB color string
}

// Function to generate color options for the player to choose from
function generateColorOptions(correctColor) {
    colorOptions.length = 0; // Clear the existing color options
    colorOptions.push(correctColor); // Add the correct color to the options

    // Generate random colors until we have 3 options
    while (colorOptions.length < 3) {
        const randomColor = getRandomColor(); // Get a random color
        if (!colorOptions.includes(randomColor)) { // Ensure it's not a duplicate
            colorOptions.push(randomColor); // Add the random color to the options
        }
    }

    // Shuffle the color options
    colorOptions.sort(() => Math.random() - 0.5);
}

// Function to update the display of remaining lives
function updateLivesDisplay() {
    livesDisplay.textContent = `you got ${lives} tries left bucko`; // Update the text to show remaining lives
}

// Function to handle the player's guess
function handleGuess(selectedColor, correctColor) {
    if (selectedColor === correctColor) { // Check if the guess is correct
        score++; // Increment score for a correct guess
        resultDisplay.textContent = "nice!!! :D"; // Display success message
    } else {
        lives--; // Decrement lives for an incorrect guess
        resultDisplay.textContent = "wrong!! :C"; // Display failure message
        updateLivesDisplay(); // Update the lives display
    }

    // Check if the player has run out of lives
    if (lives === 0) {
        endGame(); // End the game if no lives are left
    } else {
        nextRound(); // Proceed to the next round if lives remain
    }
}

// Function to end the game
function endGame() {
    rgbDisplay.textContent = ""; // Clear the RGB display
    colorOptionsContainer.innerHTML = ""; // Clear the color options
    resultDisplay.textContent = `your score is ${score}!! you win....nothing :P do you wanna try again?`; // Display final score
    livesDisplay.textContent = ""; // Clear the lives display
    replayButton.classList.remove('hidden'); // Show the replay button
}

// Function to start the next round of the game
function nextRound() {
    const correctColor = getRandomColor(); // Get a new random color for this round
    rgbDisplay.textContent = `${correctColor}`; // Display the RGB value to guess
    generateColorOptions(correctColor); // Generate color options including the correct color

    colorOptionsContainer.innerHTML = ""; // Clear previous color options

    // Create color option elements and add them to the container
    colorOptions.forEach(color => {
        const colorOption = document.createElement('div'); // Create a new div for the color option
        colorOption.classList.add('color-option'); // Add class for styling
        colorOption.style.backgroundColor = color; // Set the background color
        colorOption.addEventListener('click', () => handleGuess(color, correctColor)); // Add click event to handle guesses
        colorOptionsContainer.appendChild(colorOption); // Append the color option to the container
    });
}

// Event listener for the replay button to restart the game
replayButton.addEventListener('click', startGame); // When the replay button is clicked, the game restarts
startGame(); // Initialize the game when the script loads