// Define variables for certain elements of DOM
let backgroundFrame = document.querySelector(".frame");
const backgroundStyle = getComputedStyle(backgroundFrame);

let themeToggle = document.querySelector("input");
const toggleStyle = getComputedStyle(themeToggle);

let buttons = document.querySelectorAll("button");
let numberButtons = document.querySelectorAll(".num");
let operatorButtons = document.querySelectorAll(".sh");
let unaryButtons = document.querySelectorAll(".unary");

let html = document.querySelector('html');
let htmlStyle = getComputedStyle(html);

let display = document.querySelector('.display');
let displayStyle = getComputedStyle(display);
let displayFlag = false;

let clear = document.querySelector("#clear");

// These are the values that user inputs
let num1 = '';
let num2 = '';
let operator = ''; 

// Flag to check if this is the first time the user types
let firstTime = true;
// Flag to know whether the input is from the keyboard 
let keyInputFlag = false;

// Event listeners for all 3 types of buttons
numberButtons.forEach((button) =>
    button.addEventListener('click', getNumInput));

operatorButtons.forEach((button) =>
    button.addEventListener('click', getOperatorInput));

unaryButtons.forEach((button) =>
    button.addEventListener('click', getUnaryInput));

// In case a number key is pressed
function getNumInput(e) {
    // To prevent the calculator from losing it's shape
    if (display.innerText.length >= 17) {
        window.alert("Overflow! The calculator can't solve such large calculations :(");
        clearAllElements();
    } 
    if (firstTime || display.innerText == '0') {
        cleanUpDisplay();
        firstTime = false;
    }

    // If a number is pressed right after a calculation (a = is pressed), clear data and proceed with new calculation
    if (operatorPressed == '=') {   
        display.innerText = '';
        num1 = '';
        operatorPressed = ''; 
    }
    // For keyboard functionality 
    let keyPressed;
    if (keyInputFlag) {
        keyPressed = e;
        keyInputFlag = false;
    }
    else {
        keyPressed = e.composedPath()[0].innerText; // of type string
    }
    
    // To know whether the input number belongs to num1 or num2
    if (!operator) {
        if (isSmall(num1) && isValidDecimal(keyPressed, num1)) {   
            num1 += keyPressed;
            display.innerText += keyPressed;
        }     
    }
    else {
        if (isSmall(num2) && isValidDecimal(keyPressed, num2)) {
            num2 += keyPressed;
            display.innerText += keyPressed;
        } 
    }
}

let operatorPressed;
function getOperatorInput(e) {   // If it is +,  -, /, or * operators
    // To prevent the calculator from losing it's shape
    if (display.innerText.length > 17) {
        window.alert("Overflow! The calculator can't solve such large calculations :(");
        clearAllElements();
    } 

    // For keyboard functionality 
    if (keyInputFlag) {
        operatorPressed = e;
        keyInputFlag = false;
    }
    else {
        operatorPressed = e.composedPath()[0].innerText;
    }

    if (operatorPressed != "=") {
        if (operator != '') { // If an operator was pressed already, evaluate that previous expression first
            // If num2 ain't defined, just switch the operator
            if (!num2) {
                operator = operatorPressed;
            }
            display.innerText = '';
            num1 = operate(operator, num1, num2);
            if (num1 == Infinity || num1 == NaN) {
                window.alert("That's a math error -_-");
                clearAllElements();
                display.innerText = '';
                return;
            }
            num2 = '';
            display.innerText += num1;
        } 
        operator = operatorPressed;
        display.innerText += operator;
    }
    else { 
        if (num1 && num2) { // If both numbers are defined, proceed with evaluation
            display.innerText = operate(operator, num1, num2);
            if (display.innerText == Infinity || display.innerText == NaN) {
                window.alert("That's a math error -_-");
                clearAllElements();
                display.innerText = '';
                return;
            }
            operator = '';
            num1 = display.innerText; // DIsplaying the result, and assigning it to num1 for next calculation
            num2 = '';
        }
        else {
            clearAllElements();
        }
    }
}

