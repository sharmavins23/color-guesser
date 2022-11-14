var totalCount = 0;
var countCorrect = 0;
var numGuesses = 0;
var currentColor = "#FF0000";

function checkGuess(id) {
    let target = document.getElementById(id);
    let colorGuessed = target.textContent || target.innerText;

    if (colorGuessed === currentColor) {
        onCorrectGuess();
        resetGameState();
    } else {
        onIncorrectGuess(target);
    }
}

function onCorrectGuess() {
    // Update the total count and the score
    totalCount += 3;
    countCorrect += (3 - numGuesses);

    // Update the score-value span with the new score
    let score = (countCorrect / totalCount) * 100;
    // Truncate this to 3 decimal points
    score = score.toFixed(3);
    let scoreValue = document.getElementById("score-value");

    scoreValue.textContent = score + "%";
    scoreValue.innerText = score + "%";

    // Reset the number of guesses
    numGuesses = 0;
}

function onIncorrectGuess(target) {
    // Add a class to the target called "wrong"
    target.classList.add("wrong");

    if (numGuesses < 2) {
        numGuesses++;
    }
}

function resetGameState() {
    // Reset the game state
    let html = document.getElementsByClassName("html")[0];
    let colorDiv = document.getElementById("color");
    let buttons = [
        document.getElementById("guess1"),
        document.getElementById("guess2"),
        document.getElementById("guess3")
    ];

    // Pick a random number between 0 and 2
    let correctButton = Math.floor(Math.random() * 3);

    // Generate three random colors
    let colors = [generateColor(), generateColor(), generateColor()];

    // Set all buttons to their colors
    for (let i = 0; i < 3; i++) {
        buttons[i].textContent = colors[i];
        buttons[i].innerText = colors[i];

        // Remove the "wrong" class from all buttons
        buttons[i].classList.remove("wrong");
    }

    // Set the correct color value to the color box
    currentColor = colors[correctButton];
    // Set the CSS background color of the color box to the correct color
    colorDiv.style.backgroundColor = currentColor;
}

// Generate a random hexadecimal color string
function generateColor() {
    let color = "#";
    for (let i = 0; i < 6; i++) {
        let digit = Math.floor(Math.random() * 16);
        color += digit.toString(16);
    }
    return color;
}