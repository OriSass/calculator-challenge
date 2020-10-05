import React, { useState, useEffect } from 'react';
import { MathOperation, operationTypes } from './MathOperation';
import DigitButton from './DigitButton';

/**
 * A basic switch calcuation function
 * @param {*} operation The name or type of the operation used, for ex. : "sqrt" / "+"
 * @param {*} num1 The first num to use in the calculation
 * @param {*} num2 The second num to use in the calculation
 */
function calculate(operation, num1, num2 = 0) {
  switch (operation) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    case '%':
      return num1 % num2;
    case 'power':
      return Math.pow(num1, 2);
    case 'sqrt':
      return Math.sqrt(num1);
  }
}


function Calc() {
  /**
   * Add (0-9) to <DigitButton /> with value and onClick function as exlplained in the requirements
   * Add the correct types to MathOperation, if you are having problem make sure its written correctly compared to operationTypes array
   * This is a state machine, you'll need to work wisely with React.js State and Lifecycle functionality
   * You can use calculate function for your aid
   */
  const [number1, setNumber1] = useState("");
  const [number2, setNumber2] = useState("");
  const [mathAction, setMathAction] = useState();

  useEffect(() => {
    if(mathAction === 'x²'){
      handleEqualize();
    }
    if(mathAction === '√'){
      handleEqualize();
    }
  }, [mathAction])

  const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const addToNumber1 = (digitOrOperation) => setNumber1(prev => prev + digitOrOperation);
  const addToNumber2 = (digitOrOperation) => setNumber2(prev => prev + digitOrOperation);
  const reset = () => {
    setNumber1('');
    setNumber2('');
    setMathAction('');
  }
  const addDigit = (digit) => {
    if(!mathAction){
      addToNumber1(digit);
    }
    else addToNumber2(digit);
  }
  const handleEqualize = () => {
    let result;
    console.log(mathAction);
    if(mathAction === '√'){
      result = calculate('sqrt',parseFloat(number1));
    }
    else if(mathAction === 'x²'){
      result = calculate('power', parseFloat(number1));
    }
    else {
      result = calculate(mathAction, parseFloat(number1), parseFloat(number2));
      if(result === Infinity){
         result = 'Error'
      };
    }
    reset();
    setNumber1(result);
  }
  const printMathButton = (action) => {
    let handleFunction = (action) => {
      if(mathAction){
        handleEqualize();
      } 
      setMathAction(action);
     }
    switch(action){
      case 'AC':
        handleFunction = () => reset()
        break;
      case 'equal': 
        handleFunction = () => handleEqualize()
        break;
      case 'dot':
        handleFunction = () => addDigit('.')
        break;   
    }
    return <MathOperation type={action} onClick={handleFunction} />
  }
  return (
    <div className='calculator'>
      <div className='result'>
      {!number1 && !mathAction && !number2 ? 0 : ''}
        {number1} {mathAction} {number2}
      </div>
      <div className='calculator-digits'>
      {digits.map(digit => <DigitButton value={digit}
                           onClick={() => addDigit(digit)} />)}
      {operationTypes.map(operationType => printMathButton(operationType))}
      
      </div>
    </div>
  );
  }

export default Calc;