function getUnaryInput(e) {
    // For keyboard support
    let unaryOperatorPressed;
    if (keyInputFlag) {
        unaryOperatorPressed = e;
        keyInputFlag = false;
    }
    else {
        unaryOperatorPressed = e.composedPath()[0].innerText;
    }

    if (unaryOperatorPressed == '%') {
        if (operator) {
            // Replace last instance of num (in display text) with 0.01 times that
            let n = display.innerText.lastIndexOf(num2);
            display.innerText = display.innerText.slice(0, n) + display.innerHTML.slice(n).replace(num2, num2/100);
            num2 = num2/100;
        }
        else {
            num1 = num1/100;
            display.innerText = num1;
        }
    }
    else {
        if (operator) {
            // Replace last instance of num (in display text) with -1 times that
            let n = display.innerText.lastIndexOf(num2);
            display.innerText = display.innerText.slice(0, n) + display.innerHTML.slice(n).replace(num2, -1 * num2);
            num2 = -1 * num2;
        }
        else {
            num1 = -1 * num1;
            display.innerText = num1;
        }
    }
}

// Helper functions
function cleanUpDisplay() {
    display.innerText = '';
}

clear.addEventListener('click', clearAllElements);

function clearAllElements() {
    cleanUpDisplay();
    num1 = '';
    num2 = '';
    operator = '';
    display.innerText = '0';
    operatorPressed = ''; 
}

// Such a condition is being checked to prevent overflow of calculator
function isSmall(n) { 
    return n.length < 8;
}

// Should not be like 5.67.8
function isValidDecimal(key, num) {
    return !(key == '.' && num.includes("."));
}


// Functions for actual calculations
function add(a, b) {
    return +((a + b).toFixed(4));
}

function subtract(a, b) {
    return +((a - b).toFixed(4));
}

function multiply(a, b) {
    return +((a * b).toFixed(4));
}

function divide(a, b) {
    return +((a / b).toFixed(4));
}

function operate(operator, num1, num2) {
    let res;
    num1 = +num1;
    num2 = +num2;
    switch(operator) {
        case '+':
            res = add(num1, num2);
            break;
        case '-':
            res = subtract(num1, num2);
            break;
        case 'x':
            res = multiply(num1, num2);
            break;
        case '/':
            res = divide(num1, num2);
            break;
    }
    return res;
}


// Light and dark mode toggle
themeToggle.addEventListener('click', function() {
    // Change color of calculator 
    backgroundFrame.style.backgroundColor = backgroundStyle.backgroundColor == "rgb(209, 172, 165)" ? 
    "rgb(89, 83, 88)" : "rgb(209, 172, 165)"; 
    // frame's box shadow??

    // Display portion's color and bg color
    display.style.color = displayStyle.color == "rgb(255, 255, 255)" ?
    "rgb(164, 172, 150)": "rgb(255, 255, 255)";
    display.style.backgroundColor = displayStyle.backgroundColor == "rgba(255, 255, 255, 0.2)" ?
    "rgba(133,127, 116, 0.33)": "rgba(255,255,255, 0.2)";
    // Change picture of theme toggle
    themeToggle.style.background = toggleStyle.background.includes("moon") ? 
    'rgba(0, 0, 0, 0) url("http://127.0.0.1:5500/images/sun.png") no-repeat scroll 4px 5px / 30px 30px padding-box border-box' :
    'rgba(0, 0, 0, 0) url("http://127.0.0.1:5500/images/moon.png") no-repeat scroll 4px 5px / 30px 30px padding-box border-box';

    // Change button color - the numeric normal ones
    buttons = [...buttons];
    buttons.forEach((button) => {
        const buttonStyle = getComputedStyle(button);
        button.style.backgroundColor = buttonStyle.backgroundColor === "rgb(226, 207, 201)" ?
         "rgb(133, 127, 116)" : 
         "rgb(226, 207, 201)";
        button.style.color = buttonStyle.color == "rgb(255, 255, 255)" ?
         "rgb(164, 172, 150)": "rgb(255, 255, 255)";
    })
    // Change background color of page 
    html.style.backgroundColor = htmlStyle.backgroundColor == "rgba(226, 207, 201, 0.6)" ? 
    "rgba(133, 127, 116, 0.6)" : "rgba(226, 207, 201, 0.6)"; 
})

// Event listeners for keyboard support
window.addEventListener('keydown', function(e) {
    keyInputFlag = true;
    if ('1234567890.'.includes(e.key)) {
        getNumInput(e.key);
    }
    else if ('=+-x/'.includes(e.key)) {
        getOperatorInput(e.key);
    }
    else if ('%±'.includes(e.key)) {
        getUnaryInput(e.key);
    }
    else if (e.key == 'Delete'){
        clearAllElements();
    }
})
