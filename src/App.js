import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Button from './components/Button';
import Display from './components/Display';

const App = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [clearDisplay, setClearDisplay] = useState(false);
  const [operation, setOperation] = useState(null);
  const [values, setValues] = useState([0, 0]);
  const [current, setCurrent] = useState(0);

  function addDigit(n) {
    const newClearDisplay = displayValue === '0' || clearDisplay;

    if (n === '.' && !newClearDisplay && displayValue.includes('.')) {
      return;
    }

    const currentValue = newClearDisplay ? '' : displayValue;
    const newDisplayValue = currentValue + n;

    setDisplayValue(newDisplayValue);
    setClearDisplay(false);

    if (n !== '.') {
      const newValue = parseFloat(newDisplayValue);
      const currentValues = [...values];
      currentValues[current] = newValue;

      setValues(currentValues);
    }
  }

  function clearMemory() {
    setDisplayValue('0');
    setClearDisplay(false);
    setOperation(null);
    setValues([0, 0]);
    setCurrent(0);
  }

  function handleSetOperation(newOperation) {
    if (current === 0) {
      setOperation(newOperation);
      setCurrent(1);
      setClearDisplay(true);
    } else {
      const equals = newOperation === '=';
      const currentValues = [...values];

      try {
        // eslint-disable-next-line no-eval
        currentValues[0] = eval(
          `${currentValues[0]} ${operation} ${currentValues[1]}`,
        );
      } catch (e) {
        currentValues[0] = values[0];
      }

      currentValues[1] = 0;

      setDisplayValue(`${currentValues[0]}`);
      setOperation(equals ? null : newOperation);
      setCurrent(equals ? 0 : 1);
      setClearDisplay(true);
      setValues(currentValues);
    }
  }

  return (
    <View style={styles.container}>
      <Display value={displayValue} />
      <View style={styles.buttons}>
        <Button label="AC" triple onClick={clearMemory} />
        <Button label="/" operation onClick={handleSetOperation} />
        <Button label="7" onClick={addDigit} />
        <Button label="8" onClick={addDigit} />
        <Button label="9" onClick={addDigit} />
        <Button label="*" operation onClick={handleSetOperation} />
        <Button label="4" onClick={addDigit} />
        <Button label="5" onClick={addDigit} />
        <Button label="6" onClick={addDigit} />
        <Button label="-" operation onClick={handleSetOperation} />
        <Button label="1" onClick={addDigit} />
        <Button label="2" onClick={addDigit} />
        <Button label="3" onClick={addDigit} />
        <Button label="+" operation onClick={handleSetOperation} />
        <Button label="0" double onClick={addDigit} />
        <Button label="." onClick={addDigit} />
        <Button label="=" operation onClick={handleSetOperation} />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
