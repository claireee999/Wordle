import React, { useState, useEffect } from 'react';
import { compare } from '../util';
import { Color } from '../enum';

const Keyboard = (props) => {
  const [input, setInput] = useState('');
  const [ifValid, setIfValid] = useState('');
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [message, setMessage] = useState('');
  
  const handleKeyPress = (event) => {
    //.log(event.key);
    const isAlphanumeric = /^[a-zA-Z]$/;
    if (isAlphanumeric.test(event.key)) {
      if (input.length === props.len) return;
      setInput((prevInput) => {
        if (prevInput.length < props.len) {
          return prevInput + event.key.toUpperCase()
        } else {
          return prevInput
        }
      });
    } else if (event.key === 'Backspace') {
      handleDelete();
    } else if (event.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {

  window.addEventListener('keydown', handleKeyPress);

  // Remove event listener when the component unmounts
  return () => {
    window.removeEventListener('keydown', handleKeyPress);
  };
  }, [handleKeyPress]); 

  const handleKeyClick = (key) => {
    //console.log(input.length);
    if (input.length === props.len) return;
    setInput((prevInput) => prevInput + key);
  };

  const handleDelete = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleClear = () => {
    setInput('');
  };

  const handleInvalidWord = () => {
    setDisplayPopUp(true);
    setMessage("Invalid Word. Stupid!");
    //console.log(displayPopUp);
    setTimeout(() => {
      setDisplayPopUp(false);
    }, 3000);
    
    
  }
 
  const handleSubmit = () => {
    //console.log(input);
    if (input.length != props.len){
      return
     };
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
    .then(response => response.json())
    .then(data => { if (data["title"] === "No Definitions Found"){
                      handleInvalidWord();
                      //setIfValid('');
                      return;
                    } else{
                      //log(input);
                      props.setGuesses(prev =>
                        [...prev, input]);
                      setInput('');
                    }
                  })
     .catch(error => console.error(error));

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
          <button key={key} style={{ backgroundColor: props.keyboard[key] }} onClick={() => handleKeyClick(key)}>
            {key}
          </button>
        ))}
      </div>
    ));
  };

  return (
    <div className="keyboard">
       {displayPopUp && <p>{message}</p>}
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
