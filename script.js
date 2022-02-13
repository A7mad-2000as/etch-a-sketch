const BLACK_MODE = 0;
const RANDOM_MODE = 1;
const GRADIENT_MODE = 2;

let currentMode = BLACK_MODE;

const screen = document.querySelector(".screen");
const screenStyles = window.getComputedStyle(screen);
let screenSize;

const resetButton = document.querySelector(".reset-section > button");
resetButton.addEventListener("click", resetGrid);

const buttons = document.querySelectorAll(".control-buttons > button");
buttons.forEach(button => button.addEventListener("click", changeMode));

window.addEventListener("load", () => {
    screenSize = Number(screenStyles.getPropertyValue("width").slice(0, -2));
    drawGrid(16)
});

function drawGrid(gridSize) {
    let innerSquareSize = screenSize / gridSize;

    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            const innerSquare = document.createElement("div");
            innerSquare.style.width = `${innerSquareSize}px`;
            innerSquare.style.height = `${innerSquareSize}px`;
            innerSquare.style.backgroundColor = "rgb(255, 255, 255)"; // Must use rgb notation to remain compatable with the gradient implmenetation
            innerSquare.addEventListener("mouseover", colorSquare);
            screen.appendChild(innerSquare);
        }
    }
}

function colorSquare(e) {
    const square = e.target;

    if (currentMode === BLACK_MODE) {
        square.style.backgroundColor = "rgb(0, 0, 0)"; // Must use rgb notation to remain compatable with the gradient implmenetation
    }

    else if (currentMode === RANDOM_MODE) {
        let randomRed = Math.floor(Math.random() * 256);
        let randomGreen = Math.floor(Math.random() * 256);
        let randomBlue = Math.floor(Math.random() * 256);

        square.style.backgroundColor = `rgb(${randomRed}, ${randomGreen}, ${randomBlue})`;
    }

    else if (currentMode === GRADIENT_MODE) {
        let currentColor = extractColorsFromRgbString(square.style.backgroundColor);

        let currentRed = currentColor[0];
        let currentGreen = currentColor[1];
        let currentBlue = currentColor[2];

        square.style.backgroundColor = `rgb(${currentRed - 25.6}, ${currentGreen - 25.6}, ${currentBlue - 25.6})`; // add 10% of blackness to the color
    }

    else {
        console.error("ERROR: Invalid Mode");
    }
}

// Return the equivalent number array of a color in the rgb format "rgb('xxx', 'xxx', 'xxx')" 
function extractColorsFromRgbString(rgbString) {
    let color = rgbString.slice(4).split(", ");
    color[2] = color[2].slice(0, -1) // the last color has an extra ')' attached to it

    return color.map(component => Number(component));
} 

function resetGrid() {

    let newGridSize = prompt("Please enter the new grid size: (between 16 and 100)", 16);
    let validInput;
    do {
        if (newGridSize === null) {
            return;
        }
    
        else if (isNaN(newGridSize) || newGridSize === "" || Number(newGridSize) < 16 || Number(newGridSize) > 100) {
            validInput = false;
            newGridSize = prompt("Please enter a valid number between 16 and 100: ", 16);
        }
        else {
            validInput = true;
        }
    } while (!validInput)

    screen.innerHTML = "";
    drawGrid(Number(newGridSize));
}

function changeMode(e) {
    const button = e.target;

    if (button.textContent.toUpperCase() === "BLACK") {
        currentMode = BLACK_MODE;
    }

    else if (button.textContent.toUpperCase() === "RANDOM") {
        currentMode = RANDOM_MODE;
    }

    else if (button.textContent.toUpperCase() === "GRADIENT") {
        currentMode = GRADIENT_MODE;
    }

    else {
        console.error("ERROR: Invalid Mode");
    }
}