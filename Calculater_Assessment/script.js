const operands = document.querySelectorAll(".operand")
const operators = document.querySelectorAll(".oprator")
const result = document.getElementById("result");
const allClear = document.getElementById("ac");
const equal = document.getElementById("equal");

let expression = '';
let firstExpression = '';
let secondExpression = '';
let calSymbol = '';


function appendOperand(operand){

    if(calSymbol === ''){
        if(operand === '0' && firstExpression.length===1 && firstExpression.charAt(firstExpression.length-1) === '0'){
            return;
        }
        if(operand === '.' && firstExpression.includes('.')) return;
        if(firstExpression.length===1 && firstExpression.charAt(firstExpression.length-1) === '0'){
            firstExpression = '';
        }
        firstExpression += operand.toString();
    }else{
        if(operand === '0' && secondExpression.length===1 && secondExpression.charAt(secondExpression.length-1) === '0'){
            return;
        }
        if(operand === '.' && secondExpression.includes('.')) return;
        if(secondExpression.length===1 && secondExpression.charAt(secondExpression.length-1) === '0'){
            secondExpression = '';
        }
        secondExpression += operand.toString();
    }

    displayExpression();
}

function appendOperator(operator){
    if(calSymbol !== ''){
        if(secondExpression !== ''){
            calculateExpression();
            calSymbol = operator.toString();
        }else{
            return;
        }
    }else{
        calSymbol = operator.toString();
    }

    displayExpression();
}

function displayExpression(){
    expression = firstExpression + " " + calSymbol + " " + secondExpression;
    if(expression.trim() === ''){
        expression = '0';
    }
    result.textContent = expression;

}

function calculateExpression(){
    let result = 0;
    switch(calSymbol){
        case '+':
            result = Number(firstExpression) + Number(secondExpression);
            break;
        
        case '-':
            result = Number(firstExpression) - Number(secondExpression);
            break;

        case '÷':
            if(secondExpression === '0'){
                alert("Can't be divided by 0");
                secondExpression = '';
                displayExpression();
                return;
            }
            result = Number(firstExpression) / Number(secondExpression);
            break;

        case '×':
            result = Number(firstExpression) * Number(secondExpression);
            break;
        
    } 

    firstExpression = result.toString();
    secondExpression = '';
    calSymbol = '';
    displayExpression();

}

function clear(){
    firstExpression = '';
    secondExpression = '';
    calSymbol = '';
    displayExpression();
}


operands.forEach((operand) => {
    operand.addEventListener('click', () => {
        appendOperand(operand.textContent);
    })
})

operators.forEach((operator)=>{
    operator.addEventListener('click', ()=>{
        appendOperator(operator.textContent);
    })
})

equal.addEventListener('click', ()=>{
    if(calSymbol !== '' && secondExpression !== '' && firstExpression !== ''){
        calculateExpression();
    }
})

allClear.addEventListener('click', ()=>{
    clear();
})
