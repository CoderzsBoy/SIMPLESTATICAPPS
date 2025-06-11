let boxes = document.querySelectorAll(".boxes"); // Use querySelectorAll for NodeList
let turnX = true;

const winningPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Function to disable all boxes after a win
function disableBoxes() {
    boxes.forEach(box => box.style.pointerEvents = "none"); // Prevent further clicks
}

// Function to reset the game
function resetGame() {
    boxes.forEach(box => {
        box.innerText = ""; // Clear board
        box.style.pointerEvents = "auto"; // Enable clicks again
    });
    turnX = true;
}

// Function to check the winner
function checkWinner() {
    for (let pattern of winningPatterns) {
        const [a, b, c] = pattern;
        if (
            boxes[a].innerText !== "" &&
            boxes[a].innerText === boxes[b].innerText &&
            boxes[a].innerText === boxes[c].innerText
        ) {
            setTimeout(() => {
                alert("Winner is " + boxes[a].innerText);
                disableBoxes(); // Disable board after win
            }, 500);
            return;
        }
    }
}

// Function to handle turns
function changeTurn() {
    if (this.innerText === "") {
        this.innerText = turnX ? "X" : "O";
        turnX = !turnX;
        setTimeout(checkWinner, 500); // Slight delay before checking the winner
    }
}

// Attach event listeners to boxes
boxes.forEach(box => box.addEventListener("click", changeTurn));

// Add a reset button (Optional)
document.getElementById("reset").addEventListener("click", resetGame);
