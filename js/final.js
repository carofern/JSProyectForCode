let numSquares = 6;
let colors = [];
let pickedColor;
let score = 0;

let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#colorDisplay");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let scoreDisplay = document.querySelector("#scoreDisplay");
let resetPressed = true;

init();

function init() {
    colorDisplay.textContent = pickedColor;
    setupSquares();
    setupMode();
    reset();
}

resetButton.addEventListener("click", function() {
    reset();
});


// Generador de color RGB aleatorio
function makeColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// Crear y pushear cantidad de colores asignados a un array
function genRandomColors(num) {
    let randomColor = [];
    for (let i = 0; i < num; i += 1) {
        randomColor.push(makeColor());
    }
    return randomColor;
}

// Cambia color de fondo de cuadrados y título al del color correcto cuando se elige.
function changeColors(color) {
    for (let i = 0; i < squares.length; i += 1) {
        squares[i].style.backgroundColor = color;
        h1.style.backgroundColor = color;
    }
}

// Elige color ganador
function chooseColor() {
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

// Prepara los cuadrados con los colores randomizados
function setupSquares() {
    for (let i = 0; i < squares.length; i++) {
        squares[i].style.backgroundColor = colors[i];
        squares[i].addEventListener("click", function() {
            let clickedColor = this.style.backgroundColor;
            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "Correcto!";
                resetButton.textContent = "Jugar de vuelta";
                changeColors(pickedColor);
                if (resetPressed) {
                    score += 5;
                    resetPressed = false;
                }
                scoreDisplay.textContent = score;
                localStorage.setItem('userScore', score);
            } else {
                this.style.backgroundColor = "#232323";
                messageDisplay.textContent = "Intenta de nuevo";
                score--;
                scoreDisplay.textContent = score;
            }
        });
    }
}

// Resetea la pantalla de victoria al default
function reset() {
    resetPressed = true;
    colors = genRandomColors(numSquares);
    pickedColor = chooseColor();
    colorDisplay.textContent = pickedColor;
    h1.style.backgroundColor = "#d1d2cd";
    resetButton.textContent = "Reiniciar colores";
    messageDisplay.textContent = "";
    for (let i = 0; i < squares.length; i += 1) {
        if (colors[i]) {
            squares[i].style.display = "block";
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
}

// Cambia la dificultad del juego agregando o quitando cuadrados
function setupMode() {
    for (let i = 0; i < modeButtons.length; i++) {
        modeButtons[i].addEventListener("click", function() {
            for (let i = 0; i < modeButtons.length; i += 1) {
                modeButtons[i].classList.remove("selected");
            }
            this.classList.add("selected");
            if (this.textContent === "Facil") {
                numSquares = 3;
            } else if (this.textContent === "Normal") {
                numSquares = 6
            } else {
                numSquares = 9;
            }
            reset();
        });
    }
}


// Función que trae el puntaje guardado en el storage al finalizar el cargado de la página
function loadPoints() {
    const value = localStorage.getItem('userScore');
    score = value || 0;
    scoreDisplay.textContent = score;
}