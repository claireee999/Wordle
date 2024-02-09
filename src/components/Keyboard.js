import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDeleteLeft } from '@fortawesome/free-solid-svg-icons';
import "./style.css";

const Keyboard = (props) => {
  const [input, setInput] = useState([' ', ' ', ' ', ' ', ' ']);
  const [pos, setPos] = useState(0);
  //let pos = 0;

  const handleSubmit = () => {
    let inp = input.join('');
    //console.log(inp);
    if (inp.length != props.len){
      return
     };
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inp}`)
    .then(response => response.json())
    .then(data => { if (data["title"] === "No Definitions Found"){
                      handleInvalidWord();
                    } else{
                      props.setGuesses(prev =>
                        [...prev, inp]);
                        setInput(['', '', '', '', '']);
                        setPos(0);                      
                    }
                  })
     .catch(error => console.error(error));
  };

  const handleKeyPress = (event) => {
    // console.log(event.key);
    const isAlphanumeric = /^[a-zA-Z]$/;
    if (isAlphanumeric.test(event.key)) {
      if (pos >= props.len) return;
      setInput((prevInput) => {
          const newArray = [...prevInput];
          newArray[pos] = event.key.toUpperCase();  
          //console.log(newArray, pos)
          return newArray;
      });
      setPos((prevPos) => prevPos + 1);
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
    if (pos >= props.len) return;
    setInput((prevInput) => {
      const newArray = [...prevInput];
      newArray[pos] = key.toUpperCase();
      //console.log(newArray, pos)
      return newArray;
      });
    setPos((prevPos) => prevPos + 1);
  };

  const handleDelete = () => {
    if (pos <= 0) return;
    setInput((prevInput) => {
      const newArray = [...prevInput];
      newArray[pos - 1] = ' ';
      //console.log(newArray, pos);
      return newArray;
      });
      setPos((prevPos) => prevPos - 1);
    
    //setInput((prevInput) => prevInput.slice(0, -1));
  };

  const handleClear = () => {
    setInput(['', '', '', '', '']);
    setPos(0);
  };

  const handleInvalidWord = () => {
    props.setDisplayPopUp(true);
    props.setMessage("Invalid Word. Stupid!");
    //console.log(displayPopUp);
    setTimeout(() => {
      props.setDisplayPopUp(false);
    }, 1000);
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
      {!props.answerFound && <div className="display-input"> {input.map((char, index) => (
        <button key={index} disabled>
          {char}
        </button>
      ))}
      </div>}
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
