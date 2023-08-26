var secretNumber = Math.floor(Math.random() * 100) + 1;
var attempts = 0;
var wrongAnswers = [];

function checkGuess() {
    var guessInput = document.getElementById('guess-input');
    var guess = parseInt(guessInput.value);
    var messageElement = document.getElementById('message');

    if (isNaN(guess)) {
        messageElement.textContent = "Invalid input. Please enter a valid number.";
    } else {
        attempts++;

        if (guess === secretNumber) {
            messageElement.textContent = "Congratulations! You guessed the number in " + attempts + " attempts.";
            guessInput.disabled = true;
        } else {
            var difference = Math.abs(guess - secretNumber);
            var message = "";

            if (difference <= 5) {
                message = "Very close! ";
            } else if (difference <= 10) {
                message = "Close! ";
            }

            if (guess < secretNumber) {
                message += "Low! Try again.";
            } else {
                message += "High! Try again.";
            }

            messageElement.textContent = message;
            wrongAnswers.push({ attempt: attempts, guess: guess });

            updateWrongAnswersTable();
        }

        guessInput.value = "";
        guessInput.focus();
    }
}

function updateWrongAnswersTable() {
    var table = document.getElementById('wrong-answers-table');

    // Clear existing rows
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Add new rows for wrong answers
    for (var i = 0; i < wrongAnswers.length; i++) {
        var row = table.insertRow();
        var attemptCell = row.insertCell();
        var guessCell = row.insertCell();

        attemptCell.textContent = wrongAnswers[i].attempt;
        guessCell.textContent = wrongAnswers[i].guess;
    }
}