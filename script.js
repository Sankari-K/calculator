let backgroundFrame = document.querySelector(".frame");
const backgroundStyle = getComputedStyle(backgroundFrame);

let themeToggle = document.querySelector("input");
const toggleStyle = getComputedStyle(themeToggle);

let buttons = document.querySelectorAll("button");

let html = document.querySelector('html');
let htmlStyle = getComputedStyle(html);

let display = document.querySelector('.display');
let displayFlag = false;

let clear = document.querySelector("#clear");

let num1 = '';
let num2 = '';
let operator = ''; 

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

function percent(a, b) {
    return  +((a / 100).toFixed(2));
}

function inv(a, b) {
    return  -1 * a || -1 * b;
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
        case '%':
            res = percent(num1, num2);
            break;
        case '±':
            res = inv(num1, num2);
            break;
    }
    return res;
}

buttons.forEach((button) => {
     button.addEventListener('click', getInput)});

clear.removeEventListener('click', getInput);
let reachedOperator = false;
function getInput(e) {
    // If the user is starting out, clear the display
        if (!displayFlag) {
            clearDisplay();
        }
    // The entire expression displayed
        display.innerHTML += e.composedPath()[0].textContent;

    // The key the user just pressed
        let input = display.innerHTML.charAt(display.innerHTML.length - 1);
        console.log(input);
    // Evaluate expression 
        if (input == "=") {
            if (!num1 || !num2 && operator != '%' && operator != '±')
            {
                display.innerHTML = '';
                num1 = '';
                num2 = '';
                return;
            }
            else {
                display.innerHTML = operate(operator, num1, num2);
                num1 = display.innerHTML;
                num2 = '';
                operator = '';
            }
        }
    // If an operation is done and user presses a number
    let newOperationDiscardResult = false;
        if (operator == '=' && e.composedPath()[0].className.slice(-2) != 'sh' ) {
            console.log("bug?");
            display.innerHTML = input;
            num1 = input;
            num2 = '';
            operator = '';
            newOperationDiscardResult = true;

        }
    // Check to see if it an operator
        if (e.composedPath()[0].className.slice(-2) == 'sh') {
            // It is an operator then
            // Right after an operation 
            if (operator != '' && operator != '=') {
                num1 = operate(operator, num1, num2);
                num2 = '';
                display.innerHTML = num1 + input;
            }
            else {
                reachedOperator = true;
            }
            operator = input;
        }
        if (!newOperationDiscardResult && reachedOperator && !(e.composedPath()[0].className.slice(-2) == 'sh')) {
            console.log("tsghs");
            num2 += input;
            newOperationDiscardResult = false;
        }
        if (!reachedOperator && !(e.composedPath()[0].className.slice(-2) == 'sh')) {
            num1 += input;
        }

        // If the user has finished writing an expression 
        // (indicated by an = or a new operator)
        console.log("num1", num1);
        console.log("num2", num2);
        console.log("op", operator);
}

function clearDisplay() {
    display.innerHTML = '';
    displayFlag = true;
}

clear.addEventListener('click', function() {
    clearDisplay();
    num1 = '';
    num2 = '';
    operator = '';
    reachedOperator = false;
})

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
