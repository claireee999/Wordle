import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import "./style.css";

const Keyboard = (props) => {
  const [input, setInput] =useState('');
  //let pos = 0;

  const handleSubmit = () => {
    if (input.length != props.len){
      return
     };
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`)
    .then(response => response.json())
    .then(data => { if (data["title"] === "No Definitions Found"){
                      handleInvalidWord();
                    } else{
                      props.setGuesses(prev =>
                        [...prev, input]);
                      setInput('');
                    }
                  })
     .catch(error => console.error(error));
  };

  const handleKeyPress = (event) => {
    // console.log(event.key);
    const isAlphanumeric = /^[a-zA-Z]$/;
    if (isAlphanumeric.test(event.key)) {
      if (input.length === props.len) return;
      setInput((prevInput) => {
        if (prevInput.length < props.len) {
          return prevInput + event.key.toUpperCase();
        } else {
          return prevInput;
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
    console.log(input);
  };

  const handleDelete = () => {
    setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleClear = () => {
    setInput('');
  };

  const handleInvalidWord = () => {
    props.setDisplayPopUp(true);
    props.setMessage("Invalid Word. Stupid!");
    //console.log(displayPopUp);
    setTimeout(() => {
      props.setDisplayPopUp(false);
    }, 3000);
  }

  const renderKeys = () => {
    const keyRows = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Del'],
    ];

    return keyRows.map((row, rowIndex) => (
      <div key={rowIndex} className="keyboard-row">
        {row.map((key) => (
          <button 
            className="keyboard-key"
            key={key}
            style={{backgroundColor: key === 'Del' ? '#f0f0f0' : props.keyboard[key] }}
            onClick={key === 'Del' ? handleDelete : () => handleKeyClick(key)}
          >
            {key === 'Del' ?  <FontAwesomeIcon icon={faDeleteLeft} /> : key}
          </button>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <div className="display-input"> {input.split('').map((char, index) => (
        <button key={index} className="display-button" disabled>
          {char}
        </button>
      ))}
      </div>
      <div className="keyboard">
      {renderKeys()}
      <div className="buttons">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>

    </div>
    
  );
};

export default Keyboard;
