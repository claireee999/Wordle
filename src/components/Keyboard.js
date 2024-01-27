import React, { useState } from 'react';
import { compare } from '../util';

const Keyboard = (props) => {
  const [input, setInput] = useState('');

  const handleKeyPress = (key) => {
    setInput((prevInput) => prevInput + key);
  };

  const handleDelete = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleClear = () => {
    setInput('');
  };

  const handleSubmit = () => {
    if (input.length != props.len){
        return
    }
    console.log(input)
    props.setGuesses(prev =>
        [...prev, input])
  };

  const renderKeys = () => {
    const keyRows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
    ];

    return keyRows.map((row, rowIndex) => (
      <div key={rowIndex} className="keyboard-row">
        {row.map((key) => (
          <button key={key} onClick={() => handleKeyPress(key)}>
            {key}
          </button>
        ))}
      </div>
    ));
  };

  return (
    <div className="keyboard">
      <div className="input-display">{input}</div>
      {renderKeys()}
      <div className="keyboard-row">
        <button onClick={handleDelete}>Delete</button>
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Keyboard;
