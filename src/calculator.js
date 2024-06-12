import React, { useState } from 'react';
import './App.css';

const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [formula, setFormula] = useState('');
  const [evaluated, setEvaluated] = useState(false);

  const handleClear = () => {
    setDisplay('0');
    setFormula('');
    setEvaluated(false);
  };

  const handleNumber = (number) => {
    if (evaluated) {
      setDisplay(number);
      setFormula(number);
      setEvaluated(false);
    } else {
      if (display === '0' || /[\+\-\*\/]$/.test(display)) {
        setDisplay(number);
      } else {
        setDisplay(display + number);
      }
      setFormula(formula + number);
    }
  };

  const handleOperator = (operator) => {
    if (evaluated) {
      setFormula(display + operator);
      setDisplay(operator);
      setEvaluated(false);
    } else {
      if (/[\+\-\*\/]$/.test(formula)) {
        setFormula(formula.slice(0, -1) + operator);
        setDisplay(operator);
      } else {
        setFormula(formula + operator);
        setDisplay(formula + operator);
      }
    }
  };

  const handleDecimal = () => {
    if (!/\./.test(display)) {
      setDisplay(display + '.');
      setFormula(formula + '.');
    }
  };

  const handleEvaluate = () => {
    try {
      const result = eval(formula.replace(/x/g, '*').replace(/÷/g, '/')).toString();
      setDisplay(result);
      setFormula(formula + '=' + result);
      setEvaluated(true);
    } catch (error) {
      setDisplay('Error');
      setFormula('');
      setEvaluated(true);
    }
  };

  return (
    <div id="drum-machine">
      <div id="display">{formula || display}</div>
      <div className="calculator-buttons">
        <button id="clear" onClick={handleClear}>AC</button>
        <button id="divide" onClick={() => handleOperator('/')}>÷</button>
        <button id="multiply" onClick={() => handleOperator('*')}>x</button>
        <button id="seven" onClick={() => handleNumber('7')}>7</button>
        <button id="eight" onClick={() => handleNumber('8')}>8</button>
        <button id="nine" onClick={() => handleNumber('9')}>9</button>
        <button id="subtract" onClick={() => handleOperator('-')}>-</button>
        <button id="four" onClick={() => handleNumber('4')}>4</button>
        <button id="five" onClick={() => handleNumber('5')}>5</button>
        <button id="six" onClick={() => handleNumber('6')}>6</button>
        <button id="add" onClick={() => handleOperator('+')}>+</button>
        <button id="one" onClick={() => handleNumber('1')}>1</button>
        <button id="two" onClick={() => handleNumber('2')}>2</button>
        <button id="three" onClick={() => handleNumber('3')}>3</button>
        <button id="equals" onClick={handleEvaluate}>=</button>
        <button id="zero" onClick={() => handleNumber('0')}>0</button>
        <button id="decimal" onClick={handleDecimal}>.</button>
      </div>
    </div>
  );
};

export default Calculator;
