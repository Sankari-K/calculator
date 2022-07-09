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
let displayFlag = false;

let clear = document.querySelector("#clear");

let num1 = '';
let num2 = '';
let operator = ''; 
let firstTime = true;

numberButtons.forEach((button) =>
    button.addEventListener('click', getNumInput));

operatorButtons.forEach((button) =>
    button.addEventListener('click', getOperatorInput));

unaryButtons.forEach((button) =>
    button.addEventListener('click', getUnaryInput));

function getNumInput(e) {
    if (display.innerText.length >= 17) {
        window.alert("Overflow! The calculator can't solve such large calculations :(");
        clearAllElements();
    } 
    if (firstTime || display.innerText == '0') {
        cleanUpDisplay();
        firstTime = false;
    }
    if (operatorPressed == '=') {   
        //console.log("is operator equals");
        display.innerText = '';
        num1 = '';
        operatorPressed = ''; 
    }
    let keyPressed = e.composedPath()[0].innerText; // of type string
    
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
    // console.log(keyPressed, operatorPressed);
    // console.log("num1", num1);
    // console.log("num2", num2);
    // console.log("operator", operator);
}

let operatorPressed;
function getOperatorInput(e) {
    
    if (display.innerText.length > 17) {
        window.alert("Overflow! The calculator can't solve such large calculations :(");
        clearAllElements();
    } 

    operatorPressed = e.composedPath()[0].innerText;
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
    else { // If it is +,  -, /, or * operators
        if (num1 && num2) {
            display.innerText = operate(operator, num1, num2);
            if (display.innerText == Infinity || display.innerText == NaN) {
                window.alert("That's a math error -_-");
                clearAllElements();
                display.innerText = '';
                return;
            }
            operator = '';
            num1 = display.innerText;
            num2 = '';
        }
        else {
            clearAllElements();
        }
    }
}

function getUnaryInput(e) {
    console.log(e);
    console.log(num1, num2);
    console.log("the last operator was", operator);
    
    let unaryOperatorPressed = e.composedPath()[0];
    if (unaryOperatorPressed.innerText == '%') {
        if (operator) {
            display.innerText = display.innerText.replace(num2, num2 / 100);
            num2 = num2/100;
        }
        else {
            num1 = num1/100;
            display.innerText = num1;
        }
    }
    else {
        if (operator) {
            display.innerText = display.innerText.replace(num2, -1 * num2);
            num2 = -1 * num2;
        }
        else {
            num1 = -1 * num1;
            display.innerText = num1;
        }
    }
}

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


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
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
        case '÷':
            res = divide(num1, num2);
            break;
    }
    return res;
}

function isSmall(n) { 
    return n.length < 8;
}


function isValidDecimal(key, num) {
    return !(key == '.' && num.includes("."));
}
// Light and dark mode toggle
themeToggle.addEventListener('click', function() {
    // Change color of calculator 
    backgroundFrame.style.backgroundColor = backgroundStyle.backgroundColor == "rgb(209, 172, 165)" ? 
    "rgb(85, 90, 96)" : "rgb(209, 172, 165)"; 

    // Change picture of theme toggle
    themeToggle.style.background = toggleStyle.background.includes("moon") ? 
    'rgba(0, 0, 0, 0) url("http://127.0.0.1:5500/images/sun.png") no-repeat scroll 4px 5px / 30px 30px padding-box border-box' :
    'rgba(0, 0, 0, 0) url("http://127.0.0.1:5500/images/moon.png") no-repeat scroll 4px 5px / 30px 30px padding-box border-box';

    // Change button color - the numeric normal ones
    buttons = [...buttons];
    buttons.forEach((button) => {
        const buttonStyle = getComputedStyle(button);
        button.style.backgroundColor = buttonStyle.backgroundColor === "rgb(226, 207, 201)" ?
         "rgb(153, 159, 165)" : 
         "rgb(226, 207, 201)";
    })
    // Change background color of page 
    html.style.backgroundColor = htmlStyle.backgroundColor == "rgba(226, 207, 201, 0.6)" ? 
    "rgba(153, 159, 165, 0.6)" : "rgba(226, 207, 201, 0.6)"; 
})
