import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import SingleGuess from './components/SingleGuess';
import { compare } from './util';
import { keyColors } from './keyColors';
import { Color } from './enum';

function App() {
  const [guesses, setGuesses] = useState([]);
  const [len, setLen] = useState(5);

  const [answer, setAnswer] = useState('');
  const [keyboard, setKeyboard] = useState(keyColors);

  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get the container element
    const container = document.querySelector('.scroll-container');

    // Scroll to the bottom
    container.scrollTop = container.scrollHeight;
  }, [guesses]);



  
  useEffect(() => {
    fetch(`https://wordsapi-65da506d4353.herokuapp.com/random-word`)
    .then(response => response.json())
    .then(data => { 
                    setAnswer(data.word.toUpperCase()); 
                  })
    .catch(error => console.error(error));
  },[]);


  useEffect(() => {
    compare(guesses[guesses.length - 1], answer).forEach((item) => {
      setKeyboard(
          prev => {
            if (prev[item.char] === Color.CORRECT) {
              return prev;
            } else if (prev[item.char] === Color.WRONGPOS && item.color === Color.NOTEXIST) {
              return {...prev, [item.char]: Color.WRONGPOS};
            } else{
              return {...prev, [item.char]: item.color};
            }
          } 
        )
  })},[guesses])

  return (
    <div className="App">
       {displayPopUp && <p className='display-message'>{message}</p>}
      <div className="scroll-container">
        <div className="scroll-content">
        {guesses.map((guess) => (
        <SingleGuess results={compare(guess, answer)} />
        ))} 
        </div>
      </div>
      <Keyboard setGuesses={setGuesses} len={len} keyboard={keyboard} setDisplayPopUp={setDisplayPopUp} setMessage={setMessage}/>
    </div>
  );
}

export default App;
