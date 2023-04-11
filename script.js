const numbers = document.querySelectorAll('.number');
numbers.forEach(number => number.addEventListener('click', getValue))
const operators = document.querySelectorAll('.operator');
operators.forEach(operator => operator.addEventListener('click', getOperator));
const botLine = document.querySelector('.bot-line');
const topLine = document.querySelector('.top-line');
const clearLine = document.querySelector('.clear').addEventListener('click', lineClear);
const clearAll = document.querySelector('.all-clear').addEventListener('click', allClear);
const advancedMode = document.querySelector('.advanced').addEventListener('click', advMode);
document.addEventListener('keyup', getKeyboardInput);
document.addEventListener('mousedown', () => mouse = true);
document.addEventListener('mouseup', () => mouse = false);


let numberOne = null;
let numberTwo = null;
let operatorInput = null;
let failsafe = false;
let mouse = false;




function getValue(){
    if (failsafe) return;
    if (numberTwo && !operatorInput) return;
    if (numberOne == null) {
        if (this.dataset.value == ".") numberOne = 0 + this.dataset.value;
        else numberOne = this.dataset.value;
        botLine.innerHTML = numberOne;
    }
    else{
        if (this.dataset.value.includes(".") && numberOne.includes("."))return;
        if (numberOne.toString().length >= 10) return;
        if (numberOne.slice(0,1) == 0 && this.dataset.value == 0 && !numberOne.includes(".")) return;
        numberOne += this.dataset.value.toString();  
        botLine.innerHTML = numberOne;
    }
}


function getOperator (){
    if (failsafe) return;
    if (!numberOne && !numberTwo) return;
    if (!operatorInput) operatorInput = this.dataset.value;
    if (!numberTwo){
        if (operatorInput == "equal"){
            operatorInput = null;
            return;
        }
        numberTwo = numberOne;
        topLine.innerHTML = numberTwo + operatorInput;
        botLine.innerHTML ="&nbsp;";
        numberOne = null;
    }
    else if (numberTwo && !numberOne){
        if (operatorInput && this.dataset.value == "equal")return; 
        operatorInput = this.dataset.value;
        topLine.innerHTML = numberTwo + operatorInput;
        }
        else{
            doOperation(this);
    }
}

function doOperation(operation){
    if (failsafe) return;
    let botNumber = parseFloat(numberOne);
    let topNumber = parseFloat(numberTwo);     
    if (operation == "Enter") operation = 'equal';

    switch(operatorInput){
        case "+":  
            numberTwo = topNumber + botNumber;
            break;
        case "-":
            numberTwo = topNumber - botNumber;
            break;
        case "x":
            numberTwo = topNumber * botNumber;
            break;
        case "/":
            if (botNumber == 0){
                topLine.innerHTML ="You just had to...";
                botLine.innerHTML ="Press AC to reset";
                failsafe = true;
                return;
            }
            numberTwo = topNumber / botNumber;
            break;
    }

    if (operation.dataset?.value) operatorInput = operation.dataset.value;
    else operatorInput = operation;

    if (operatorInput == "equal") {
        operatorInput = null;
        if (numberTwo % 1 == 0) topLine.innerHTML = numberTwo;
        else topLine.innerHTML = numberTwo.toFixed(3);
        if(numberTwo.toString().length >= 10){
            topLine.innerHTML ="Length exceeded";
            botLine.innerHTML ="Press AC to reset";
            failsafe = true;
            return;
        }
    }else {
        if (numberTwo % 1 == 0) topLine.innerHTML = numberTwo + operatorInput;
        
        else topLine.innerHTML = numberTwo.toFixed(3) + operatorInput;
        if(numberTwo.toString().length >= 10){
            topLine.innerHTML ="Length exceeded";
            botLine.innerHTML ="Press AC to reset";
            failsafe = true;
            return;
        }
    }
    numberOne = null;
    botLine.innerHTML ="&nbsp;";
}

function lineClear (){
    if(failsafe){
        allClear ();
        failsafe = false;
        return;
    }
    botLine.innerHTML ="&nbsp;";
    numberOne = null;
}

function allClear (){
    botLine.innerHTML ="";
    topLine.innerHTML ="";
    numberOne = null;
    numberTwo = null;
    operatorInput = null;
}

function advMode (){
    topLine.innerHTML ="In development";
    botLine.innerHTML ="Press AC to reset";
    failsafe = true;
}

function getKeyboardInput(e){
    if (failsafe) return;
    if (mouse) return;
    const regex = /^\d|\.|\+|\-|\*|Enter|Delete|\/$/;
    if (!regex.test(e.key)) return; 
    if (e.key == "Delete") {
        lineClear ();
        return;
    }       
    if (parseInt(e.key) || e.key == 0 || e.key =="."){
        if (numberOne == null) {
            if (e.key == ".") number.One = 0 + e.key;
            else numberOne = e.key;
            botLine.innerHTML = numberOne;
        }
        else{
            if (e.key.includes(".") && numberOne.includes("."))return;
            if (numberOne.slice(0,1) == 0 && e.key == 0 && !numberOne.includes(".")) return;
            if (numberOne.toString().length >= 10) return; 
            numberOne += e.key.toString();  
            botLine.innerHTML = numberOne;
        }

    }
    else {
        if (!numberOne && !numberTwo) return;
        if (!operatorInput) {
            if (e.key == "Enter") operatorInput = "equal";
            if (e.key == "*") operatorInput = "x";
            else operatorInput = e.key;
        }
        if (!numberTwo){
            if (operatorInput == "equal" || e.key =="Enter"){
                operatorInput = null;
                return;
            }
            numberTwo = numberOne;
            topLine.innerHTML = numberTwo + operatorInput;
            botLine.innerHTML ="&nbsp;";
            numberOne = null;
        }
        else if (numberTwo && !numberOne){
            if (operatorInput == "equal" || e.key =="Enter")return; 
            if (e.key == "Enter") operatorInput = "equal";
            if (e.key == "*") operatorInput = "x";
            else operatorInput = e.key;
            topLine.innerHTML = numberTwo + operatorInput;
            }
            else{
                doOperation(e.key);
        }
    }
}