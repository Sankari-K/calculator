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
