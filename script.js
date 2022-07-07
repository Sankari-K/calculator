let backgroundFrame = document.querySelector(".frame");
const backgroundStyle = getComputedStyle(backgroundFrame);

let themeToggle = document.querySelector("input");
const toggleStyle = getComputedStyle(themeToggle);

let buttons = document.querySelectorAll("button");
let operatorButtons = document.querySelectorAll(".sh");

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return +((a / b).toFixed(2));
}

function operate(operator, num1, num2) {
    let res;
    switch(operator) {
        case '+':
            res = add(num1, num2);
            break;
        case '-':
            res = subtract(num1, num2);
            break;
        case '*':
            res = multiply(num1, num2);
            break;
        case '/':
            res = divide(num1, num2);
            break;
    }
    return res;
}

themeToggle.addEventListener('click', function() {
    // Change color of calculator 
    backgroundFrame.style.backgroundColor = backgroundStyle.backgroundColor == "rgb(255, 255, 255)" ? 
    "rgb(85, 90, 96)" : "rgb(255, 255, 255)"; 
    // Change picture of theme toggle
    themeToggle.style.background = toggleStyle.background.includes("moon") ? 
    'rgba(0, 0, 0, 0) url("http://127.0.0.1:5500/images/sun.png") no-repeat scroll 4px 5px / 30px 30px padding-box border-box' :
    'rgba(0, 0, 0, 0) url("http://127.0.0.1:5500/images/moon.png") no-repeat scroll 4px 5px / 30px 30px padding-box border-box';
    // Change button color - the numeric normal ones
    buttons = [...buttons];
    buttons.forEach((button) => {
        const buttonStyle = getComputedStyle(button);
        button.style.backgroundColor = buttonStyle.backgroundColor === "rgb(255, 255, 255)" ?
         "rgb(85, 90, 96)" : 
         "rgb(255, 255, 255)";
    })
    // Change background color for operator buttons
    operatorButtons = [...operatorButtons];
    operatorButtons.forEach((button) => {
        const opButtonStyle = getComputedStyle(button);
        console.log(opButtonStyle.backgroundColor, backgroundFrame.style.backgroundColor);
        if (backgroundFrame.style.backgroundColor === "rgb(85, 90, 96)") {
            button.style.backgroundColor = "rgb(108, 106, 99)";
        }
        else {
            button.style.backgroundColor = "rgb(227, 233, 236)";
        }
    }) 
    
})