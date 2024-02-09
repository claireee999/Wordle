import React, { useEffect, useState, useRef } from 'react';
import './App.css';
import Keyboard from './components/Keyboard';
import SingleGuess from './components/SingleGuess';
import { compare } from './util';
import { keyColors } from './keyColors';
import { Color } from './enum';
import Congrats from './components/Congrats';
import useLocalStorage from './hooks/useLocalStorage';

function App() {
  const [guesses, setGuesses] = useState([]);
  const [len, setLen] = useState(5);

  const [answer, setAnswer] = useLocalStorage('answer', '');
  const [keyboard, setKeyboard] = useState(keyColors);

  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [message, setMessage] = useState('');

  const [answerFound, setAnswerFound] = useState(false);

  const restart = () => {
    setGuesses([]);
    setAnswer('');
    setDisplayPopUp(false);
    setAnswerFound(false);
    setMessage('');
    setKeyboard(keyColors);
  
    fetch(`https://wordsapi-65da506d4353.herokuapp.com/random-word`)
    .then(response => response.json())
    .then(data => { 
                    setAnswer(data.word.toUpperCase()); 
                  })
    .catch(error => console.error(error));
  }

  useEffect(() => {
    // Get the container element
    const container = document.querySelector('.scroll-container');

    // Scroll to the bottom
    container.scrollTop = container.scrollHeight;
  }, [guesses]);
  
  useEffect(() => {
    if (answer.length >= 0) {
      return
    } 
    fetch(`https://wordsapi-65da506d4353.herokuapp.com/random-word`)
    .then(response => response.json())
    .then(data => { 
                    setAnswer(data.word.toUpperCase()); 
                  })
    .catch(error => console.error(error));
  },[answer]);


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

  useEffect(() => {
    let g = guesses[guesses.length - 1];
    if (g === answer) setAnswerFound(true);
    console.log(answerFound);
  }, [guesses])

  return (
    <div className="App">
       {displayPopUp && <p className='display-message'>{message}</p>}
       { answerFound && <Congrats restart={restart} tries={guesses.length}/>}
      <div className="scroll-container">
        <div className="scroll-content">
        {guesses.map((guess) => (
        <SingleGuess results={compare(guess, answer)} />
        ))} 
        </div>
      </div>
      <Keyboard setGuesses={setGuesses} len={len} keyboard={keyboard} setDisplayPopUp={setDisplayPopUp} setMessage={setMessage} answerFound={answerFound}/>
      </div>
  );
}

export default App;
