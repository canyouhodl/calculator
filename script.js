const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  
function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
    calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    
    if (waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }
    else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }

    console.log(calculator);
}

function inputDecimal(dot) {
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    // Destrcture the peroperties ont he calculator object
    const { firstOperand, displayValue, operator } = calculator;
    //'parseFloat' converst eh string contents of 'displayValue' to a floating-point number
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null && !isNaN(inputValue)) {
        calculator.firstOperand = inputValue;
    }
    else if (operator) {
        const result = calculate(firstOperand, inputValue, operator);
    
        calculator.displayValue = String(result);
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
        return firstOperand + secondOperand;
    }
    else if (operator === '-') {
        return firstOperand - secondOperand;
    }
    else if (operator === '*') {
        return firstOperand * secondOperand;
    }
    else if (operator === '/') {
        return firstOperand / secondOperand;
    }

    return secondOperand;
}

function updateDisplay() {
    const display = document.querySelector('.screen');
    display.value = calculator.displayValue;
  }
  
updateDisplay();

const keys = document.querySelector('.buttons-container');
keys.addEventListener('click', (e) => {
      const { target } = e;
      //const target = e.target;

      if(!target.matches('button')) {
          return;
      }

      if (target.classList.contains('operator')) {
          handleOperator(target.value);
          updateDisplay();
          return;
      }
      if (target.classList.contains('percent')) {
          console.log('percent', target.value);
          return;
      }
      if (target.classList.contains('p')) {
          console.log('pthis', target.value);
          return;
      }
      if (target.classList.contains('dot')) {
          inputDecimal(target.value);
          updateDisplay();
          return;
      }
      if(target.classList.contains('clear')) {
          console.log('clear', target.value);
          return;
      }

      inputDigit(target.value);
      updateDisplay();
})