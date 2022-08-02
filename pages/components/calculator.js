/** @format */
import { useState, useEffect } from 'react';
import DisplayText from './display';
import styles from '../../styles/Home.module.css';

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue,
};

const config = [
  { key: 'C', label: 'C', color: 'grey', position: 'top-left' },
  { key: '±', label: '±', color: 'grey', position: 'top' },
  { key: '%', label: '%', color: 'grey', position: 'top' },
  { key: '/', label: '÷', color: 'orange', position: 'top-right' },
  { key: 7, label: '7', color: 'white', position: 'left' },
  { key: 8, label: '8', color: 'white', position: 'mid' },
  { key: 9, label: '9', color: 'white', position: 'mid' },
  { key: '*', label: 'x', color: 'orange', position: 'right' },
  { key: 4, label: '4', color: 'white', position: 'left' },
  { key: 5, label: '5', color: 'white', position: 'mid' },
  { key: 6, label: '6', color: 'white', position: 'mid' },
  { key: '-', label: '-', color: 'orange', position: 'right' },
  { key: 1, label: '1', color: 'white', position: 'left' },
  { key: 2, label: '2', color: 'white', position: 'mid' },
  { key: 3, label: '3', color: 'white', position: 'mid' },
  { key: '+', label: '+', color: 'orange', position: 'right' },
  { key: 0, label: '0', color: 'white', position: 'bottom-left' },
  { key: '.', label: '.', color: 'white', position: 'bottom' },
  { key: '=', label: '=', color: 'orange', position: 'bottom-right' },
];

export default function Calculator() {
  const [displayText, setDisplayText] = useState('');
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num1Changed, setNum1Changed] = useState(false);
  const [num2Changed, setNum2Changed] = useState(false);
  const [operator, setOperator] = useState();
  const [waitingOperator, setWaitingOperator] = useState(false);

  const onHandleClick = (key) => {
    switch (key) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 0:
        let no1 = num1;
        let no2 = num2;
        if (operator === '=') {
          setNum1(0);
          setNum2(0);
          no1 = 0;
          no2 = 0;
        }
        if (!waitingOperator) {
          let tmrStringNum =
            !!no1 && !(no1 === Infinity)
              ? no1 + key.toString()
              : key.toString();
          setNum1(+tmrStringNum);
          setDisplayText(tmrStringNum);
          setNum1Changed(true);
        } else {
          let tmrStringNum =
            !!no2 && !(no2 === Infinity)
              ? no2 + key.toString()
              : key.toString();
          setNum2(+tmrStringNum);
          setDisplayText(tmrStringNum);
          setNum2Changed(true);
        }
        break;
      case 'C':
        setDisplayText('0');
        setNum1(0);
        setNum2(0);
        setOperator('');
        setWaitingOperator(false);
        setNum1Changed(false);
        setNum2Changed(false);
        break;
      case '/':
      case '+':
      case '-':
      case '*':
        setOperator(key);
        setWaitingOperator(true);
        if (waitingOperator) {
          if (!isNaN(num1) && !isNaN(num2) && num1Changed && num2Changed) {
            const newValue = CalculatorOperations[operator]?.(num1, num2);
            setDisplayText(newValue);
            setNum1(newValue);
            setNum2(0);
          }
        }
        break;
      case '=':
        if (!isNaN(num1) && !isNaN(num2) && num1Changed && num2Changed) {
          const newValue = CalculatorOperations[operator]?.(num1, num2);
          setDisplayText(newValue);
          setNum1(newValue);
          setNum2(0);
          setNum2Changed(false);
          setOperator('=');
          setWaitingOperator(false);
        }
        break;

      case '±':
        const newValue = displayText * -1;
        setDisplayText(newValue);
        if (num1Changed && !waitingOperator) {
          setNum1(newValue);
        } else if (num2Changed) {
          setNum2(newValue);
        }
        break;
      case '%':
        const fixedDigits = displayText.replace(/^-?\d*\.?/, '');
        const val = parseFloat(displayText) / 100;
        setDisplayText(val.toFixed(fixedDigits.length + 2));
        if (num1Changed && !waitingOperator) {
          setNum1(val);
        } else if (num2Changed) {
          setNum2(val);
        }
        break;
      case '.':
        if (!/\./.test(displayText)) {
          const newValue = displayText + '.';
          setDisplayText(newValue);
          if (num1Changed && !waitingOperator) {
            setNum1(newValue);
          } else if (num2Changed) {
            setNum2(newValue);
          }
        }
        break;
      default:
    }
  };

  return (
    <div className={styles.gridContainer}>
      <div className={styles.calculatorResult}>
        <DisplayText>{displayText}</DisplayText>
      </div>
      {config.map((e) => {
        return (
          <button
            key={e.key}
            onClick={() => onHandleClick(e.key)}
            className={
              'button ' +
              e.color +
              ' ' +
              e.position +
              ' ' +
              (e.key === 0 ? styles.button0 : '')
            }>
            {e.label}
          </button>
        );
      })}
    </div>
  );
}
